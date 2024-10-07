<template>
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-light rounded-4 shadow">
        <div class="modal-header d-flex justify-content-between align-items-start p-5 pb-4">
          <div class="d-flex justify-content-center align-items-start flex-column">
            <h1 class="fw-bold mb-3 fs-2">Login</h1>
            <h5>Use your account</h5>
          </div>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close modal"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleLogin">
            <div class="form-floating mb-3">
              <input
                id="email"
                type="email"
                v-model="loginFormData.email"
                placeholder="Email Address"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <label for="email">Email address</label>
              <div v-if="loginErrors.email" class="text-danger">{{ loginErrors.email }}</div>
            </div>
            <div class="form-floating mb-1">
              <input
                id="password"
                type="password"
                v-model="loginFormData.password"
                class="form-control rounded-3"
                placeholder="Password"
                aria-required="true"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <label for="password">Password</label>
              <div v-if="loginErrors.password" class="text-danger">{{ loginErrors.password }}</div>
            </div>
            <div class="d-flex justify-content-end text-body-secondary">
              <a href="#" @click.prevent="goToForgotPassword">Forgot your password?</a>
            </div>

            <button class="w-100 mt-4 mb-2 btn btn-primary btn-lg rounded-3" type="submit">
              Login
            </button>
          </form>

          <div v-if="loginErrors.firebaseAuthError" class="alert alert-danger" role="alert">
            {{ loginErrors.firebaseAuthError }}
          </div>

          <div class="d-flex justify-content-center pt-2">
            <small class="text-body-secondary"
              >Don't have an account? <a href="#" @click.prevent="goToSignUp">Sign up</a></small
            >
          </div>

          <hr class="my-3" />
          <h2 class="fs-5 fw-bold mb-3">Or use third-party</h2>
          <img
            src="@/assets/icons/IconGoogleLogin.svg"
            alt="Google Sign-in Icon"
            role="button"
            @click="signInWithGoogle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import db from '@/firebase/init'
import router from '@/router'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from '@firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const auth = getAuth()

const closeModal = () => {
  clearForm()
  store.dispatch('closeLoginModal')
}

const goToSignUp = () => {
  closeModal()
  store.dispatch('openSignUpModal')
}

const goToForgotPassword = () => {
  closeModal()
  store.dispatch('openForgotPasswordModal')
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

const clearErrors = () => {
  loginErrors.value = {
    email: null,
    password: null,
    firebaseAuthError: null
  }
}

const clearForm = () => {
  loginFormData.value = {
    email: '',
    password: ''
  }

  clearErrors()
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
  clearErrors()
  validateEmail(true)
  validatePassword(true)

  if (!loginErrors.value.email && !loginErrors.value.password) {
    signInWithEmailAndPassword(auth, loginFormData.value.email, loginFormData.value.password)
      .then((result) => {
        console.log('Firebase Login Successful!')
        triggerToast('success', 'Login Successful', 'You have successfully logged in.', 5000)
        closeModal()
        if (result.user.email === 'admin@monash.edu') {
          router.push('/admin/dashboard')
        } else {
          router.push(store.state.redirectPath)
        }
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/invalid-password':
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            loginErrors.value.firebaseAuthError = 'Email or password was incorrect!'
            break
          case 'auth/user-disabled':
            loginErrors.value.firebaseAuthError =
              'This account is disabled, please contact administrator.'
            break
          case 'auth/too-many-requests':
            loginErrors.value.firebaseAuthError = 'Too many login attempts. Please try again later.'
            break
          default:
            loginErrors.value.firebaseAuthError = 'Failed to login. Please try again later.'
        }
      })
  }
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // console.log(result.user)

      const user = result.user
      const q = query(collection(db, 'users'), where('email', '==', user.email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        triggerToast('success', 'Login Successful', 'You have successfully logged in.', 5000)
      } else {
        triggerToast('success', 'Sign Up Successful', 'You have successfully signed up.', 5000)
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          age: null,
          gender: -1,
          country: null
        })

        triggerToast('success', 'Login Successful', 'You have successfully logged in.', 5000)
      }

      closeModal()
      router.push(store.state.redirectPath)
    })
    .catch((error) => {
      console.log('Error during log in:', error.code)
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
</style>
