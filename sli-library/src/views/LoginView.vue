<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Library Login Page</h1>
        <p class="text-center">Use your Library Account</p>
        <form @submit.prevent="submitLoginForm">
          <div class="row mb-3">
            <!-- Username -->
            <div class="col-md-6 col-sm-6 col-lg-8 col-xl-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- Password -->
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="text-center">
              <button type="Login" class="btn btn-primary me-2">Submit</button>
              <button class="btn btn-secondary me-2" @click="cancelLogin">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const submitLoginForm = () => {
  validateName(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password) {
    if (formData.value.username === 'test' && formData.value.password === '!234Qwer') {
      clearForm()
      localStorage.setItem('isAuthenticated', 'true')
      window.dispatchEvent(new CustomEvent('authenticatedChanged'))
      alert('Login successful!')

      const redirectTo = localStorage.getItem('redirectTo')
      if (redirectTo == null) {
        router.push('/')
      } else {
        localStorage.removeItem('redirectTo')
        router.push(redirectTo)
      }
    } else {
      alert('Invalid username or password.')
    }
  }
}

const cancelLogin = () => {
  clearForm()
  router.push('/')
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }

  errors.value = {
    username: null,
    password: null
  }
}

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username === '') {
    if (blur) errors.value.username = 'Username is required'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (formData.value.password === '') {
    if (blur) errors.value.password = 'Password is required'
  } else {
    errors.value.password = null
  }
}
</script>

<style scoped></style>
