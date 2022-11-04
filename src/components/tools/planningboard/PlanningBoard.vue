<template>
<div class="toolbar">
      <svg version="1.1"  viewBox="0 0 24 24" data-v-0bc5e1e5=""><path d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z" data-v-0bc5e1e5=""></path></svg>
      <input class="titleinput" v-model="$root.$data.shadowDB.Planningboard[$root.$data.session.planningboard.currentboard].title" placeholder="Board Name">
   <button @click="AddCol" class="addColBtn" >
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" /></svg></button>      
</div>
  <div class="table">

      <!--
        <draggable
        :list="$root.$data.shadowDB.Planningboard[$root.$data.session.planningboard.currentboard].content"
        item-key="uuid"
        class="list-group"
         group="Columns"
        ghost-class="ghost"
        handle=".handle"
        @change="changecall"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element  }">
          <div class="cols">
            <div class="header">
            <div class="handle">        
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" /></svg>
            </div>
           <input  v-model="element.title" placeholder="Title">
            </div>
         <PlanningBoardCol :column="element.cards" />
          </div>
        </template>
      </draggable>

-->
<div :style='"width:"+tableWidth+"px; padding:5px;"'>

   <draggable
      :list="$root.$data.shadowDB.Planningboard[$root.$data.session.planningboard.currentboard].content"
        item-key="uuid"
        class="list-group"
         group="Columns"
        ghost-class="ghost"
        handle=".handle"
           :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: 'flip-list'
        }"
        @change="changecall"
        @start="dragging = true"
        @end="dragging = false">
        <div :style='"width:"+colWidth+"px"' class="list-group-item" v-for="(element) in $root.$data.shadowDB.Planningboard[$root.$data.session.planningboard.currentboard].content" :key="element.uuid" >
          
 <div class="cols">
              <div class="handle">        
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" /></svg>
            </div>
           <input  v-model="element.title" placeholder="Title">
    
            <PlanningBoardCol :column="element.cards" />

    </div>

        </div>
   
    
    </draggable>
   <button @click="ExportToManuscript" class="ManuscriptExport">
<svg  viewBox="0 0 24 24">
    <path  d="M12 19C12 20.08 12.25 21.09 12.68 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V12.08C19.67 12.03 19.34 12 19 12C15.13 12 12 15.13 12 19M23.8 20.4C23.9 20.4 23.9 20.5 23.8 20.6L22.8 22.3C22.7 22.4 22.6 22.4 22.5 22.4L21.3 22C21 22.2 20.8 22.3 20.5 22.5L20.3 23.8C20.3 23.9 20.2 24 20.1 24H18.1C18 24 17.9 23.9 17.8 23.8L17.6 22.5C17.3 22.4 17 22.2 16.8 22L15.6 22.5C15.5 22.5 15.4 22.5 15.3 22.4L14.3 20.7C14.2 20.6 14.3 20.5 14.4 20.4L15.5 19.6V18.6L14.4 17.8C14.3 17.7 14.3 17.6 14.3 17.5L15.3 15.8C15.4 15.7 15.5 15.7 15.6 15.7L16.8 16.2C17.1 16 17.3 15.9 17.6 15.7L17.8 14.4C17.8 14.3 17.9 14.2 18.1 14.2H20.1C20.2 14.2 20.3 14.3 20.3 14.4L20.5 15.7C20.8 15.8 21.1 16 21.4 16.2L22.6 15.7C22.7 15.7 22.9 15.7 22.9 15.8L23.9 17.5C24 17.6 23.9 17.7 23.8 17.8L22.7 18.6V19.6L23.8 20.4M20.5 19C20.5 18.2 19.8 17.5 19 17.5S17.5 18.2 17.5 19 18.2 20.5 19 20.5 20.5 19.8 20.5 19Z" />
</svg>
   </button>
</div>


     
    </div>

</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import PlanningBoardCol from "@/components/tools/planningboard/PlanningBoardCol.vue"
export default {
  name: "PlanningBoardHome",
  components: {
    PlanningBoardCol,
      draggable:VueDraggableNext
  },
  computed:{
    tableWidth(){
      let t= (Object.keys(this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].content).length)*this.colWidth
      return t
    }
  },
  data() {
    return {
      colWidth: 350
    };
  },
  methods: {
      AddCol(){
          let o = {}
          o.title = ""
          o.cards = []
          this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].content.push(o)
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
      },
      addCard(col){
          let obj = {}
          obj.uuid = this.$root.uuid()
          col.cards.push(obj)
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
      },
      changecall(){
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
      },
      ExportToManuscript(){

    if(!confirm("This will create a new manuscript from this planningboard. Do you want to continue")){
      return false
    }
      
      let newManuscriptId = this.$root.uuid();
     // create a new manuscript and name it
      let obj = {};
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.title = this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].title;
      obj.author = this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].description;
      obj.files = [];
      obj.description = this.description;
      obj.uuid = newManuscriptId // genertate your own UUID so thta you can update the shadow db
      this.$root.$data.shadowDB.Writer[newManuscriptId] = obj;
      
// genertate the Pages and notes
  this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].content.forEach(el=>{
     let newId = this.$root.uuid();

    this.$root.$data.shadowDB.Writer[newManuscriptId].files.push(
      {
        uuid : newId,
        type :"file",
        name : el.title
      }
    ) 

  let Pobj = {};
        Pobj.uuid = newId // use the same uuid to link them
        Pobj.projectID = this.$root.$data.session.selectedProject;
        Pobj.writerID = newManuscriptId;
        Pobj.content = "";
        Pobj.notes = el.cards;
        this.$root.$data.shadowDB.Pages[Pobj.uuid] = Pobj;
        this.$root.AddRecord("Pages", Pobj);
  })

  this.$root.AddRecord("Writer", this.$root.$data.shadowDB.Writer[newManuscriptId]);
  this.$root.$data.session.selectedTool="writer"
   this.$root.$data.session.writer={
    selectedToolId : newManuscriptId
   }
}
  },
  mounted() {}
};
</script>

<style scoped>

.addColBtn {
  height: 40px;
  border-radius: 0px;
  border: 0px;
  cursor: pointer;
  height: 40px;
  background-color: var(--accent);
}
.addColBtn svg {
  fill: var(--accent-f);
}
.addColBtn:active, .addColBtn:hover,
 .addColBtntton:focus {
  background-color: var(--success);
}

.addColBtn:active svg, .addColBtn:hover svg,
 .addColBtntton:focus svg {
  fill: var(--success-f);
}



.toolbar{
  display: flex;

    background-color: var(--c10);
    color: var(--c10-f);
    height:40px;

}
.toolbar svg{
  fill:var(--c0);
  width:30px;
  margin-left:10px;
}
.toolbar .titleinput{
  width: 100%;
  margin:0 auto;
  background-color: none;
  background: none;
  color:var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}


.table {
    overflow: auto;
    white-space: nowrap;
    position: absolute;
    top:40px;
    left:0px;
    bottom:0px;
    right:0px;
    padding:0px;

}

.cols {
  position: relative;
  width: 100%;
  min-height: 200px;
  background-color: var(--c7);
  margin:0px;
  padding:0px;
  display:inline-block; 
  top:0px;
  vertical-align:top;
}
.cols .btn{
    width:100px;
}

.cols input{
    width:calc(100% - 40px);
    padding:10px;
    margin-left:40px;
    background-color: var(--c10);
    color:var(--c10-f);
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

.list-group-item{
  display: inline-block;
  margin-right:5px
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.ManuscriptExport{
  position:fixed;
  bottom:5px;
  right:5px;
  border:0px;
  width:40px;
  height:40px;
  background-color: var(--accent);
  border-radius: 50%;;
cursor:pointer;
}
.ManuscriptExport:focus,
.ManuscriptExport:active,
.ManuscriptExport:hover{
  background-color: var(--success);
}

.ManuscriptExport:focus svg,
.ManuscriptExport:active svg,
.ManuscriptExport:hover svg{
  fill:var(--success-f);
}
.ManuscriptExport svg{
  fill:var(--accent-f);
  width:20px;
}
</style>