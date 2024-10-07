<template>
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-light rounded-4 shadow">
        <div class="modal-header d-flex justify-content-between align-items-start p-5 pb-4">
          <div class="d-flex justify-content-center align-items-start flex-column">
            <h1 class="fw-bold mb-3 fs-2">Reset Password</h1>
            <h5>Please enter your email address</h5>
          </div>

          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close modal"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleForgotPassword">
            <div class="form-floating mb-3">
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Email Address"
                class="form-control rounded-3"
                aria-required="true"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <label for="email">Email address</label>
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>

            <button class="w-100 mt-4 mb-2 btn btn-primary btn-lg rounded-3" type="submit">
              Send Reset Link
            </button>
          </form>

          <div v-if="firebaseAuthError" class="alert alert-danger" role="alert">
            {{ firebaseAuthError }}
          </div>

          <div class="d-flex justify-content-center pt-2">
            <small class="text-body-secondary">
              Remembered your password? <a href="#" @click.prevent="goToLogin">Login</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from '@firebase/auth'
import { useStore } from 'vuex'

const store = useStore()
const auth = getAuth()

const email = ref('')
const emailError = ref(null)
const firebaseAuthError = ref(null)

const closeModal = () => {
  clearForm()
  store.dispatch('closeForgotPasswordModal')
}

const goToLogin = () => {
  closeModal()
  store.dispatch('openLoginModal')
}

const clearErrors = () => {
  emailError.value = null
  firebaseAuthError.value = null
}

const clearForm = () => {
  email.value = ''
  clearErrors()
}

const validateEmail = (blur) => {
  if (email.value === '') {
    if (blur) emailError.value = 'Email is required'
  } else {
    emailError.value = null
  }
}

const handleForgotPassword = () => {
  clearErrors()
  validateEmail(true)

  if (!emailError.value) {
    fetchSignInMethodsForEmail(auth, email.value)
      .then((methods) => {
        if (methods.length == 0) {
          firebaseAuthError.value = 'Account not found. Please check your email.'
        } else {
          sendPasswordResetEmail(auth, email.value)
          console.log('Password reset email sent!')
          triggerToast(
            'success',
            'Email Sent',
            'Check your email for a link to reset your password.',
            5000
          )
          closeModal()
        }
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
            firebaseAuthError.value = 'Invalid email address!'
            break
          case 'auth/missing-email':
            firebaseAuthError.value = 'Email is required!'
            break
          case 'auth/user-not-found':
            firebaseAuthError.value = 'Account not found. Please check your email.'
            break
          default:
            firebaseAuthError.value = 'Failed to send reset email. Please try again later.'
        }
      })
  }
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

.modal-dialog {
  width: 496px;
}
</style>
