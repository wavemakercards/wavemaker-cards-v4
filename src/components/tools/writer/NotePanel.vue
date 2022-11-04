<template>

  <div
    id="NotePanel"
    :style="$root.$data.session.writer.rhs ? 'right:-300px;' : ''"
    v-if="$root.$data.shadowDB.Pages[$root.$data.session.writer.selectedToolNode.uuid]"
  >
 
    <draggable>
        <div class="list-group-item" v-for="(element, index) in $root.$data.shadowDB.Pages[
          $root.$data.session.writer.selectedToolNode.uuid
        ].notes" :key="element.uuid" >
       
          <CardViewer :cardid="element.uuid" :allowlink="true" :updateelement="element" />
           <button class="clearInterfaceIconButton delBtn" @click="removeCard(index)">
<svg  viewBox="0 0 24 24">
    <path  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
</svg>
           </button>
        </div>
    
    
    </draggable>
  
    <div
      class="buttonholder"
      :style="$root.$data.session.writer.rhs ? 'right:-260px;' : ''"
    >
      <button
        class="toggleButton"
        @click="
          $root.$data.session.writer.rhs = !$root.$data.session.writer.rhs
        "
      >
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          v-if="$root.$data.session.writer.rhs"
        >
          <path
            d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"
          />
        </svg>

        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          v-if="!$root.$data.session.writer.rhs"
        >
          <path
            d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z"
          />
        </svg>
      </button>
      <button  @click="addNote"  style="float:right; width:40px;">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 11H16V13H13V16H11V13H8V11H11V8H13V11M22 5.5V16L16 22H5.5C3.6 22 2 20.4 2 18.5V5.5C2 3.6 3.6 2 5.5 2H18.5C20.4 2 22 3.6 22 5.5M20 5.8C20 4.8 19.2 4 18.2 4H5.8C4.8 4 4 4.8 4 5.8V18.3C4 19.3 4.8 20.1 5.8 20.1H15V18.6C15 16.7 16.6 15.1 18.5 15.1H20V5.8Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
//TODO : add Link to card tool to the system

import CardViewer from "@/components/universal/CardViewer";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "NotePanel",
  components: {
    draggable: VueDraggableNext,
    CardViewer,
  },
  data() {
    return {
      dragging: false,
    };
  },
  methods: {
    addNote() {
      let note = { uuid: this.$root.uuid() };
      console.log(
        this.$root.$data.shadowDB.Pages[
          this.$root.$data.session.writer.selectedToolNode.uuid
        ].notes
      );
      this.$root.$data.shadowDB.Pages[
        this.$root.$data.session.writer.selectedToolNode.uuid
      ].notes.push(note);
      this.changecall();
    },
    removeCard(index){
      if(confirm("You are about to remove this card?")){
        this.$root.$data.shadowDB.Pages[
        this.$root.$data.session.writer.selectedToolNode.uuid
      ].notes.splice(index, 1)
        this.changecall();
      }
    },
    changecall: function () {
      this.$root.UpdateRecord(
        "Pages",
        this.$root.$data.session.writer.selectedToolNode.uuid,
        this.$root.$data.shadowDB.Pages[
          this.$root.$data.session.writer.selectedToolNode.uuid
        ]
      );
    },
  }
};
</script>

<style scoped>
#NotePanel {
  position: absolute;
  right: 0px;
  top:40px;
  bottom: 0px;
  width: 300px;
  padding-top: 0px;
  background-color: var(--c9);
  overflow-y: auto;
border-left:2px solid var(--c10);
}

.buttonholder {
  position: fixed;
  top: 40px;
  right: 0px;
  width: 300px;
  background-color: var(--c10);
  height: 40px;
}
.buttonholder button svg {
  fill: var(--accent-f);
}
.buttonholder button {
  width: 130px;
  border-radius: 0px;
  border: 0px;
  cursor: pointer;
  height: 40px;
  background-color: var(--accent);
}
.toggleButton {
  width: 40px !important;
}
.buttonholder button:active,
.buttonholder button:hover,
.buttonholder button:focus {
  background-color: var(--success);
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
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
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

.list-group-item:focus-within .delBtn{
  display: block;
}
</style>
