<template>
  <h1>Book Counter</h1>
  <button @click="getBookCount">Get Book Count</button>
  <p v-if="count !== null">Total number of books: {{ count }}</p>
  <p v-if="error">Error</p>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get('https://countbooks-kk6pz4a3xa-uc.a.run.app')
    console.log(response.data)
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count: ', err)
    error.value = err
    count.value = null
  }
}
</script>

<style scoped></style>
