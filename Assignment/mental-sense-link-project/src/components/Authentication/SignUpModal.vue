<template>
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-light rounded-4 shadow">
        <div class="modal-header d-flex justify-content-between align-items-start p-5 pb-4">
          <div class="d-flex justify-content-center align-items-start flex-column">
            <h1 class="fw-bold mb-3 fs-2">Sign Up</h1>
            <h5>Create your account</h5>
          </div>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close modal"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleRegister">
            <!-- Display Name -->
            <div class="form-floating mb-2">
              <input
                id="displayName"
                type="text"
                v-model="signUpFormData.displayName"
                placeholder="Display Name"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validateDisplayName(true)"
                @input="() => validateDisplayName(false)"
              />
              <label for="displayName">Display Name</label>
              <div v-if="signUpErrors.displayName" class="text-danger">
                {{ signUpErrors.displayName }}
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-floating mb-2">
              <input
                id="email"
                type="email"
                v-model="signUpFormData.email"
                placeholder="Email Address"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <label for="email">Email address</label>
              <div v-if="signUpErrors.email" class="text-danger">{{ signUpErrors.email }}</div>
            </div>

            <!-- Password -->
            <div class="form-floating mb-2">
              <input
                id="password"
                type="password"
                v-model="signUpFormData.password"
                placeholder="Password"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <label for="password">Password</label>
              <div v-if="signUpErrors.password" class="text-danger">
                {{ signUpErrors.password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-floating mb-3">
              <input
                id="confirmPassword"
                type="password"
                v-model="signUpFormData.confirmPassword"
                placeholder="Confirm Password"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <label for="confirmPassword">Confirm Password</label>
              <div v-if="signUpErrors.confirmPassword" class="text-danger">
                {{ signUpErrors.confirmPassword }}
              </div>
            </div>

            <!-- Sign Up button -->
            <button class="w-100 mt-3 mb-2 btn btn-primary btn-lg rounded-3" type="submit">
              Create my Account
            </button>
          </form>

          <div v-if="signUpErrors.firebaseAuthError" class="alert alert-danger" role="alert">
            {{ signUpErrors.firebaseAuthError }}
          </div>

          <div class="d-flex justify-content-center pt-2">
            <small class="text-body-secondary"
              >Already have an account? <a href="#" @click.prevent="goToLogin">Login</a></small
            >
          </div>

          <hr class="my-3" />
          <h2 class="fs-5 fw-bold mb-3">Or use third-party</h2>
          <img
            src="@/assets/icons/IconGoogleSignUp.svg"
            alt="Google Sign-up Icon"
            role="button"
            @click="signUpWithGoogle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useStore } from 'vuex'

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import db from '@/firebase/init'

const store = useStore()
const auth = getAuth()

const closeModal = () => {
  clearForm()
  store.dispatch('closeSignUpModal')
}

const goToLogin = () => {
  closeModal()
  store.dispatch('openLoginModal')
}

const signUpFormData = ref({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const signUpErrors = ref({
  displayName: null,
  email: null,
  password: null,
  confirmPassword: null,
  firebaseAuthError: null
})

const clearErrors = () => {
  signUpErrors.value = {
    displayName: null,
    email: null,
    password: null,
    confirmPassword: null,
    firebaseAuthError: null
  }
}

const clearForm = () => {
  signUpFormData.value = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  clearErrors()
}

const validateDisplayName = (blur) => {
  if (signUpFormData.value.displayName.length > 100) {
    if (blur) signUpErrors.value.displayName = 'Display name too long'
  } else if (signUpFormData.value.displayName.trim().length === 0) {
    if (blur) signUpErrors.value.displayName = 'Please enter display name'
  } else {
    signUpErrors.value.displayName = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (signUpFormData.value.email === '') {
    if (blur) signUpErrors.value.email = 'Please enter email'
  } else if (!emailPattern.test(signUpFormData.value.email)) {
    if (blur) signUpErrors.value.email = 'Invalid email format'
  } else {
    signUpErrors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = signUpFormData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*_+-]/.test(password)
  signUpErrors.value.password = null

  if (password.length < minLength) {
    if (blur) signUpErrors.value.password = `Password at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) signUpErrors.value.password = 'Password at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) signUpErrors.value.password = 'Password at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) signUpErrors.value.password = 'Password at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) signUpErrors.value.password = 'Password at least one special character.'
  } else {
    signUpErrors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (signUpFormData.value.confirmPassword === '') {
    if (blur) signUpErrors.value.confirmPassword = 'Please confirm your password'
  } else if (signUpFormData.value.confirmPassword !== signUpFormData.value.password) {
    if (blur) signUpErrors.value.confirmPassword = 'Passwords do not match'
  } else {
    signUpErrors.value.confirmPassword = null
  }
}

const handleRegister = async () => {
  clearErrors()
  validateDisplayName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (
    !signUpErrors.value.displayName &&
    !signUpErrors.value.email &&
    !signUpErrors.value.password &&
    !signUpErrors.value.confirmPassword
  ) {
    createUserWithEmailAndPassword(auth, signUpFormData.value.email, signUpFormData.value.password)
      .then(async (result) => {
        console.log('Firebase Register Successful!')
        triggerToast('success', 'Sign Up Successful', 'You have successfully Sign up.', 5000)

        const user = result.user
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: signUpFormData.value.displayName,
          age: null,
          gender: -1,
          country: null
        })

        closeModal()
        goToLogin()
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
            signUpErrors.value.firebaseAuthError = 'Invalid email format.'
            break
          case 'auth/weak-password':
            signUpErrors.value.firebaseAuthError = 'Password is too weak.'
            break
          case 'auth/email-already-in-use':
            signUpErrors.value.firebaseAuthError = 'Email is already registered.'
            break
          case 'auth/too-many-requests':
            signUpErrors.value.firebaseAuthError = 'Too many attempts, please try again later.'
            break
          case 'auth/timeout':
            signUpErrors.value.firebaseAuthError = 'Request timed out, please try again'
            break
          default:
            signUpErrors.value.firebaseAuthError =
              'Failed to create account. Please try again later.'
        }
      })
  }
}

const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log(result.user)
      triggerToast('success', 'Sign Up Successful', 'You have successfully Sign up.', 5000)

      const user = result.user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        age: null,
        gender: -1,
        country: null
      })

      triggerToast('success', 'Login Successful', 'You are now logged in automatically.', 5000)

      closeModal()
      router.push(store.state.redirectPath)
    })
    .catch((error) => {
      console.error('Error during sign up:', error.code)
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
