<template>
  <div class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-start">
        <!-- Website Logo -->
        <div>
          <a
            href="/"
            class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <img alt="Website Logo" class="bi me-2 logo" src="/favicon.ico" />
          </a>
        </div>

        <!-- Navigation Bar -->
        <div class="navbar">
          <div class="container">
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
        </div>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">
              <i class="pi pi-search"></i>
            </button>
          </div>
        </form>

        <div class="header-right-section">
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
                class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="pi pi-user" style="font-size: 1.5rem"></i>
              </a>
              <ul class="dropdown-menu text-small">
                <router-link to="/profile" class="dropdown-item" active-class="active"
                  >Profile</router-link
                >
                <router-link to="/settings" class="dropdown-item" active-class="active"
                  >Settings</router-link
                >
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isAuthenticated = computed(() => store.state.isAuthenticated)

const openLoginModal = () => {
  store.dispatch('openLoginModal')
}
</script>

<style scoped>
.logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.header-right-section {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.header-login-avater-entry {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
