<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0 modal-grid-detail-container">
          <h1 class="fw-bold mb-0 fs-2">
            Log in
            <h5>Use your account</h5>
          </h1>

          <button
            type="button"
            class="btn-close d-flex justify-content-end"
            @click="closeModal"
            aria-label="Close"
            style="align-self: flex-start; justify-self: flex-end"
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
              Log in
            </button>
            <small class="text-body-secondary">Don't have an account? Sign up</small>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">Or Log in with</h2>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
              type="button"
              @click="loginWithThirdParty('GitHub')"
            >
              <svg class="bi me-1" width="16" height="16"><use xlink:href="#github" /></svg>
              Log in with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const email = ref('')
const password = ref('')

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const closeModal = () => {
  store.dispatch('closeLoginModal')
}

const handleSubmit = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  close()
}

const loginWithThirdParty = (provider) => {
  console.log(`Log in with ${provider}`)
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
  padding: 10px;
  border-radius: 10px;
  width: 500px;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.modal-grid-detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
}
</style>
