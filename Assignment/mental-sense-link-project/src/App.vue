<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import MainHeader from './components/MainHeader.vue'
import LoginModal from './components/LoginModal.vue'
import SignUpModal from './components/SignUpModal.vue'
import MainFooter from './components/MainFooter.vue'

const store = useStore()

const isLoginModalOpen = computed(() => store.state.isLoginModalOpen)
const isSignUpModalOpen = computed(() => store.state.isSignUpModalOpen)
const userEmail = computed(() => store.state.user?.email)
</script>

<template>
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
