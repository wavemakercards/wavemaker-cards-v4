<template>
  <div class="scroller">
    <div id="toolbox">
      <input v-model="$root.session.gridplanner.selected.title" class="titleinput" @change="updateDatabase" />

      <button @click="addRow" class="toolbutton">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z" />
        </svg>
      </button><button @click="addCol" class="toolbutton">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
        </svg>
      </button>
    </div>

    <table :style="'width :' + tableWidth + 'px;'" v-if="this.$root.session.gridplanner.selected.content.headers">
      <thead>
        <VueDraggableNext v-model="this.$root.session.gridplanner.selected.content.headers" tag='tr' :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }" @start="drag = true" @end="drag = false" v-bind="HeaderDragOptions" handle=".handle"
          @change="updateDatabase()">

          <slot>&nbsp;</slot>
          <template v-for="(header, index) in this.$root.session.gridplanner.selected.content.headers" :key="index">
            <th class="headerBlock" scope="col" :style="'width :' + colwidth + 'px;'">
              <div class="handle">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
              </div>

              <button class="deleteIconButton" tabindex="0" @click="deleteCol(index)"><svg viewBox="0 0 24 24"
                  style="width: 18px; height: 18px;">
                  <path
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z">
                  </path>
                </svg></button>

              <input class="headerInput" @change="updateDatabase()" v-model="header.title"
                :placeholder="this.$root.setlang.gridplanner.newcol" />
            </th>
          </template>
        </VueDraggableNext>
      </thead>

      <VueDraggableNext v-model="this.$root.session.gridplanner.selected.content.rows" tag="tbody" :component-data="{
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }" @start="drag = true" @end="drag = false" v-bind="dragOptions" handle=".handle" @change="updateDatabase()">
        <tr v-for="(item, index) in this.$root.session.gridplanner.selected.content.rows" :key="index">
          <th class="headerBlock v-handle">
            <div class="handle">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
              </svg>
            </div>

            <button class="deleteIconButton" tabindex="0" @click="deleteRow(index)"><svg viewBox="0 0 24 24"
                style="width: 18px; height: 18px;">
                <path
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z">
                </path>
              </svg></button>

            <input class="rowInput" @change="updateDatabase()" v-model="item.title"
              :placeholder="this.$root.setlang.gridplanner.newrow" />
          </th>
          <td v-for="header in this.$root.session.gridplanner.selected.content.headers" :key="header">
            <GridPlannerCell :parentList="item.cells[header.uuid]" @MakeChange="updateDatabase()" />
          </td>
        </tr>
      </VueDraggableNext>


    </table>

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
    tableWidth() {
      return (this.$root.session.gridplanner.selected.content.headers.length + 1) * this.colwidth
    }
  },
  data() {
    return {
      colwidth: 300,

      /*
            headers :  this.$root.session.gridplanner.selected.content.headers,
      rows :  this.$root.session.gridplanner.selected.content.rows,
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
      drag: false
    };
  },
  methods: {
    updateDatabase() {
      console.log("Grid updateDatabase");
      this.$root.UpdateRecord(
        "Gridplanner",
        this.$root.session.gridplanner.selected.uuid,
        this.$root.session.gridplanner.selected
      );
    },
    addCol() {
      let obj = {}
      obj.uuid = this.$root.uuid()
      obj.title = ""
      this.$root.session.gridplanner.selected.content.headers.push(obj)
      this.$root.session.gridplanner.selected.content.rows.forEach((el) => {
        el.cells[obj.uuid] = []
      })
      this.updateDatabase();
    },
    addRow() {
      let obj = {}
      obj.title = ""
      obj.cells = {}
      this.$root.session.gridplanner.selected.content.headers.forEach((el) => {
        obj.cells[el.uuid] = []
      })
      this.$root.session.gridplanner.selected.content.rows.push(obj)
      this.updateDatabase();
    },
    deleteCol(i) {

      this.$swal(
        {
          title: this.$root.setlang.confirmmodal.confirmdelete,
          text: this.$root.setlang.confirmmodal.noundo,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$root.setlang.confirmmodal.confirmbtn,
          cancelButtonText: this.$root.setlang.confirmmodal.cancelbtn
        }).then((result) => {
          if (result.isConfirmed) {

            let delId = this.$root.session.gridplanner.selected.content.headers[i].uuid
            // remove from all the rows
            this.$root.session.gridplanner.selected.content.rows.forEach(row => {
              delete row.cells[delId]
            })
            this.$root.session.gridplanner.selected.content.headers.splice(i, 1)
            this.updateDatabase();

            this.$swal(
              this.$root.setlang.confirmmodal.success,
              this.$root.setlang.confirmmodal.successfeedback,
              'success'
            )
          }
        }
        );



    },
    deleteRow(i) {
      this.$swal(
        {
          title: this.$root.setlang.confirmmodal.confirmdelete,
          text: this.$root.setlang.confirmmodal.noundo,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$root.setlang.confirmmodal.confirmbtn,
          cancelButtonText: this.$root.setlang.confirmmodal.cancelbtn
        }).then((result) => {
          if (result.isConfirmed) {

            this.$root.session.gridplanner.selected.content.rows.splice(i, 1)
            this.updateDatabase();

            this.$swal(
              this.$root.setlang.confirmmodal.success,
              this.$root.setlang.confirmmodal.successfeedback,
              'success'
            )
          }
        }
        );



    }
  }
}
</script>

<style scoped>
#toolbox {
  position: fixed;
  top: 50px;
  height: 40px;
  width: 100%;
  background-color: var(--mm-title-bar);
  text-align: right;
}

.toolbutton {
  height: 40px;
  padding: 10px;
  border: 0px;
  color: var(--button-f);
  background-color: var(--mm-title-bar);
  cursor: pointer;
  margin-left: 5px
}

.toolbutton svg {
  fill: var(--mm-title-bar-f);
  width: 100%;
}


.toolbutton:hover,
.toolbutton:active,
.toolbutton:focus {
  color: var(--button-hover-f);
  background-color: var(--button-hover);
}

.toolbutton:hover svg,
.toolbutton:active svg,
.toolbutton:focus svg {
  fill: var(--button-hover-f);
}

.titleinput {
  background-color: inherit;
  color: inherit;
  outline: none;
  border: none;
  position: absolute;
  left: 10px;
  top: 0px;
  height: 40px;
  width: calc(100% - 100px);
}

.rowInput,
.headerInput {
  background-color: inherit;
  color: inherit;
  border: 0px;
  padding: 5px;
  width: calc(100% - 40px);

}

.headerBlock {
  background-color: var(--grid-th);
  color: var(--grid-th-f);
  padding: 10px;
  text-align: right;
  height: 50px;
}

.v-handle {
  text-align: right;
}

.handle {
  width: 40px;
  height: 40px;
  cursor: move;
  position: absolute;
  background-color: var(--grid-th);
}

.handle svg {
  top: 0px;
  left: -15px;
  fill: var(--grid-th-f)
}


.scroller {
  position: absolute;
  top: 40px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: auto;
}

td,
th,
.tblBlock {
  position: relative;
  vertical-align: top;
  height: 200px;
}

td {
  background-color: var(--grid-cell-bg);
}

th .deleteIconButton {
  top: 5px;
  right: 5px;
}

th:hover .deleteIconButton,
th:focus .deleteIconButton,
th:active .deleteIconButton {
  display: block
}
</style>