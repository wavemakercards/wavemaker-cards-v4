<template>

  <VueDraggableNext :list="parentList" tag="transition-group" group="board" class="list-group-card" :component-data="{
    tag: 'div',
    type: 'transition-group',
    name: !drag ? 'flip-list' : null,
  }" handle=".cardHandle" v-bind="dragOptions" @start="drag = true" @end="drag = false"
    :emptyInsertThreshold="90" @change="ListChanged">
    <template v-for="(element, index) in parentList" :key="index">
      <div class="list-group-card-item" tabindex="0">


        <CardViewer :cardid="element.uuid" :allowlink="true" :updateelement="element"
          :key="(this.$root.shadowDB.Cards[element.uuid]) ? this.$root.shadowDB.Cards[element.uuid].lastupdated : $root.uuid()" />

        <div class="clearInterfaceIconButton cardHandle">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path
              d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
          </svg>
        </div>
        <button class="deleteIconButton" @click="deleteNote(index, parentList)" tabindex="0">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
          </svg>
        </button>



      </div>
    </template>
  </VueDraggableNext>
  <button class="add-card" @click="addCard(parentList)" :class="{ 'bigbtn': !parentList.length }">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
        d="M13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H20C21.11 4 22 4.89 22 6V13.81C21.12 13.3 20.09 13 19 13C15.69 13 13 15.69 13 19C13 19.34 13.04 19.67 13.09 20M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
    </svg>
  </button>



</template>

<script>

import { VueDraggableNext } from "vue-draggable-next";
import CardViewer from "@/components/universal/CardViewer.vue"
export default {
  name: "GridPlannerCell",
  emits: ['MakeChange'],
  components: {
    VueDraggableNext,
    CardViewer
  },
  props: {
    parentList: {
      type: Array,
      required: true
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "Cards",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    return {
      drag: false,
      colWidth: 320
    };
  },
  methods: {
    deleteNote(index) {
      if (confirm("delete this note?")) {
        // eslint-disable-next-line 
        this.parentList.splice(index, 1)
        this.ListChanged();
      }
    },
    addCard() {

      let obj = {}
      obj.uuid = this.$root.uuid()
      // eslint-disable-next-line 
      this.parentList.push(obj)
      this.ListChanged();

    },
    ListChanged() {
      this.$emit('MakeChange')
    },
  },
};
</script>

<style scoped>
.add-card {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  top: -30px;
  right: -240px;
  border-radius: 20px;
  border: 0px;
  padding: 10px;
  background-color: var(--accent);
  color: var(--accent-f);
  cursor: pointer
}

.add-card svg {
  width: 100%;
  top: -2px;
  left: -2px;
  fill: var(--accent-f)
}

.add-card:hover,
.add-card:active,
.add-card:focus {
  background-color: var(--primary);
  color: var(--primary-f);
}

.add-card:hover svg,
.add-card:active svg,
.add-card:focus svg {
  fill: var(--primary-f)
}

.bigbtn {
  margin-top: 80px !important;
  background-color: var(--accent);
  top: auto;
  right: auto;
  margin: 0 auto;
}

.bigbtn svg {
  fill: var(--accent-f);
}


.planningBoardHolder {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 0px;
  overflow: auto;

}

.hscroll {
  background-color: inherit;
}

.noteCol {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 40px;

}

.titleBar {
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: inherit;

}

.titleBarInput {
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  height: 40px;
  padding: 10px;
  border: 0px;
  width: 100%;
  outline: none;
  text-align: center;
  font-weight: bold;
}

.columnData {
  position: absolute;
  top: 40px;
  height: 100%;
  bottom: 0px;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 200px;

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

.list-group-card {
  min-height: 20px;
}

.list-group-card-item {
  position: relative;
  display: block;
  cursor: pointer;
  padding: 8px;
  padding-top: 10px;
  min-height: 40px;
  background-color: inherit;

}




.list-group-card-item:hover,
.list-group-card-item:focus,
.list-group-card-item:active {
  background-color: var(--accent);
  color: var(--accent-f);
}

.list-group-card-item:hover .deleteIconButton,
.list-group-card-item:focus .deleteIconButton,
.list-group-card-item:active .deleteIconButton {
  display: block
}


.list-group-card-item .cardHandle {
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  background-color: var(--accent);
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 15px;
  ;
}

.list-group-card-item .cardHandle svg {
  width: 18px;
  fill: var(--accent-f)
}

.list-group-card-item:hover .cardHandle,
.list-group-card-item:focus .cardHandle,
.list-group-card-item:active .cardHandle {
  display: block
}
</style>
