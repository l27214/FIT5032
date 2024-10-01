<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

import MainHeader from './components/MainHeader.vue'
import LoginModal from './components/LoginModal.vue'
import SignUpModal from './components/SignUpModal.vue'
import MainFooter from './components/MainFooter.vue'

const store = useStore()
const toast = useToast()
const confirm = useConfirm()

const isLoginModalOpen = computed(() => store.state.isLoginModalOpen)
const isSignUpModalOpen = computed(() => store.state.isSignUpModalOpen)
const userEmail = computed(() => store.state.user?.email)

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
</script>

<template>
  <div style="width: calc(100vw - 15px)">
    <Toast />
    <ConfirmDialog />

    <!-- User View -->
    <div v-if="!userEmail || userEmail !== 'admin@monash.edu'">
      <header>
        <MainHeader />
      </header>

      <main>
        <div v-if="isLoginModalOpen">
          <LoginModal />
        </div>
        <div v-else-if="isSignUpModalOpen">
          <SignUpModal />
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
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* header {
  position: fixed;
  top: 0px;
  width: 100%;
  background-color: white;
  z-index: 100;
}

@media (min-width: 1024px) {
  header {
    position: fixed;
    top: 0px;
    width: 100%;
    background-color: white;
    z-index: 100;
  }
} */
</style>
