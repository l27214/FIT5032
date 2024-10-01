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
            class="btn-close"
            @click="closeOpenModal"
            aria-label="Close"
            style="align-self: flex-start; justify-self: flex-end"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleLogin">
            <div class="form-floating mb-3">
              <input
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="loginFormData.email"
                type="email"
                class="form-control rounded-3"
                placeholder="Email Address"
              />
              <label for="email">Email address</label>
              <div v-show="loginErrors.email" class="text-danger">{{ loginErrors.email }}</div>
            </div>
            <div class="form-floating mb-3">
              <input
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="loginFormData.password"
                type="password"
                class="form-control rounded-3"
                placeholder="Password"
              />
              <label for="password">Password</label>
              <div v-if="loginErrors.password" class="text-danger">{{ loginErrors.password }}</div>
            </div>
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
          </form>

          <div class="d-flex align-items-center justify-content-end mb-3 mt-0">
            <small class="text-body-secondary"
              ><a href="#" @click="triggerToast">Forgot your password?</a></small
            >
          </div>

          <div v-if="loginErrors.firebaseAuthError" class="alert alert-danger" role="alert">
            {{ loginErrors.firebaseAuthError }}
          </div>

          <div class="d-flex justify-content-center mt-2">
            <small class="text-body-secondary"
              >Don't have an account? <a href="#" @click.prevent="goToSignUp">Sign up</a></small
            >
          </div>

          <hr class="my-4" />
          <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
          <img
            src="@/assets/icons/IconGoogleLogin.svg"
            alt="Google Sign-in Icon"
            @click="signUpWithGoogle"
            role="button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const auth = getAuth()

const closeOpenModal = () => {
  clearForm()
  store.dispatch('closeLoginModal')
}

const goToSignUp = () => {
  closeOpenModal()
  store.dispatch('openSignUpModal')
}

const loginFormData = ref({
  email: '',
  password: ''
})

const loginErrors = ref({
  email: null,
  password: null,
  firebaseAuthError: null
})

const clearForm = () => {
  loginFormData.value = {
    email: '',
    password: ''
  }

  loginErrors.value = {
    email: null,
    password: null,
    firebaseAuthError: null
  }
}

const validateEmail = (blur) => {
  if (loginFormData.value.email === '') {
    if (blur) loginErrors.value.email = 'Email is required'
  } else {
    loginErrors.value.email = null
  }
}

const validatePassword = (blur) => {
  if (loginFormData.value.password === '') {
    if (blur) loginErrors.value.password = 'Password is required'
  } else {
    loginErrors.value.password = null
  }
}

const handleLogin = () => {
  validateEmail(true)
  validatePassword(true)

  if (!loginErrors.value.email && !loginErrors.value.password) {
    signInWithEmailAndPassword(auth, loginFormData.value.email, loginFormData.value.password)
      .then(() => {
        console.log('Firebase Login Successful!')
        console.log(auth.currentUser)

        triggerToast('success', 'Login Successful', 'You have successfully logged in.', 3000)
        closeOpenModal()
        console.log(store.state.redirectPath)
        router.push(store.state.redirectPath)
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/invalid-password':
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            loginErrors.value.firebaseAuthError = 'Your email or password was incorrect'
            break
          case 'auth/user-disabled':
            loginErrors.value.firebaseAuthError =
              'This account has been disabled, please contact administrator'
            break
          case 'auth/too-many-requests':
            loginErrors.value.firebaseAuthError = 'Too many login attempts. Please try again later'
            break
          default:
            loginErrors.value.firebaseAuthError = 'Failed to login. Please try again later'
        }
      })
  }
}

const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
      // router.push('/')
      closeOpenModal()
    })
    .catch((error) => {
      console.log(error.code)
    })
}

const triggerToast = (severity, summary, detail, life) => {
  store.dispatch('setTriggerToast', {
    severity: severity,
    summary: summary,
    detail: detail,
    life: life
  })
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
