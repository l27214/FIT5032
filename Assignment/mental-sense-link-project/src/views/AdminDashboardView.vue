<template>
  <div>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="light">
      <a class="navbar-brand col-md-3 col-lg-3 col-xxl-2 me-0 px-3 fs-6 text-white" href="#"
        >Mental Sense Link</a
      >

      <ul class="navbar-nav flex-row d-md-none">
        <li class="nav-item text-nowrap">
          <button
            class="nav-link px-3 text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="pi pi-bars"></i>
          </button>
        </li>
      </ul>
    </header>

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
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#sidebarMenu"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
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
                    <i class="pi pi-shopping-cart" />
                    Products
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-users" />
                    Customers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center gap-2" href="#">
                    <i class="pi pi-chart-line" />
                    Reports
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
  store.dispatch('cancelAuthorization')
  store.dispatch('clearUserEmail')
  router.push('/')
}
</script>

<style scoped>
/* Slidebar */
.sidebar .nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 10px 20px;
}

.fixed-sidebar {
  position: fixed;
  top: 30px;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

/* Navbar */
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
}

.main-content {
  margin-left: 250px;
}
</style>
