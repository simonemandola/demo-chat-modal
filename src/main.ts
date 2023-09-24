import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).mount('#app')

console.log("%c¡Hola! 👋🏻", "color:darkcyan; font-size: 1rem; padding-inline: 1rem; background-color: lightgrey; border-radius: .2rem;");
