// Import necessary modules
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';


const app = createApp(App);

// Use router and store in the Vue application
app.use(router);

// Mount the Vue application
app.mount('#app');
