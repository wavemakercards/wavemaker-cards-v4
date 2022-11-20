import { createApp } from "vue";
import App from "./App.vue";
import './registerServiceWorker.js'
import VueDraggableResizable from './libs/vue-draggable-resizable'
//import './libs/vue-draggable-resizable.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).use(VueDraggableResizable).use(VueSweetalert2).mount('#app')
