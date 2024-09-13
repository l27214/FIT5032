import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import CommunityView from '../views/CommunityView.vue'
import SupportView from '../views/SupportView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'

import AdminDashboardView from '@/views/AdminDashboard/AdminDashboardView.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/resources',
    name: 'Resources',
    component: ResourcesView
  },
  {
    path: '/support',
    name: 'Support',
    component: SupportView
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About Us',
    component: AboutView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Handle user authentication for specific page
  const isAuthenticated = computed(() => !!store.state.user)
  const userEmail = computed(() => store.state.user?.email)

  if (userEmail.value == 'admin@monash.edu' && !to.path.includes('/admin')) {
    window.alert('Sorry. You do not have permission to access this page.');
    next('/admin/dashboard')
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      const confirmed = window.confirm('You need to be logged in to access this page. Click OK to log in.');

      if (confirmed) {
        // Save the path that the user originally wanted to go
        localStorage.setItem('redirectTo', to.fullPath);
        store.dispatch('openLoginModal')
      } else {
        localStorage.setItem('redirectTo', from.fullPath);
        next(from.fullPath);
      }
    } else {
      if (userEmail.value != 'admin@monash.edu' && to.path.startsWith('/admin')) {
        window.alert('Sorry. You do not have permission to access this page.');
        next('/');
      } else {
        next();
      }
    }
  } else {
    next();
  }
});


// Use afterEach to get rid of use localStorage to store redirectTo.
// let redirectTo = null;
// store.state.redirectTo
// router.afterEach(() => {

//   if (isAuthenticated.value && redirectTo) {
//     const target = redirectTo;
//     redirectTo = null;
//     router.push(target);
//   }
// });



export default router
