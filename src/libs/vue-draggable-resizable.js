import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue'
import '@/libs/vue-draggable-resizable.css'

export default {
  install: (app) => {
    app.component("vue-draggable-resizable", VueDraggableResizable);
  },
};