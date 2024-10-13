<template>
  <div class="main-content">
    <div class="d-none d-lg-flex justify-content-between align-items-center p-4 pb-3 border-bottom">
      <h2>Content Management</h2>
    </div>

    <div class="card m-4">
      <DataTable
        :value="contentData"
        dataKey="uid"
        v-model:editingRows="editingRows"
        editMode="row"
        @row-edit-save="onRowEditSave"
        size="large"
        stripedRows
        resizableColumns
        columnResizeMode="fit"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        sortMode="single"
        removableSort
        ref="dt"
      >
        <template #header>
          <div class="d-block flex-column align-items-center justify-content-between gap-5">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mb-4">Content Information</h4>
            </div>
          </div>
        </template>

        <Column field="type" header="Content Type" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" style="width: 50%" />
          </template>
        </Column>

        <Column field="link" header="Link" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" style="width: 100%" />
          </template>
        </Column>

        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import db from '@/firebase/init'

const contentData = ref([])
const editingRows = ref([])

const fetchAllContentData = async () => {
  const contentSnapshot = await getDocs(collection(db, 'contents'))
  contentData.value = contentSnapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data()
  }))
}

const onRowEditSave = async (event) => {
  let { newData, index } = event

  try {
    await updateDoc(doc(db, 'contents', newData.uid), {
      type: newData.type,
      link: newData.link
    })
    fetchAllContentData()
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

onMounted(() => {
  fetchAllContentData()
})
</script>

<style scoped>
.main-content {
  margin-left: 300px;
}
</style>

<style>
.p-datatable-thead tr:nth-child(2) {
  display: none;
}
</style>
