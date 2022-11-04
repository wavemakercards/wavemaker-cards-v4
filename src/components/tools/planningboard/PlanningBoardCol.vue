<template>


        <draggable
        :list="column"
        item-key="uuid"
        class="list-group"
         group="board"
        ghost-class="ghost"
        @change="changecall"
        @start="dragging = true"
        @end="dragging = false"
      >

             <div class="list-group-item" v-for="(element) in column" :key="element.uuid" >
          <CardViewer :cardid="element.uuid"  :allowlink="true"  :updateelement="element"  @cardChange="updateme(val, element)"/>
                <button class="clearInterfaceIconButton delBtn" @click="deleteElement(element)">
<svg  viewBox="0 0 24 24">
    <path  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
</svg>
           </button>
       
       
          </div>
      
      </draggable>
        <button class="btn" @click="addCard()">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" data-v-b51eb58c=""><path d="M13 11H16V13H13V16H11V13H8V11H11V8H13V11M22 5.5V16L16 22H5.5C3.6 22 2 20.4 2 18.5V5.5C2 3.6 3.6 2 5.5 2H18.5C20.4 2 22 3.6 22 5.5M20 5.8C20 4.8 19.2 4 18.2 4H5.8C4.8 4 4 4.8 4 5.8V18.3C4 19.3 4.8 20.1 5.8 20.1H15V18.6C15 16.7 16.6 15.1 18.5 15.1H20V5.8Z" data-v-b51eb58c=""></path></svg>
        </button>

</template>

<script>
/* eslint-disable */
import CardViewer from "@/components/universal/CardViewer";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "PlanningBoardCol",
  components: {
      draggable: VueDraggableNext,
CardViewer
  },
  data() {
    return {
    }
  },
  props : {
      column : Object
  },
  methods: {
    updateme(n, el){
     console.log(n, el)
this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
  
    },
    deleteElement(element){
      element.uuid="DELETE"
      let deleteindex = this.column.indexOf(element)
      this.column.splice(deleteindex, 1)
     this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
  
    },
      AddCol(){
          let o = {}
          o.title = ""
          o.cards = []
          this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard].content.push(o)
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
      },
      addCard(){
          console.log(this.column)
          let obj = {}
          obj.uuid = this.$root.uuid()
          this.column.push(obj)
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
      },
      changecall(){
          this.$root.UpdateRecord("Planningboard",this.$root.$data.session.planningboard.currentboard, this.$root.$data.shadowDB.Planningboard[this.$root.$data.session.planningboard.currentboard]) 
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
.btn{
    width:100%;
    background-color: var(--accent);
    color: var(--accent-f);
    border:0px;
    margin-top:5px;
}
.btn>svg{
    fill: var(--accent-f);
}

.cols input{
    width:100%;
    

padding:10px;
    
    padding-left:40px;
background-color: transparent;
    color: var(--c9-f);
    border:0px;
    outline: none;
    font-family: var(--sysfont);
    border-bottom: 1px solid var(--c9-f)
}

.delBtn{
  display:none;
  position:absolute;
  top:-5px;
  right:10px;
  background-color: var(--danger);
}
.delBtn svg{
  width:15px;
  height:15px;
}
.list-group-item{
  position: relative;
}
.list-group-item:focus-within >.delBtn{
  display: block;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

</style>