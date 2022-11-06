<template>
 <div class="planningBoardHolder">
  <div class="hscroll" :style="'width:'+calcWidth+'px'">
<VueDraggableNext
        :list="$root.shadowDB.Writer[$root.session.writer.selected].files"
        tag="transition-group"
        group="columns"
         class="list-group"
         handle=".colHandle"
:component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
    
        @change="ListChanged"
      >

<template  v-for="(col, i) in $root.shadowDB.Writer[$root.session.writer.selected].files" :key="i">
  <div class="noteCol" :style="'width:'+colWidth+'px;'" >
   <div class="columnData">
<PlanningBoardCols :listKey="i" />
     </div>
   <div class="titleBar">
<div class="colHandle">
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M20,2H4C2.89,2 2,2.89 2,4V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V4C22,2.89 21.11,2 20,2M12,4L15,7H13V9H11V7H9M7,15L4,12L7,9V11H9V13H7M12,20L9,17H11V15H13V17H15M17,15V13H15V11H17V9L20,12" />
</svg>
</div>

  <input type="text" class="titleBarInput" v-model="col.name" :placeholder="this.$root.setlang.writer.newfile" @change="ListChanged" />
  </div>

  </div>
        </template>
         </VueDraggableNext>
 </div>

 
 </div>
 <button class="add-col-btn" @click="addFile">
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
</svg>
 </button>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import PlanningBoardCols from "./PlanningBoardCols.vue"
export default {
  name: "PlanningBoard",
  components: {
    VueDraggableNext,
    PlanningBoardCols
  },
  computed:{
    calcWidth(){
      return this.$root.shadowDB.Writer[this.$root.session.writer.selected].files.length*this.colWidth
    }
 ,
    dragOptions() {
      return {
        animation: 200,
        group: "Columns",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    return {
        drag: false,
        colWidth : 320
    };
  },
  methods: {
      deleteFile(index, element){
     if(confirm(this.$root.setlang.writer.deletewarn)){
       if(this.$root.$data.session.writer.file === element){
        this.$root.$data.session.writer.file = null
      }
      this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.splice(index,1)
     
      this.ListChanged();
     }
    },
      addFile() {
        let obj = JSON.parse(JSON.stringify(
          {
        type: "file",
        name: this.$root.setlang.writer.newfile,
        notes:[],
        content: null
      }
        ));
        obj.uuid = this.$root.uuid();
        
        if(this.$root.$data.session.writer.file){
            // file selected so put it after that one
            let i = this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.indexOf(this.$root.$data.session.writer.file)
             this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.splice(i+1,0,obj);
        }else{
        this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.push(obj);
        }
        this.ListChanged();
  
    },
   ListChanged() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selected,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selected
        ]
      );
    },
  },
};
</script>

<style scoped>
.add-card{
  width:100%;
  border:0px;
  padding:10px;
  background-color: var(--accent);
  color: var(--accent-f);
    cursor:pointer
}
.add-card svg{
  fill:var(--accent-f)
}
.add-col-btn{
  position:absolute;
  bottom:5px;
  right:5px;
    border:0px;
  padding:10px;
  background-color: var(--button);
  color: var(--button-f);
  border-radius: 50%;
  width:50px;
  height:50px;
  padding:7px 0 5px 0px ;
  cursor:pointer
}

.add-col-btn svg{
  fill:var(--button-f)
}

.add-col-btn:hover,
.add-col-btn:focus,
.add-col-btn:active{
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.add-col-btn:hover svg,
.add-col-btn:focus svg,
.add-col-btn:active svg{
  fill:var(--button-hover-f)
}

.planningBoardHolder{
  position:absolute;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  padding:0px;
  overflow: auto;

}
.hscroll{
 position: absolute;
 top:0px;
 left:0px;
 right:0px;
 bottom: 0px;
}
.noteCol{
    position: relative;
    display: inline-block;
    width: 300px;
    height: calc(100% - 3px); /* TODO : ok no idea where this errant 3px is coming from!? */
    background-color: var(--planningboard-col)
}

.columnData{
  position:absolute;
  top:40px;
bottom:0px;
width:100%;
overflow-y:scroll;
padding-bottom:200px;
 
  }

.titleBar{
  position:absolute;
  top:0px;
  width:100%;
  background-color: var(--planningboard-title);
  color: var(--planningboard-title-f);
  padding-left:40px;

}

.titleBarInput{
  font-family: inherit;
   background-color: inherit;
  color:inherit;
  height:40px;
  padding:10px;
  border:0px;
  width:100%;
  outline:none;

  font-weight: bold;
}


.colHandle{
  position: absolute;
  left:0px;
  right:0px;
  width:40px;
  height:40px;
background-color: var(--planningboard-handle);
padding:6px;
cursor: grabbing;
}
.colHandle svg{
fill: var(--planningboard-handle-f);
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  position: relative;
  display:block;
  cursor: pointer;
  padding: 8px;
  padding-top:10px;
  min-height: 40px;
  background-color: inherit;

}


/*
.list-group-item svg {
 fill:var(--c10-f)
}
.list-group-item:hover,
.list-group-item:focus,
.list-group-item:active  {
  background-color: var(--accent);
  color: var(--accent-f);
}
*/
.list-group-item:hover .deleteIconButton,
.list-group-item:focus .deleteIconButton,
.list-group-item:active .deleteIconButton  {
  display:block
}


</style>
