<template>
  <FileSystem />

  <div class="main-box">
    <div  v-if="$root.$data.session.writer.selectedToolNode">
    <FileView
      v-if="$root.$data.session.writer.selectedToolNode.type === 'file'"
      :key="$root.$data.session.writer.selectedToolNode.uuid"
    />
    <FolderView
      v-if="$root.$data.session.writer.selectedToolNode.type === 'folder'"
    />
  </div>
  </div>
</template> 


<script>
import FileView from "@/components/tools/writer/FileView";
import FolderView from "@/components/tools/writer/FolderView";
import FileSystem from "@/components/tools/writer/FileSystem.vue";
export default {
  name: "WriterTool",
  components: {
    FileSystem,
    FileView,
    FolderView
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$root.$data.session.writer.selectedToolNode = null;
  },
};
</script>
<style scoped>
.left-sidebar {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 300px;
  background-color: var(--c9);
}
.main-box {
  position: absolute;
  top: 0px;
  left: 300px;
  bottom: 0px;
  right: 0px;
  background-color: var(--c8);
}

.right-sidebar {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  width: 300px;
  background-color: var(--c9);
}
</style>