<template>
  <div class="modal-overlay">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0 modal-grid-detail-container">
          <div class="welcomeMessage d-flex justify-content-center align-items-start flex-column">
            <h1 class="fw-bold mb-3 fs-2">Sign Up</h1>
            <h5>Create your account</h5>
          </div>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
            style="align-self: flex-start; justify-self: flex-end"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleRegister">
            <!-- Display Name -->
            <div class="form-floating mb-3">
              <input
                id="displayName"
                type="text"
                class="form-control rounded-3"
                placeholder="Display Name"
                v-model="signUpFormData.displayName"
                @blur="() => validateDisplayName(true)"
                @input="() => validateDisplayName(false)"
              />
              <label for="displayName">Display Name</label>
              <div v-if="signUpErrors.displayName" class="text-danger">
                {{ signUpErrors.displayName }}
              </div>
            </div>

            <!-- Email Address -->
            <div class="form-floating mb-3">
              <input
                id="email"
                type="email"
                class="form-control rounded-3"
                placeholder="Email Address"
                v-model="signUpFormData.email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <label for="email" class="form-label">Email address</label>
              <div v-if="signUpErrors.email" class="text-danger">{{ signUpErrors.email }}</div>
            </div>

            <!-- Password -->
            <div class="form-floating mb-3">
              <input
                id="password"
                type="password"
                class="form-control rounded-3"
                placeholder="Password"
                v-model="signUpFormData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <label for="password" class="form-label">Password</label>
              <div v-if="signUpErrors.password" class="text-danger">
                {{ signUpErrors.password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-floating mb-3">
              <input
                id="confirmPassword"
                type="password"
                class="form-control rounded-3"
                placeholder="Confirm Password"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="signUpFormData.confirmPassword"
              />
              <label for="confirmPassword">Confirm Password</label>
              <div v-if="signUpErrors.confirmPassword" class="text-danger">
                {{ signUpErrors.confirmPassword }}
              </div>
            </div>

            <div v-if="signUpErrors.firebaseAuthError" class="text-danger">
              {{ signUpErrors.firebaseAuthError }}
            </div>

            <!-- Sign Up button -->
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
              Create my Account
            </button>

            <small class="text-body-secondary"
              >Already have an account? <a href="#" @click.prevent="goToLogin">Login</a></small
            >
          </form>
          <hr class="my-4" />
          <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
          <a href="https://www.google.com" class="d-flex justify-content-center">
            <img src="@/assets/icons/IconGoogleSignUp.svg" alt="Google Sign-in Icon"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

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

const clearForm = () => {
  signUpFormData.value = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  signUpErrors.value = {
    displayName: null,
    email: null,
    password: null,
    confirmPassword: null,
    firebaseAuthError: null
  }
}

const validateDisplayName = (blur) => {
  if (signUpFormData.value.displayName.length > 100) {
    if (blur) signUpErrors.value.displayName = 'Display name is too long'
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
    signUpErrors.value.email = 'Invalid email format'
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
    if (blur)
      signUpErrors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) signUpErrors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) signUpErrors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) signUpErrors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) signUpErrors.value.password = 'Password must contain at least one special character.'
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

const handleRegister = () => {
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
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Firebase Register Successful!')
        console.log(user)

        // TODO: Add user to Firestore database

        clearForm()
        store.dispatch('closeSignUpModal')
        store.dispatch('openLoginModal')
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
            signUpErrors.value.firebaseAuthError = 'Invalid email format'
            break
          case 'auth/weak-password':
            signUpErrors.value.firebaseAuthError = 'Password is too weak'
            break
          case 'auth/email-already-in-use':
            signUpErrors.value.firebaseAuthError = 'Email is already registered'
            break
          case 'auth/too-many-requests':
            signUpErrors.value.firebaseAuthError = 'Too many attempts, please try again later'
            break
          case 'auth/timeout':
            signUpErrors.value.firebaseAuthError = 'Request timed out, please try again'
            break
          default:
            signUpErrors.value.firebaseAuthError =
              'Failed to create account. Please try again later'
        }
      })
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
