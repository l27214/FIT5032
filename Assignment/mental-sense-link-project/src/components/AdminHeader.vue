<template>
  <div>
    <!-- Static Sidebar for large screens -->
    <div
      class="sidebar border border-right col-lg-3 col-xxl-2 p-0 bg-body-tertiary fixed-sidebar d-none d-lg-block"
    >
      <div class="offcanvas-body d-flex flex-column pt-lg-3 overflow-y-auto">
        <!-- Website Logo -->
        <div class="offcanvas-header navbar-brand px-3 mb-3">
          <a href="#" class="ps-3">
            <img src="@/assets/icons/Logo.png" alt="Website Logo" width="70%" height="70%" />
          </a>
        </div>
        <div class="offcanvas-body">
          <ul class="nav nav-pills flex-column justify-content-center pe-3">
            <li class="nav-item">
              <router-link
                to="/admin/dashboard"
                class="nav-link d-flex align-items-center gap-2 my-1"
                active-class="active"
                aria-current="page"
              >
                <i class="pi pi-home" />Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/user-management"
                class="nav-link d-flex align-items-center gap-2 my-1"
                active-class="active"
                aria-current="page"
              >
                <i class="pi pi-users" />User Management
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link
                to="/admin/role-management"
                class="nav-link d-flex align-items-center gap-2 my-1"
                active-class="active"
                aria-current="page"
              >
                <i class="pi pi-th-large" />Role Management
              </router-link>
            </li> -->
            <li class="nav-item">
              <router-link
                to="/admin/content-management"
                class="nav-link d-flex align-items-center gap-2 my-1"
                active-class="active"
                aria-current="page"
              >
                <i class="pi pi-database" />Content Management
              </router-link>
            </li>
          </ul>

          <hr class="my-3" />

          <ul class="nav nav-pills flex-column justify-content-center pe-3 mb-auto">
            <!-- <li class="nav-item">
              <router-link
                to="/admin/settings"
                class="nav-link d-flex align-items-center gap-2 my-1"
                active-class="active"
                aria-current="page"
              >
                <i class="pi pi-cog" /> Settings
              </router-link>
            </li> -->
            <li class="nav-item">
              <button
                class="nav-link d-flex align-items-center gap-2 my-1"
                @click.prevent="handleLogout"
              >
                <i class="pi pi-sign-out"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Offcanvas for small screens -->
    <div class="d-block d-lg-none my-3 ms-3 me-sm-3 border-bottom pb-2">
      <nav class="navbar navbar-expand-lg">
        <h2 class="d-flex ms-3">{{ route.name }}</h2>
        <button
          class="navbar-toggler me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="offcanvas offcanvas-start custom-sidebar p-2"
          tabindex="-1"
          id="offcanvasSidebar"
          aria-labelledby="offcanvasSidebarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-dark" id="offcanvasSidebarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="nav nav-pills flex-column justify-content-center pe-3">
              <li class="nav-item">
                <router-link
                  to="/admin/dashboard"
                  class="nav-link d-flex align-items-center gap-2"
                  active-class="active"
                  aria-current="page"
                >
                  <i class="pi pi-home" />Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/admin/user-management"
                  class="nav-link d-flex align-items-center gap-2"
                  active-class="active"
                  aria-current="page"
                >
                  <i class="pi pi-users" />User Management
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link
                  to="/admin/role-management"
                  class="nav-link d-flex align-items-center gap-2"
                  active-class="active"
                  aria-current="page"
                >
                  <i class="pi pi-th-large" />Role Management
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link
                  to="/admin/content-management"
                  class="nav-link d-flex align-items-center gap-2"
                  active-class="active"
                  aria-current="page"
                >
                  <i class="pi pi-database" />Content Management
                </router-link>
              </li>
            </ul>
            <hr class="my-3" />
            <ul class="nav nav-pills flex-column justify-content-center pe-3 mb-auto">
              <!-- <li class="nav-item">
                <router-link
                  to="/admin/settings"
                  class="nav-link d-flex align-items-center gap-2"
                  active-class="active"
                  aria-current="page"
                >
                  <i class="pi pi-cog" /> Settings
                </router-link>
              </li> -->
              <li class="nav-item">
                <button
                  class="nav-link d-flex align-items-center gap-2"
                  @click.prevent="handleLogout"
                >
                  <i class="pi pi-sign-out"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const route = useRoute()

const handleLogout = () => {
  signOut(getAuth()).then(() => {
    router.push('/')
  })
}
</script>

<style scoped>
.sidebar {
  width: 300px;
}

.sidebar .nav-link {
  font-size: large;
  margin: 10px 10px;
}

.fixed-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}

.custom-sidebar {
  width: 60%;
  max-width: 300px;
}
</style>
