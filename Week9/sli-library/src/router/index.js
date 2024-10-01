import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AdminView from '@/views/AdminView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'

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
        path: '/addbook',
        name: 'AddBook',
        component: AddBookView
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminView,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/FireLogin',
        name: 'FireLogin',
        component: FirebaseSigninView
    },
    {
        path: '/FireRegister',
        name: 'FireRegister',
        component: FirebaseRegisterView
    },
    {
        path: '/GetBookCount',
        name: 'GetBookCount',
        component: GetBookCountView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
}


router.beforeEach(async (to, from, next) => {
    const redirectUser = (message, redirectPath, fallbackPath) => {
        const confirmed = window.confirm(message);
        const targetPath = confirmed ? redirectPath : fallbackPath;
        localStorage.setItem('redirectTo', targetPath);
        next(targetPath);
    };


    if (to.matched.some(record => record.meta.requiresAuth)) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (currentUser.email == 'admin@monash.edu') {
                    next()
                } else {
                    redirectUser(
                        "You don't have permission to access this page. Click OK to login.",
                        '/FireLogin',
                        from.fullPath
                    );
                }
            } else {
                next()
            }
        } else {
            redirectUser(
                "You don't have permission to access this page. Click OK to login.",
                '/FireLogin',
                from.fullPath
            );
        }
    } else {
        next();
    }


    // Handle user authentication for specific page
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    // if (to.matched.some(records => records.meta.requiresAuth) && !isAuthenticated) {
    //     const confirmed = window.confirm('You need to be logged in to access this page. Click OK to log in.');

    //     if (confirmed) {
    //         // Save the path that the user originally wanted to go
    //         localStorage.setItem('redirectTo', to.fullPath);
    //         next('/login');
    //     } else {
    //         localStorage.setItem('redirectTo', from.fullPath);
    //         next(from.fullPath);
    //     }
    // } else {
    //     next();
    // }
});



export default router