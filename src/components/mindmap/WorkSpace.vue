<template>
  <div id="workspace" v-if="$root.shadowDB.Mindmap[$root.session.mindmap.selected].content">
  <svg id="svg">
     <template v-for="(link, index) in $root.shadowDB.Mindmap[$root.session.mindmap.selected].content.links" :key="index">
      <LinkNodes :mylink="link" :myindex="index" /> 
      </template>
    </svg>


    <template v-for="myid in Object.keys($root.shadowDB.Mindmap[$root.session.mindmap.selected].content.nodes)" :key="myid">
      <NodeBox :uuid="myid" />
    </template>

  </div>
</template>

<script>
import NodeBox from "./NodeBox.vue";
import LinkNodes from "./LinkNodes.vue";
export default {
  name: "WorkSpace",
  components: {
    NodeBox,
    LinkNodes
  },
  mounted(){
   if(!this.$root.shadowDB.Mindmap[this.$root.session.mindmap.selected].content){
        let obj = {
          nodes : {},
          links : []
        }
        this.$root.shadowDB.Mindmap[this.$root.session.mindmap.selected].content=obj    
   }
   console.log(this.$root.shadowDB.Mindmap[this.$root.session.mindmap.selected])
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
#workspace {
  position: fixed;
  top:80px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  overflow: auto;
}

#svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
