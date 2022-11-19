<template>
  <vue-draggable-resizable :parent="false" class="card" :key="uuid" @dragging="onDrag" @resizing="onResize"
    :w="this.$root.session.mindmap.selected.content.nodes[this.uuid].w"
    :h="this.$root.session.mindmap.selected.content.nodes[this.uuid].h"
    :x="this.$root.session.mindmap.selected.content.nodes[this.uuid].x"
    :y="this.$root.session.mindmap.selected.content.nodes[this.uuid].y" :resizable="false" @focus="onActivated(uuid)"
    @activated="onActivated(uuid)" @deactivated="onDeactivated" :enable-native-drag="false"
    :drag-handle="'.drag-handle'" tabindex="0" :max-height="32" :min-height="32" v-bind:class="
      $root.session.mindmap.currentnode === uuid
        ? 'activeClass'
        : 'inactiveClass'
    ">
    <div class="drag-handle" tabindex="0" @keydown.up.exact.prevent.stop="$root.moveNode('up')"
      @keydown.down.exact.prevent.stop="$root.moveNode('down')"
      @keydown.left.exact.prevent.stop="$root.moveNode('left')"
      @keydown.right.exact.prevent.stop="$root.moveNode('right')">
      <svg viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
      </svg>
    </div>
    <template v-if="this.$root.session.mindmap.selected.content.nodes[this.uuid].type === 'image'">

      <template v-if="this.$root.session.mindmap.selected.content.nodes[this.uuid].text">
        <MiniImage :uuid="this.$root.session.mindmap.selected.content.nodes[this.uuid].text" style="max-width:300px"
          :key="this.$root.session.mindmap.selected.content.nodes[this.uuid].text" />
        <button @click="addImage" class="NewImageBtn" v-if="$root.session.mindmap.currentnode === uuid">
          <svg viewBox="0 0 24 24">
            <path
              d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z" />
          </svg>
        </button>
      </template>

      <template v-else>
        <button class="imageButton" @click="addImage">
          <svg viewBox="0 0 24 24">
            <path
              d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z" />
          </svg>
        </button>

      </template>

    </template>
    <template v-else>
      <textarea ref="textarea" v-model="this.$root.session.mindmap.selected.content.nodes[this.uuid].text"
        @click="onActivated(uuid)" style="width:300px" cols="30" rows="1" @keyup="resizeTextarea"></textarea>
    </template>



    <button id="deleteButton" @click="deleteNode(uuid)" v-if="$root.session.mindmap.currentnode === uuid" tabindex="0">
      <svg viewBox="0 0 24 24">
        <path
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </button>
    <button tabindex="0" id="linkButton" @click="linker(uuid)" v-if="$root.session.mindmap.currentnode === uuid">
      <svg viewBox="0 0 24 24">
        <path
          d="M10.6 13.4A1 1 0 0 1 9.2 14.8A4.8 4.8 0 0 1 9.2 7.8L12.7 4.2A5.1 5.1 0 0 1 19.8 4.2A5.1 5.1 0 0 1 19.8 11.3L18.3 12.8A6.4 6.4 0 0 0 17.9 10.4L18.4 9.9A3.2 3.2 0 0 0 18.4 5.6A3.2 3.2 0 0 0 14.1 5.6L10.6 9.2A2.9 2.9 0 0 0 10.6 13.4M23 18V20H20V23H18V20H15V18H18V15H20V18M16.2 13.7A4.8 4.8 0 0 0 14.8 9.2A1 1 0 0 0 13.4 10.6A2.9 2.9 0 0 1 13.4 14.8L9.9 18.4A3.2 3.2 0 0 1 5.6 18.4A3.2 3.2 0 0 1 5.6 14.1L6.1 13.7A7.3 7.3 0 0 1 5.7 11.2L4.2 12.7A5.1 5.1 0 0 0 4.2 19.8A5.1 5.1 0 0 0 11.3 19.8L13.1 18A6 6 0 0 1 16.2 13.7Z" />
      </svg>
    </button>
  </vue-draggable-resizable>
</template>

<script>
import MiniImage from '../universal/MiniImage.vue';
export default {
  name: "NodeBox",
  components: {
    MiniImage
  },
  props: {
    uuid: String,
  },
  data() {
    return {
      editme: false,
      w: 200,
      h: 200,
      x: 50,
      y: 50,
    };
  },
  methods: {
    resizeTextarea() {
      let element = this.$refs["textarea"];
      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    },
    textchange() {
      /*
      if (this.$root.session.mindmap.selected.content.nodes[this.uuid].text.length > 30) {
        document.getElementById(this.uuid).style.width =
          this.$root.session.mindmap.selected.content.nodes[this.uuid].text.length * 6.2 + "px";
      } else {
        document.getElementById(this.uuid).style.width = 30 * 6.2 + "px";
      }
      this.savechange();
      */
    },
    onResize: function (x, y, width, height) {
      this.$root.session.mindmap.selected.content.nodes[this.uuid].x = x;
      this.$root.session.mindmap.selected.content.nodes[this.uuid].y = y;
      this.$root.session.mindmap.selected.content.nodes[this.uuid].width = width;
      this.$root.session.mindmap.selected.content.nodes[this.uuid].height = height;

    },
    onDrag: function (x, y) {
      this.$root.session.mindmap.selected.content.nodes[this.uuid].x = x;
      this.$root.session.mindmap.selected.content.nodes[this.uuid].y = y;

    },
    onActivated(c) {
      this.$root.session.mindmap.currentnode = c;
    },
    onDeactivated() {
      this.$root.session.mindmap.currentnode = null;
      this.savechange();
    },
    linker(u) {
      if (!this.$root.session.mindmap.nodelink) {
        this.$root.session.mindmap.nodelink = u;

      } else {
        // add the link line
        if (this.$root.session.mindmap.nodelink != u) {
          console.log("link ", this.$root.session.mindmap.nodelink, " to ", u);

          let o = {};
          o.type = this.$root.session.mindmap.linkstyle;
          o.from = this.$root.session.mindmap.nodelink;
          o.to = u;
          this.$root.session.mindmap.selected.content.links.push(o);
        }
        this.$root.session.mindmap.nodelink = null;
      }
      this.savechange();
    },
    deleteNode(u) {


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


            this.$root.session.mindmap.selected.content.links = this.$root.session.mindmap.selected.content.links.filter((v) => {
              if (v.from !== u && v.to !== u) {
                return true;
              }
            });
            // delete the node
            delete this.$root.session.mindmap.selected
              .content.nodes[u];
            this.savechange();

            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        );










    },
    savechange() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Mindmap",
        this.$root.$data.session.mindmap.selected.uuid,
        this.$root.$data.session.mindmap.selected
      );
    },
    imageCallback() {
      console.log("Callback fired")
    },
    addImage() {
      // pass the object we want the image manager to update
      this.$root.imagemanager = {
        table: "Gridplanner",
        targetuuid: this.$root.$data.session.mindmap.selected.uuid,
        target: this.$root.session.mindmap.selected.content.nodes[this.uuid],
        updateObj: this.$root.session.mindmap.selected
      }
    },
  },
  mounted() {
    if (!this.$root.session.mindmap.selected.content.nodes[this.uuid]) {
      this.resizeTextarea()
    }

  },
};
</script>

<style scoped >
.imageButton {
  width: 300px;
  height: 300px;
  background-color: var(--accent);
  color: var(--accent-f);
  fill: var(--accent-f);
  cursor: pointer;
}

.imageButton svg {
  width: 100px;
}

#deleteButton {
  position: absolute;
  right: -10px;
  top: -15px;
  width: 24px;
  height: 24px;
  background-color: var(--danger);
  color: var(--danger-f);
  font-weight: bold;
  border-radius: 15px;
  border: 0;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
}

#deleteButton svg {
  fill: var(--danger-f);
  width: 100%;
  padding: 4px;
}

#deleteButton:hover,
#deleteButton:focus,
#deleteButton:active {
  background-color: var(--button-hover)
}

#deleteButton:hover svg,
#deleteButton:focus svg,
#deleteButton:active svg {
  fill: var(--button-hover-f);

}

.NewImageBtn {
  position: absolute;
  left: -10px;
  bottom: -15px;
  width: 24px;
  height: 24px;
  background-color: var(--button);
  color: var(--button-f);
  font-weight: bold;
  border-radius: 15px;
  border: 0px;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
}

.NewImageBtn svg {
  fill: var(--button-f);
  width: 100%;
  padding: 4px;
}

.NewImageBtn:hover,
.NewImageBtn:focus,
.NewImageBtn:active {
  background-color: var(--button-hover);
}


.NewImageBtn:hover svg,
.NewImageBtn:focus svg,
.NewImageBtn:active svg {

  fill: var(--button-hover-f);
}

#linkButton {
  position: absolute;
  right: -10px;
  bottom: -15px;
  width: 24px;
  height: 24px;
  background-color: var(--button);
  color: var(--button-f);
  font-weight: bold;
  border-radius: 15px;
  border: 0px;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
}

#linkButton svg {
  fill: var(--button-f);
  width: 100%;
  padding: 4px;
}

#linkButton:hover,
#linkButton:focus,
#linkButton:active {
  background-color: var(--button-hover);
}

#linkButton:hover svg,
#linkButton:focus svg,
#linkButton:active svg {

  fill: var(--button-hover-f);
}

.activeClass .drag-handle {
  display: block;
  position: absolute;
  left: -30px;
  top: 0px;
  cursor: move;
  opacity: 1;
}

.inactiveClass .drag-handle {
  display: none;
}

.drag-handle {
  padding: 7px;
  width: 30px;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 30px;
  background-color: var(--mm-handle-bar);
  color: var(--mm-handle-bar-f);
}

.drag-handle svg {
  fill: var(--mm-handle-bar-f);
}

textarea {
  font-family: var(--sysfont);
  padding: 10px;
  overflow: hidden;
  min-height: 20px;
  outline: none;
  border: none;
}

.card {
  padding: 0px;
  background-color: var(--mm-node);
  color: var(--mm-node-f);
  white-space: pre-line;
  cursor: move;
  height: auto !important
}

.card .inputcontrol {
  border: 0px;
  padding: 5px;
  border: 0px;
  outline: none;
}

.active {
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=17, Direction=0, Color=#000000)";
  /*IE 8*/
  -moz-box-shadow: 0 5px 17px -5px #000000;
  /*FF 3.5+*/
  -webkit-box-shadow: 0 5px 17px -5px #000000;
  /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
  box-shadow: 0 5px 17px -5px #000000;
  /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=17, Direction=135, Color=#000000);
  /*IE 5.5-7*/
}
</style>
