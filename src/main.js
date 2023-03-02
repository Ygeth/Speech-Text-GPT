// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axiosOpenAI from '@/plugins/axiosOpenAI';

import './assets/tailwind.css'

const app = createApp(App)

registerPlugins(app)
app.use(axiosOpenAI)
app.mount('#app')
