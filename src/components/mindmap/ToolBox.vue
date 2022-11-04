<template>
  <div id="toolbox">
        <select v-model="$root.session.mindmap.linkstyle" class="toolselect">
      <option value="solid">_____</option>
      <option value="dashed">- - - -</option>
      <option value="dotted">..........</option>
    </select>
    <button @click="addNode" class="toolbutton">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M5 19V5H12V12H19V13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H13.35C13.13 20.37 13 19.7 13 19H5M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
</svg>

    </button>


  </div>
</template>

<script>
export default {
  name: "ToolBox",
  methods: {
    addNode() {
      this.$root.shadowDB.Mindmap[this.$root.session.mindmap.selected].content.nodes[this.$root.uuid()] = {
        text: "",
        x:50,
        y:50,
        w:"auto",
        h:32
      }
     
    }
  },
  mounted(){
    if(!this.$root.session.mindmap.linkstyle){
      this.$root.session.mindmap.linkstyle="solid"
    }
  }
};
</script>

<style scoped>
#toolbox {
  position: fixed;
  top:50px;
  height: 40px;
  width: 100%;
  background-color: var(--c9);
text-align: right;
}

.toolbutton{
  height:40px;
padding: 10px;
  border:0px;
  color:var(--c10-f);
  background-color: var(--c10);
  cursor: pointer;
  margin-left : 5px
  }

  .toolbutton svg{
    fill:var(--c10-f);
    width:100%;
  }

.toolbutton:hover,
.toolbutton:active,
.toolbutton:focus{
  color:var(--c9-f);
  background-color: var(--c9);
}

.toolbutton:hover svg,
.toolbutton:active svg,
.toolbutton:focus svg{
   fill:var(--c9-f);
}


.toolselect{
  position: absolute;
  right:40px;
  top:0px;
  height:40px;
  padding:10px;
  font-weight: bold;
  background-color: var(--c10);
  color: var(--c10-f);
  border:0px;
  outline: none;
}


</style>
