<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

import MainHeader from './components/MainHeader.vue'
import LoginModal from './components/Authentication/LoginModal.vue'
import SignUpModal from './components/Authentication/SignUpModal.vue'
import ForgotPasswordModal from './components/Authentication/ForgotPasswordModal.vue'
import MainFooter from './components/MainFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AdminSideBar from './components/AdminHeader.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const store = useStore()
const toast = useToast()
const confirm = useConfirm()

const isLoginModalOpen = computed(() => store.state.isLoginModalOpen)
const isSignUpModalOpen = computed(() => store.state.isSignUpModalOpen)
const isForgotPasswordModalOpen = computed(() => store.state.isForgotPasswordModalOpen)
const userEmail = ref(null)
const loading = ref(true)

watch(
  () => store.state.toastConfig,
  (newToastConfig) => {
    if (newToastConfig) {
      toast.add(newToastConfig)
    }
  }
)

watch(
  () => store.state.confirmConfig,
  (newConfirmConfig) => {
    if (newConfirmConfig) {
      confirm.require(newConfirmConfig)
    }
  }
)

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeLinstener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeLinstener()
        resolve(user)
      },
      reject
    )
  })
}

onMounted(async () => {
  const user = await getCurrentUser()
  loading.value = false

  if (user) {
    userEmail.value = user.email
  } else {
    userEmail.value = null
  }

  const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userEmail.value = user.email
    } else {
      userEmail.value = null
    }
  })

  return () => {
    unsubscribe()
  }
})
</script>

<template>
  <div style="width: calc(100vw - 15px)">
    <LoadingSpinner :isLoading="loading" />

    <Toast />
    <ConfirmDialog />

    <!-- User View -->
    <div v-if="!userEmail || userEmail !== 'admin@monash.edu'">
      <header>
        <MainHeader />
      </header>

      <main>
        <div v-show="isLoginModalOpen">
          <LoginModal />
        </div>
        <div v-show="isSignUpModalOpen">
          <SignUpModal />
        </div>
        <div v-show="isForgotPasswordModalOpen">
          <ForgotPasswordModal />
        </div>
        <div>
          <router-view></router-view>
        </div>
      </main>

      <footer>
        <MainFooter />
      </footer>
    </div>

    <!-- Admin View -->
    <div v-else>
      <header>
        <AdminSideBar />
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped></style>

<style>
.hidden-confrim-btn {
  display: none !important;
}
</style>
