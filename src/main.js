import { createApp } from "vue";
import App from "./App.vue";
import './registerServiceWorker.js'
import VueDraggableResizable from './libs/vue-draggable-resizable'
createApp(App).use(VueDraggableResizable).mount('#app')
