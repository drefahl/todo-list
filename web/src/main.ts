import './assets/main.css';
import './api/axios.config';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Tooltip from 'primevue/tooltip';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';

const app = createApp(App);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

app.use(createPinia());
app.use(VueQueryPlugin, { queryClient });
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);

app.mount('#app');
