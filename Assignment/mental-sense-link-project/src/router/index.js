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
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
    name: 'Dashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true }
  }
]

const scrollBehavior = () => {
  return { top: 0 }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeLinstener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeLinstener()
        resolve(user)
      },
      reject
    )
  })
}

const permissionDenied = async () => {
  await new Promise((resolve) => {
    store.dispatch('setTriggerConfirm', {
      message: 'Sorry. You do not have permission to access this page.',
      header: 'Warning',
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: 'OK',
        onClick: resolve
      },
      rejectProps: {
        label: 'Close',
        class: 'hidden-confrim-btn',
        severity: 'secondary',
        outlined: true
      }
    })
  })
}


const confirmLoginRequired = async () => {
  return new Promise((resolve) => {
    store.dispatch('setTriggerConfirm', {
      message: 'You need to be logged in to access this page. Click OK to login.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'OK'
      },
      accept: () => {
        resolve(true);
      },
      reject: () => {
        resolve(false);
      }
    });
  });
};

router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  const currentUser = await getCurrentUser();
  if (to.path.includes('/admin')) {
    if (!currentUser) {
      if (from && from.path) next(false)
      else next('/')

      const confirmed = await confirmLoginRequired()
      if (confirmed) {
        store.dispatch('setRedirectPath', to.fullPath)
        store.dispatch('openLoginModal')
      } else {
        if (from && from.path) next(false)
        else next('/')
      }

    } else if (currentUser.email !== 'admin@monash.edu') {
      await permissionDenied()
      next(from.path)
    } else {
      next()
    }

  } else {
    if (currentUser && currentUser.email === 'admin@monash.edu') {
      await permissionDenied()
      next('/admin/dashboard')
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!currentUser) {
        if (from && from.path) next(false)
        else next('/')

        const confirmed = await confirmLoginRequired()
        if (confirmed) {
          store.dispatch('setRedirectPath', to.fullPath)
          store.dispatch('openLoginModal')
        } else {
          if (from && from.path) next(false)
          else next('/')
        }
      } else {
        next()
      }
    } else {
      next()
    }
  }
})


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
