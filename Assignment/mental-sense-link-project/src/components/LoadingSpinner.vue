<template>
  <div class="spinner-overlay" v-if="isLoading">
    <ProgressSpinner />
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
