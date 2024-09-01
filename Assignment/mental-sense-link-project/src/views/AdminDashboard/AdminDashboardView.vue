<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div
          class="sidebar border border-right col-md-3 col-lg-3 col-xxl-2 p-0 bg-body-tertiary fixed-sidebar"
        >
          <div
            class="offcanvas-md offcanvas-end bg-body-tertiary"
            tabindex="-1"
            id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel"
          >
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <a class="navbar-brand me-0 px-3 mb-3" href="#">
                <img
                  alt="Website Logo"
                  class="bi"
                  src="../../assets/Logo.png"
                  width="80%"
                  height="80%"
                />
              </a>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link d-flex align-items-center gap-2 active"
                    aria-current="page"
                    href="#"
                  >
                    <i class="pi pi-home" />
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-users" />
                    User Management
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-th-large" />
                    Role Management
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-database" />
                    Content Management
                  </a>
                </li>
              </ul>

              <hr class="my-3" />

              <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-cog" />
                    Settings
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link d-flex align-items-center gap-2"
                    href="#"
                    @click.prevent="handleLogout"
                  >
                    <i class="pi pi-sign-out" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <main class="col-md-9 col-lg-9 col-xxl-10 ms-sm-auto px-md-4 main-content">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">Dashboard</h1>
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
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const handleLogout = () => {
  store.dispatch('logout')
  router.push('/')
}
</script>

<style scoped>
/* Slidebar */
.sidebar .nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 15px 10px;
}

.fixed-sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.main-content {
  margin-left: 250px;
}
</style>
