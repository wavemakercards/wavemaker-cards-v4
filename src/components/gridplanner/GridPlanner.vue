<template>
<div class="scroller">
      <table :style="'width :'+tableWidth+'px;'" v-if="this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers">
        <thead >
          <VueDraggableNext v-model="this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers"
            tag='tr'
         :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
               @start="drag = true"
        @end="drag = false"
           v-bind="HeaderDragOptions"
           handle=".handle"
              @change="Changed()">

           <slot>&nbsp;</slot>
        <template v-for="(header,index) in this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers" :key="index">
            <th class="headerBlock" scope="col" :style="'width :'+colwidth+'px;'">
<div class="handle">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
</svg>
</div>

<button class="deleteIconButton" tabindex="0" @click="deleteCol(index)" ><svg viewBox="0 0 24 24"  style="width: 18px; height: 18px;"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" ></path></svg></button>

               <input class="headerInput"  @change="Changed()" v-model="header.title" :placeholder="this.$root.setlang.gridplanner.newcol"/>
            </th>
        </template>
          </VueDraggableNext>
        </thead>

      <VueDraggableNext v-model="this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows" 
      tag="tbody"
                   :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
         handle=".handle"
         @change="Changed()">
            <tr v-for="(item, index) in this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows" :key="index">
                <th class="headerBlock v-handle">
                    <div class="handle">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
</svg>
</div>

<button class="deleteIconButton" tabindex="0" @click="deleteRow(index)" ><svg viewBox="0 0 24 24"  style="width: 18px; height: 18px;"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" ></path></svg></button>

                    <input class="rowInput" @change="Changed()" v-model="item.title" :placeholder="this.$root.setlang.gridplanner.newrow" />
                    </th>
            <td v-for="header in this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers" :key="header">
                <GridPlannerCell :parentList="item.cells[header.uuid]" @MakeChange="Changed()"/></td>
            </tr>
        </VueDraggableNext>


      </table>
<button @click="addRow" class="floatBtn addRow">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z" />
</svg>
    </button><button @click="addCol" class="floatBtn addCol">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
</svg>
        </button> 
</div>
</template>

<script>

import { VueDraggableNext } from "vue-draggable-next";
import GridPlannerCell from "./GridPlannerCell.vue";
export default {
    name: "GridPlanner",
     components: {
    VueDraggableNext,
    GridPlannerCell
  },
    computed: {
         HeaderDragOptions() {
      return {
        animation: 200,
        group: "headers",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    tableWidth(){
        return (this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers.length +1)*this.colwidth 
    }
  },
    data() {
    return {
        colwidth: 300,
  
        /*
              headers :  this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers,
        rows :  this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows,
      headers: [{uuid: "C1", title:"New Col"},{uuid: "C2", title:"New Col"},{uuid: "C3", title:"New Col"}],
      list: [
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
       {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }},
        {title : "new row", cells :  { C1 : [], C2: [], C3: [] }}
      ],
      dragging: false,
      */
      drag:false
    };
    },
    methods:{
           Changed() {
      console.log("Grid Changed");
      this.$root.UpdateRecord(
        "Gridplanner",
        this.$root.session.gridplanner.selected,
        this.$root.shadowDB.Gridplanner[
          this.$root.session.gridplanner.selected
        ]
      );
    },
        addCol(){
            let obj = {}
            obj.uuid = this.$root.uuid()
            obj.title  = ""
            this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers.push(obj)
            this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows.forEach((el)=>{
                    el.cells[obj.uuid] = []
            })
            this.Changed();
        },
        addRow(){
            let obj = {}
            obj.title  = ""
            obj.cells = {}
            this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers.forEach((el)=>{
                obj.cells[el.uuid] = []
            })
            this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows.push(obj)
            this.Changed();
        },
        deleteCol(i){
            if(confirm(this.$root.setlang.gridplanner.deletecolwarn)){
                console.log(i)
                let delId = this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers[i].uuid
               console.log(delId)
// remove from all the rows
        this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows.forEach(row =>{
       delete row.cells[delId]
 })
        this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.headers.splice(i,1)
          this.Changed();
            }

        },
        deleteRow(i){
            if(confirm(this.$root.setlang.gridplanner.deleterowwarn)){
               this.$root.shadowDB.Gridplanner[this.$root.session.gridplanner.selected].content.rows.splice(i,1)
               this.Changed();
            }
        }
    }
}
</script>

<style scoped>
.floatBtn{
    cursor:pointer;
    background-color: var(--accent);
    position:fixed;
    width:50px;
    height:50px;
    border:0px;
    border-radius: 50%;
    top:50px;
}
.floatBtn svg{
 fill:var(--accent-f)
}
.addCol{
    right:5px;
}
.addRow{
    right:60px;
}

.rowInput, .headerInput{
    background-color: inherit;
    color: inherit;
    border:0px;
    padding:5px;
    width:calc(100% - 40px);
    
}
.headerBlock{
    background-color: var(--grid-th);
    color: var(--grid-th-f);
    padding:10px;
    text-align: right;
    height: 50px;
}
.v-handle{
    text-align: right;
}
.handle{
    width:40px;
    height:40px;
    cursor:move;
    position:absolute;
    background-color:var(--grid-th);
}
.handle svg{
    top:0px;
    left: -15px;
    fill: var(--grid-th-f)
}


.scroller{
    position:absolute;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    overflow: auto;
}
td, th, .tblBlock{
    position: relative;
    vertical-align: top;
    height:200px;
}
td{
  background-color: var(--grid-cell-bg);
}

th .deleteIconButton{
   top:5px;
   right:5px;
}

th:hover .deleteIconButton,
th:focus .deleteIconButton,
th:active .deleteIconButton  {
  display:block
}

</style>