<template>
<div class="toolbar">
      
      <input  v-model="$root.$data.shadowDB.Mindmap[$root.$data.session.mindmap.currentboard].title" placeholder="Board Name">
   <button @click="AddCol" class="btn" >
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" /></svg>
       Add Column </button>
       <button @click="$root.$data.session.mindmap.currentboard=null" class="btn" >

<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>
       Close </button>

      
</div>
<div id="mapholder">


  
</div>

</template>

<script>
//import draggable from "vue-draggable-next";
export default {
  name: "PlanningBoardHome",
  components: {
 //     draggable
  },
  data() {
    return {
    };
  },
  methods: {
      AddCol(){
          let o = {}
          o.title = ""
          o.cards = []
          this.$root.$data.shadowDB.Mindmap[this.$root.$data.session.mindmap.currentboard].content.push(o)
          this.$root.UpdateRecord("Mindmap",this.$root.$data.session.mindmap.currentboard, this.$root.$data.shadowDB.Mindmap[this.$root.$data.session.mindmap.currentboard]) 
      },
      addCard(col){
          let obj = {}
          obj.uuid = this.$root.uuid()
          col.cards.push(obj)
          this.$root.UpdateRecord("Mindmap",this.$root.$data.session.mindmap.currentboard, this.$root.$data.shadowDB.Mindmap[this.$root.$data.session.mindmap.currentboard]) 
      },
      changecall(){
          this.$root.UpdateRecord("Mindmap",this.$root.$data.session.mindmap.currentboard, this.$root.$data.shadowDB.Mindmap[this.$root.$data.session.mindmap.currentboard]) 
      }
  },
  mounted() {}
};
</script>

<style scoped>
.toolbar{
    display: flex; 
    background-color: var(--c10);
    color: var(--c10-f);
    height:50px;

}
.toolbar input{
 width:100%;
  margin:0 auto;
  background-color: none;
  background: none;
  color:var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}

.toolbar .btn{
    top:5px;
  white-space: nowrap;
}
.table {
    overflow: auto;
    white-space: nowrap;
    position: absolute;
    top:50px;
    left:0px;
    bottom:0px;
    right:0px;
    padding:0px;

}

.cols {
  width: 300px;
  margin:5px;

  min-height: 100%;
  padding:10px;
  display:inline-block;
top:0px;
    vertical-align:top;
}
.cols .btn{
    width:100%;

}

.cols input{
    width:100%;
    padding:10px;
    background-color: transparent;
    color: var(--c9-f);
    border:0px;
    outline: none;
    font-family: var(--sysfont);
    border-bottom: 1px solid var(--c9-f);
    height:39px;
}
.header{
  position:relative;
  padding-left:40px;

}
.handle{
  position:absolute;
  left:0px;
  background-color:var(--c9);
  color:var(--c9-f);
  height:40px;
  width:40px;
  cursor:grab;
  text-align: center;
}
.handle svg{
    top:8px;
  fill: var(--c9-f)
}

.handle:active{
  cursor:grabbing;
  background-color: var(--accent);
  color: var(--accent-f)
}


.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>