<template>
  <VueDraggableNext :list="list" tag="transition-group" handle=".handle" :component-data="{
    tag: 'div',
    type: 'transition-group',
    name: !drag ? 'flip-list' : null,
  }" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order" @change="updateDatabase"
    :emptyInsertThreshold="50">

    <template v-for="(element, index) in list" :key="index">
      <div class="childbox">
        <div class="list-group-item" tabindex="0">


          <div class="itemBox">

            <NodeTemplate :nodeElement="element" :key="element.uuid" @selectNode="selectNode(element)"
              @toggleFolder="element.open = !element.open" />

            <button class="deleteIconButton" @click="deleteFile(index, element)" tabindex="0">
              <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                <path
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
              </svg>
            </button>

          </div>


          <transition name="folderslide">
            <template v-if="element.open">
              <WriterNode :list="element.children" @updateDatabase="updateDatabase" @selectNode="selectNode(element)" />
            </template>
          </transition>
        </div>



      </div>


    </template>
  </VueDraggableNext>
</template>

<script>

import { VueDraggableNext } from "vue-draggable-next";
import NodeTemplate from "./NodeTemplate"
export default {
  name: "WriterNode",
  components: {
    VueDraggableNext,
    NodeTemplate
  },
  emits: ["updateDatabase"],
  props: {
    list: Array
  },
  data() {
    return {
      drag: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {

    deleteFile(index, element) {

      this.$swal(
        {
          title: 'Are you sure?',
          text: "You won't be able to undo this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {

            if (this.$root.session.writer.file) {
              if (this.$root.session.writer.file.uuid === element.uuid) {
                this.$root.session.writer.file = null
              }
            }
            if (element.children.length) {
              console.log(element.children)
              this.recursiveDelete(element.children)
            }
            //eslint-disable-next-line
            this.list.splice(index, 1)
            this.updateDatabase()
            this.$root.DeleteRecord("Files", element.uuid)

            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        );



    },
    recursiveDelete(list) {
      list.forEach(element => {
        if (this.$root.session.writer.file) {
          if (this.$root.session.writer.file.uuid === element.uuid) {
            this.$root.session.writer.file = null
          }
        }
        if (element.children.length) {
          this.recursiveDelete(element.children)
        }
        this.$root.DeleteRecord("Files", element.uuid)
      })
    },
    updateDatabase() {
      this.$emit("updateDatabase")
    },
    selectNode(element) {
      console.log("select", element)
      this.$root.session.writer.file = element
    }
  }
}

</script>



<style scoped>
.itemBox {
  padding-right: 25px;
}




.settingsBtn {
  height: 40px;
  width: 100%;
  background-color: var(--writer-side-nav);
  color: var(--writer-side-nav-f);
  text-align: left;
  padding-left: 40px;
  cursor: pointer;
}

.settingsBtn svg {
  position: absolute;
  left: 5px;
  top: 5px;
  fill: var(--writer-side-nav-f);
}

.settingsBtn:hover,
.settingsBtn:focus,
.settingsBtn:active {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.settingsBtn:hover svg,
.settingsBtn:focus svg,
.settingsBtn:active svg {
  fill: var(--button-hover-f)
}

.pinBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 0px;
  background: none;
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--writer-side-nav);

}

.pinBtn svg {
  fill: var(--writer-side-nav-f);
}



.pinBtn:hover,
.pinBtn:active,
.pinBtn:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);

}

.pinBtn:hover svg,
.pinBtn:active svg,
.pinBtn:focus svg {
  fill: var(--button-hover-f);
}



.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: var(--hover-ghost);
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  position: relative;
  display: block;
  cursor: pointer;
  padding: 5px;
  padding-top: 10px;
  min-height: 40px;
  background-color: var(--writer-side-panels);
  color: var(--writer-side-panels-f);
}

.list-group-item svg {
  fill: var(--writer-side-panels-f);
}

/*
.list-group-item:hover,
.list-group-item:focus,
.list-group-item:active  {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}
*/
.childbox {
  padding-left: 10px;
}

.itemBox:hover .deleteIconButton,
.itemBox:focus .deleteIconButton,
.itemBox:active .deleteIconButton {
  display: block
}


.menu {
  font-weight: 100;
  background: var(--writer-side-panels);
  color: var(--writer-side-panels-f);
  width: 300px;
  height: 100%;
  padding: 0px;
  padding-right: 40px;
  padding-top: 0px;
  position: fixed;
  top: 50px;

  -webkit-box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  left: -260px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.menu:hover,
.menu:focus,
.lhspinned {
  transform: translate3d(260px, 0, 0);
  animation-timing-function: 1s ease-in;
}



.scrollpanel {
  overflow-y: auto;
  position: absolute;
  top: 40px;
  bottom: 0px;
  width: 100%;
  padding: 0px;
  background-color: inherit
}

.addbar {
  position: absolute;
  top: 0px;
  background-color: var(--writer-side-nav);
  width: calc(100% - 40px);
  height: 40px;
}

.addbar button {
  border: 0px;
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--writer-side-nav);
  color: var(--writer-side-nav-f);
}

.addbar button svg {
  fill: var(--writer-side-nav-f);
}

.addbar button:hover,
.addbar button:active,
.addbar button:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.addbar button:hover svg,
.addbar button:active svg,
.addbar button:focus svg {
  fill: var(--button-hover-f);
}
</style>

