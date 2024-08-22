<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-start">
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap" />
          </svg>
        </a>

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

        <div class="d-flex gap-2 justify-content-center">
          <button
            class="btn btn-primary d-inline-flex align-items-center"
            type="button"
            @click="$emit('open-login-modal')"
          >
            Login
          </button>
        </div>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">
              <i class="pi pi-search"></i>
            </button>
          </div>
        </form>

        <div class="dropdown text-end">
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
  </header>
</template>

<script setup></script>

<style scoped></style>
