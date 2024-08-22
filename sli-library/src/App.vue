<script setup>
import JSON from './components/JSON.vue'
import MainHeader from './components/MainHeader.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <MainHeader />
    </header>

    <main class="main-box">
      <!-- <HomeView /> -->
      <!-- <JSON /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  border-radius: 10px;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
