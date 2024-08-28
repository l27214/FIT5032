import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import CommunityView from '../views/CommunityView.vue'
import SupportView from '@/views/SupportView.vue'
import AboutView from '../views/AboutView.vue'

import AdminDashboardView from '@/views/AdminDashboardView.vue'

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About Us',
    component: AboutView
  },
  {
    path: '/admin',
    name: 'Admin Dashboard',
    component: AdminDashboardView
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Handle user authentication for specific page
  const isAuthenticated = store.state.isAuthenticated;

  if (to.matched.some(records => records.meta.requiresAuth) && !isAuthenticated) {
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
    next();
  }
});





export default router
