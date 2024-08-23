// import './assets/main.css';
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Primevue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App)

app.use(Primevue, {
    theme:
        { preset: Aura }
});
app.use(router);




app.mount('#app');