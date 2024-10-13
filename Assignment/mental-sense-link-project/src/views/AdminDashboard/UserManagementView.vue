<template>
  <div class="main-content">
    <div class="d-none d-lg-flex justify-content-between align-items-center p-4 pb-3 border-bottom">
      <h2>User Management</h2>
    </div>

    <div class="card m-4">
      <DataTable
        :value="userInfoData"
        dataKey="email"
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
        v-model:filters="filters"
        sortMode="single"
        removableSort
        filterDisplay="row"
        :globalFilterFields="['email', 'displayName', 'age', 'gender', 'country']"
        ref="dt"
      >
        <template #header>
          <div class="d-block flex-column align-items-center justify-content-between gap-5">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mb-4">User Information</h4>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>

              <Button
                icon="pi pi-external-link"
                label="Export"
                severity="contrast"
                @click="exportFile($event)"
              />
            </div>
          </div>
        </template>

        <Column field="email" header="User Email" style="width: 30%" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>

        <Column field="displayName" header="Display Name" style="width: 30%" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>

        <Column field="age" header="Age" style="width: 13%" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" type="number" style="width: 125px" />
          </template>
        </Column>

        <Column field="gender" header="Gender" style="width: 13%" sortable>
          <template #editor="{ data, field }">
            <Select
              v-model="data[field]"
              :options="genderOptions"
              option-label="label"
              option-value="value"
              style="width: 125px"
              placeholder="Select Gender"
            />
          </template>
          <template #body="{ data }">
            {{ genderOptions.find((option) => option.value == data.gender).label }}
          </template>
        </Column>

        <Column field="country" header="Country" sortable>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" style="width: 100px" />
          </template>
        </Column>

        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>

        <!-- <Column>
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              severity="danger"
              outlined
              @click="deleteUserAccount(data.uid)"
            />
          </template>
        </Column> -->
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import InputIcon from 'primevue/inputicon'
import { FilterMatchMode } from '@primevue/core/api'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import db from '@/firebase/init'
import { deleteUser, getAuth } from 'firebase/auth'

const editingRows = ref([])
const userInfoData = ref([])
const genderOptions = [
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
  { label: 'Prefer Not To Say', value: 0 },
  { label: '', value: -1 }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  displayName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  age: { value: null, matchMode: FilterMatchMode.EQUALS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  country: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const fetchAllUserData = async () => {
  const usersSnapshot = await getDocs(collection(db, 'users'))
  userInfoData.value = usersSnapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data()
  }))
}

const onRowEditSave = async (event) => {
  let { newData, index } = event

  try {
    await updateDoc(doc(db, 'users', newData.uid), {
      displayName: newData.displayName,
      age: newData.age,
      gender: newData.gender,
      country: newData.country
    })
    fetchAllUserData()
    // userInfoData.value[index] = { ...newData }
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

// const deleteUserAccount = async (uid) => {
//   try {
//     await deleteDoc(doc(db, 'users', uid));

//     const user = await getAuth().getUser(uid);
//     await deleteUser(user);

//     alert('User deleted successfully');
//   } catch (error) {
//     console.error("Error deleting user: ", error);
//   }
// };

// Export file function
const dt = ref()
const exportFile = () => {
  dt.value.exportCSV()
  // dt.value.exportExcel()
}

onMounted(() => {
  fetchAllUserData()
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
