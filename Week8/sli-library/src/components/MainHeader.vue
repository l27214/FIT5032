<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <div class="col-md-3 mb-2 mb-md-0"></div>

      <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item" v-if="auth?.currentUser?.email === 'admin@monash.edu'">
          <router-link to="/admin" class="nav-link" active-class="active">Admin</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>

        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>

        <li class="nav-item" v-if="isAuthenticatedByFirebase">
          <button type="button" class="btn btn-outline-primary me-2" @click="firebaseLogout">
            Logout
          </button>
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <!-- <div v-if="isAuthenticated">
          <button type="button" class="btn btn-outline-primary me-2" @click="logout">Logout</button>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
        </div> -->
      </div>
    </header>
  </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAuthenticatedByFirebase = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticatedByFirebase.value = true
    } else {
      isAuthenticatedByFirebase.value = false
    }
  })
})

const firebaseLogout = () => {
  signOut(auth).then(() => {
    alert('You have logged out from Firebase.')
    console.log(auth.currentUser)
    router.push('/')
  })
}

// const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

// onMounted(() => {
//   window.addEventListener('authenticatedChanged', () => {
//     isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
//   })
// })

// const logout = () => {
//   localStorage.setItem('isAuthenticated', false)
//   isAuthenticated.value = false
//   alert('You have logged out.')
//   router.push('/')
// }
</script>

<style scoped></style>
