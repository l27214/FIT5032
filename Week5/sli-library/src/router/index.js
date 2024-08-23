import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // Handle user authentication for specific page
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (to.matched.some(records => records.meta.requiresAuth) && !isAuthenticated) {
        const confirmed = window.confirm('You need to be logged in to access this page. Click OK to log in.');

        if (confirmed) {
            // Save the path that the user originally wanted to go
            localStorage.setItem('redirectTo', to.fullPath);
            next('/login');
        } else {
            localStorage.setItem('redirectTo', from.fullPath);
            next(from.fullPath);
        }
    } else {
        next();
    }
});



export default router