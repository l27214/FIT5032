<template>
  <h1>Books with ISBN</h1>
  <ul>
    <!-- <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li> -->
    <li v-for="book in books" :key="book.id">
      <input type="text" v-model="book.name" />
      - ISBN: <input type="text" v-model="book.isbn" />
      <button @click="updateBook(book)">Update</button>
      <button @click="deleteBook(book.id)">Delete</button>
    </li>
  </ul>
</template>

<script setup>
import db from '@/firebase/init'
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const books = ref([])

const fetchBooks = async () => {
  try {
    // const q = query(collection(db, 'books'), where('isbn', '>', 1000))

    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )

    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.log('Error fetching books: ', error)
  }
}

const updateBook = async (book) => {
  try {
    const isbnNumber = Number(book.isbn)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    await updateDoc(doc(db, 'books', book.id), {
      name: book.name,
      isbn: isbnNumber
    })
    alert('Book updated successfully')
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, 'books', bookId))
    alert('Book deleted successfully')
    books.value = books.value.filter((book) => book.id !== bookId)
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped></style>
