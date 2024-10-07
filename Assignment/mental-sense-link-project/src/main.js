import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(store)
app.use(router)
app.use(ToastService);
app.use(ConfirmationService);
app.use(ProgressSpinner)

app.mount('#app')
