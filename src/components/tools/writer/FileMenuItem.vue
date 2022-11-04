<template>

<draggable class="dragArea list-group w-full" :list="files"  tag="ul"  :group="{ name: 'g1' }">
    <li v-for="element in files"
        :key="element.uuid" >
        <div
          class="fileNode"
          :class="{
            selected: element === $root.$data.session.writer.selectedToolNode,
          }"
        >
          <div class="icon" v-if="element.type === 'folder'">
            <button @click="toggleFolder(element)">
              <svg
                v-if="!element.open"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                />
              </svg>

              <svg
                v-if="element.open"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
                />
              </svg>
            </button>
          </div>
          <div class="icon" v-if="element.type === 'file'">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"
              />
            </svg>
          </div>
          <span @click="toggleSelect(element)">{{ element.name }}</span>
        </div>
      
<Transition name="rollup">
          <FileMenuItem
            :files="element.files"
            v-if="element.type === 'folder' && element.open"
            @change="detectchange"
          />
</Transition>
      </li>

</draggable>
<!--
  <draggable
    class="dragArea"
    tag="ul"
    :list="files"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <li :id="element.uuid">
        <div
          class="fileNode"
          :class="{
            selected: element === $root.$data.session.writer.selectedToolNode,
          }"
        >
          <div class="icon" v-if="element.type === 'folder'">
            <button @click="toggleFolder(element)">
              <svg
                v-if="!element.open"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                />
              </svg>

              <svg
                v-if="element.open"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
                />
              </svg>
            </button>
          </div>
          <div class="icon" v-if="element.type === 'file'">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"
              />
            </svg>
          </div>
          <span @click="toggleSelect(element)">{{ element.name }}</span>
        </div>
        <Transition name="list">
          <FileMenuItem
            :files="element.files"
            v-if="element.type === 'folder' && element.open"
            @change="detectchange"
          />
        </Transition>
      </li>
    </template>
  </draggable>
  -->
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "FileMenuItem",
  components: {
    draggable :VueDraggableNext,
  },
  props: {
    files: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      showfiles: true,
    };
  },
  methods: {
    detectchange() {
      this.$emit("change");
    },
    toggleFolder(element) {
      element.open = !element.open;
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selectedToolId,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selectedToolId
        ]
      );
    },
    toggleSelect(item) {
      if (this.$root.$data.session.writer.selectedToolNode != item) {
        this.$root.$data.session.writer.selectedToolNode = null; // should force the component to reload
        /** otherwise the fileviewer  component does not fire the Mounted hook that check s and creates
         * TODO : come up with something better here - maybe
         */
        this.$root.$data.session.writer.selectedToolNode = item;
      } else {
        this.$root.$data.session.writer.selectedToolNode = null;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.dragArea {
  min-height: 30px;
  width:250px;
}
.dragArea:empty {
  background-color: var(--c6);
}
li span {
  display: block;
  width: 100%;
  min-height: 24px;
}

li span:empty::before {
  content: "______";
}

ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
li > ul {
  margin-left: 5px;
}
li {
  padding-left: 0px;
  padding-top: 0px;
}

.fileNode {
  position: relative;
  padding-left: 40px;
  padding-top: 13px;
  cursor: pointer;
  min-height: 40px;
  opacity: 0.7;
}

.icon {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px;
  width: 30px;
}
.icon button {
  margin: 0px;
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;
}
.icon svg {
  fill: #fff;
  width: 24px;
  height: 24px;
}
.selected {
  opacity: 1;
  text-decoration: underline;
}

/* Vue generated animation state classes for active state*/
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

/* Vue generated animation state classes for enter and leave states*/
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
