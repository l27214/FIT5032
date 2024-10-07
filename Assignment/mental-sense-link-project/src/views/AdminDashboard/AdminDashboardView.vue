<template>
  <div>
    <main class="main-content">
      <div
        class="d-none d-lg-flex justify-content-between align-items-center p-4 pb-3 border-bottom"
      >
        <h2>Dashboard</h2>
        <div class="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
          >
            <i class="pi pi-calendar" />
            This week
          </button>
        </div>
      </div>

      <canvas class="my-4 w-100" id="myChart" width="900" height="1380"></canvas>
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.main-content {
  margin-left: 300px;
}
</style>
