<template>
  <div class="container">
    <!-- Header Row -->
    <div class="row d-flex flex-wrap align-items-center justify-content-center mx-3 mx-sm-0 my-3">
      <!-- Website Logo -->
      <div class="col-4 col-md-3 col-lg-2">
        <a href="/">
          <img src="@/assets/icons/Logo.png" alt="Website Logo" width="75%" height="75%" />
        </a>
      </div>

      <!-- Navigation Bar -->
      <div class="navbar col-lg-6 d-none d-lg-block">
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 gap-lg-1 gap-xl-3 nav-pills"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link px-2" active-class="active" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/resources" class="nav-link px-2" active-class="active"
              >Resources</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/community" class="nav-link px-2" active-class="active"
              >Community</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/support" class="nav-link px-2" active-class="active"
              >Support</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link px-2" active-class="active"
              >About Us</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Search Bar -->
      <div class="navbar col mx-3">
        <!-- <form role="search" class="w-100">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">
              <i class="pi pi-search"></i>
            </button>
          </div>
        </form> -->
      </div>

      <!-- User Authentication -->
      <div class="col-1 d-none d-lg-block">
        <!-- If user is not logged in, show Login button. Else show user avater and dropdown menu. -->
        <div v-if="!isAuthenticated">
          <button
            class="btn btn-primary header-login-avater-entry"
            type="button"
            @click="openLoginModal"
          >
            Login
          </button>
        </div>

        <div v-else>
          <div class="dropdown text-end header-avatar-wrap header-login-avater-entry">
            <a
              href="#"
              class="link-body-emphasis dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="pi pi-user" style="font-size: 2.5rem"></i>
            </a>
            <ul class="dropdown-menu text-small">
              <router-link to="/profile" class="dropdown-item" active-class="active"
                >Profile</router-link
              >
              <!-- <router-link to="/settings" class="dropdown-item" active-class="active"
                >Settings</router-link
              > -->
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Drawer Toggle Button for small screens -->
      <button
        class="btn btn-outline-primary col-1 d-lg-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <!-- Offcanvas Sidebar Navigation -->
    <div
      class="offcanvas offcanvas-start bg-body-tertiary d-lg-none custom-sidebar"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-body d-flex flex-column p-4 overflow-y-auto">
        <div v-if="!isAuthenticated" class="d-flex justify-content-center align-items-center py-3">
          <button
            class="btn btn-primary header-login-avater-entry"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            @click="openLoginModal"
          >
            Login
          </button>
        </div>

        <div v-else class="p-3 text-center">
          <p>Hi, {{ auth.currentUser.displayName }}</p>
        </div>

        <ul class="nav flex-column mb-5 gap-2">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link d-flex align-items-center gap-2"
              active-class="active"
              aria-current="page"
            >
              <i class="pi pi-home" />Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/resources"
              class="nav-link d-flex align-items-center gap-2"
              active-class="active"
            >
              <i class="pi pi-book" />Resources
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/community"
              class="nav-link d-flex align-items-center gap-2"
              active-class="active"
            >
              <i class="pi pi-comments" />Community
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/support"
              class="nav-link d-flex align-items-center gap-2"
              active-class="active"
            >
              <i class="pi pi-headphones" />Support
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link d-flex align-items-center gap-2"
              active-class="active"
            >
              <i class="pi pi-users" />About Us
            </router-link>
          </li>
        </ul>

        <div v-if="isAuthenticated">
          <hr class="my-3" />

          <ul class="nav flex-column mb-auto">
            <!-- <li class="nav-item">
              <router-link to="/settings" class="nav-link d-flex align-items-center gap-2">
                <i class="pi pi-cog" />Settings
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const store = useStore()
const auth = getAuth()

const isAuthenticated = ref(false)

const openLoginModal = () => {
  store.dispatch('openLoginModal')
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
    } else {
      isAuthenticated.value = false
    }
  })
})

const handleLogout = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<style scoped>
.nav-link {
  font-size: large;
}

.header-login-avater-entry {
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-sidebar {
  width: 60%;
  max-width: 300px;
}
</style>
