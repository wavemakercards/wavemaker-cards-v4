<template>
  <div v-for="(item, index) in items" :key="index">
    <div v-if="item.type === 'file'">
      <div class="title">{{ item.name }} </div>
      
        <div class="page">
            <div class="wavemakerFolderPreview" v-if="$root.$data.shadowDB.Pages[item.uuid]" v-html=" $root.$data.shadowDB.Pages[item.uuid].content">
            </div>
  </div>
    </div>
    <div class="folder" v-if="item.type === 'folder'">
     <div class="folderTitle"> {{ item.name }}</div>
      <FolderPageView :items="item.files" />
    </div>
  </div>
</template>

<script >
export default {
  name: "FolderPageView",
  props: {
    items: Object,
  },
};
</script>

<style scoped>
.folder {
  max-width: 700px;
  margin: 0 auto;
}
.page {
  max-width: 700px;
  margin: 0 auto;
  min-height: 50px;
  padding: 10px;
  background-color: var(--paper);
  color: var(--paper-f);
  padding:20px;

  font-size: 1rem;
  font-family: var(--pagefont);
}

.title{
    max-width: 700px;
      margin: 0 auto;
    padding: 10px;
    font-size: 1.2em;
       color: var(--c7-f);
    background-color: var(--c7);
}
.page img{
  max-width:100%;
}
.folderTitle{
    max-width: 700px;
      margin: 0 auto;
    padding: 10px;
    font-size: 1.4em;
    color: var(--c9-f);
    background-color: var(--c9);
}
</style>
