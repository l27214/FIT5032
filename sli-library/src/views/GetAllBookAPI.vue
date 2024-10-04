<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)

const getALLBookAPI = async () => {
  try {
    const response = await axios.get('https://getallbooks-kk6pz4a3xa-uc.a.run.app/')
    console.log(response.data)
    jsondata.value = response.data
    error.value = null
  } catch (err) {
    console.error('Error fetching book count: ', err)
    error.value = err
    jsondata.value = null
  }
}

onMounted(() => {
  getALLBookAPI()
})
</script>

<style scoped></style>
