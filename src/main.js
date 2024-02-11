import { createApp } from "vue";
import VueDraggableResizable from 'vue-draggable-resizable'
import App from "./App.vue";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).component("vue-draggable-resizable", VueDraggableResizable).use(VueSweetalert2).mount('#app')
