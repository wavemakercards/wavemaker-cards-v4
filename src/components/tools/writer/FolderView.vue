<template>
<div id="folderviewer"  :style = "($root.$data.session.writer.lhs)?'left:80px;':''">
<div class="toolbar">
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>
  <input type="text" v-model="$root.$data.session.writer.selectedToolNode.name" />
</div>

  <FolderPageView :items="$root.$data.session.writer.selectedToolNode.files" />

</div>
</template>

<script>
import FolderPageView from "./FolderPageView"
export default {
  name: 'FolderView',
  components :{
    FolderPageView
  },
  data(){
    return {

    }
  },
  methods : {

  },
  mounted(){
console.log("folder")
  }
}
</script>
<style scoped>
#folderviewer{
  position: fixed;
  top:40px;
  left:340px;
  right:0px;
  bottom:0px;
  background-color: var(--c8);
overflow: auto;
padding-bottom:100px;
}

.toolbar{
  position: sticky;
  top:0px;
  background-color: var(--c10);
  z-index: 100;
  height:40px;
  padding-left:40px;

}
.toolbar svg{
  position: absolute;
  top:7px;
  left:15px;
  fill: var(--c10-f);
}
.toolbar input{
  width:100%;
  display:block;
  margin:0 auto;
  background-color: none;
  background: none;
  color:var(--c10-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}
</style>