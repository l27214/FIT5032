<template>
  <div class="modal-overlay">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0 modal-grid-detail-container">
          <div class="welcomeMessage d-flex justify-content-center align-items-start flex-column">
            <h1 class="fw-bold mb-3 fs-2">Login</h1>
            <h5>Use your account</h5>
          </div>

          <button
            type="button"
            class="btn-close d-flex justify-content-end"
            @click="closeOpenModal"
            aria-label="Close"
            style="align-self: flex-start; justify-self: flex-end"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleSubmit">
            <div class="form-floating mb-3">
              <input
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
                type="email"
                class="form-control rounded-3"
                placeholder="Email Address"
              />
              <label for="email">Email address</label>
              <div v-show="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="form-floating mb-3">
              <input
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
                type="password"
                class="form-control rounded-3"
                placeholder="Password"
              />
              <label for="password">Password</label>
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
            <small class="text-body-secondary"
              >Don't have an account? <a href="#" @click.prevent="goToSignUp">Sign up</a></small
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const goToSignUp = () => {
  store.dispatch('closeLoginModal')
  store.dispatch('openSignUpModal')
  closeOpenModal()
}

const formData = ref({
  email: '',
  password: ''
})

const clearForm = () => {
  formData.value = {
    email: '',
    password: ''
  }

  errors.value = {
    email: null,
    password: null
  }
}

const errors = ref({
  email: null,
  password: null
})

const closeOpenModal = () => {
  clearForm()
  store.dispatch('closeLoginModal')
  // router.push('/')
}

const handleSubmit = () => {
  validateEmail(true)
  validatePassword(true)

  if (!errors.value.email && !errors.value.password) {
    const userData = JSON.parse(localStorage.getItem('userData'))

    const matchedUser = userData.find(
      (user) => user.email === formData.value.email && user.password === formData.value.password
    )
    if (matchedUser) {
      localStorage.setItem('userInfo', JSON.stringify(matchedUser))
      alert('Login successful!')
      store.dispatch('grantAuthorization')
      closeOpenModal()

      const redirectTo = localStorage.getItem('redirectTo')
      if (redirectTo == null) {
        router.push('/')
      } else {
        localStorage.removeItem('redirectTo')
        router.push(redirectTo)
      }
    } else {
      alert('Invalid email or password.')
    }
  }
}

const validateEmail = (blur) => {
  if (formData.value.email === '') {
    if (blur) errors.value.email = 'Email is required'
  } else {
    errors.value.email = null
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 500px;
}

.modal-grid-detail-container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  justify-content: center;
}
</style>
