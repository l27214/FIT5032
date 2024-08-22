<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1>
          <button
            type="button"
            class="btn-close d-flex justify-content-end"
            @click="close"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="handleSubmit">
            <div class="form-floating mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
                required
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                v-model="password"
                type="password"
                class="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
              Sign up
            </button>
            <small class="text-body-secondary"
              >By clicking Sign up, you agree to the terms of use.</small
            >
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
              type="button"
              @click="signUpWithThirdParty('GitHub')"
            >
              <svg class="bi me-1" width="16" height="16"><use xlink:href="#github" /></svg>
              Sign up with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['update:isVisible'])

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  close()
}

const close = () => {
  emit('update:isVisible', false)
}

const signUpWithThirdParty = (provider) => {
  console.log(`Signing up with ${provider}`)
  close()
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
</style>
