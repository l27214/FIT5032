<template>
  <div class="container mb-2 border-bottom">
    <div class="row d-flex flex-wrap align-items-center justify-content-center my-3">
      <!-- Website Logo -->
      <div class="col-2">
        <a href="/">
          <img src="@/assets/icons/Logo.png" alt="Website Logo" width="90%" height="90%" />
        </a>
      </div>

      <!-- Navigation Bar -->
      <div class="navbar col-6 mx-3">
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 gap-3 nav-pills"
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
      <div class="navbar col-2">
        <!-- <form role="search">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">
              <i class="pi pi-search"></i>
            </button>
          </div>
        </form> -->
      </div>

      <div class="header-right-section col-1">
        <!-- If user is not logged in, show login button. Else show user avater and dropdown menu. -->
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
          <div class="dropdown text-end header-avatar-wrap">
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
              <router-link to="/settings" class="dropdown-item" active-class="active"
                >Settings</router-link
              >
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
          </div>
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

const isAuthenticated = ref(false)

const openLoginModal = () => {
  store.dispatch('openLoginModal')
}

let auth
onMounted(() => {
  auth = getAuth()
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

.header-right-section {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.header-login-avater-entry {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
