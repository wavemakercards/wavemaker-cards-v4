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
        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
    </div>

    <input v-model="this.$root.session.mindmap.selected.content.nodes[this.uuid].text" @keyup="textchange"
      class="inputcontrol" :id="uuid" @click="onActivated(uuid)" />
    <!--
    <textarea
      v-model="card.text"
      @keydown.stop="
        () => {
          return true;
        }
      "
    ></textarea>
    -->
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
export default {
  name: "NodeBox",
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
    textchange() {
      if (this.$root.session.mindmap.selected.content.nodes[this.uuid].text.length > 30) {
        document.getElementById(this.uuid).style.width =
          this.$root.session.mindmap.selected.content.nodes[this.uuid].text.length * 6.2 + "px";
      } else {
        document.getElementById(this.uuid).style.width = 30 * 6.2 + "px";
      }
      this.savechange();
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
      if (confirm(this.$root.setlang.mindmap.deletenodewarn)) {
        // remove any links with this UUID in

        this.$root.session.mindmap.selected.content.links = this.$root.session.mindmap.selected.content.links.filter((v) => {
          if (v.from !== u && v.to !== u) {
            return true;
          }
        });
        // delete the node
        delete this.$root.session.mindmap.selected
          .content.nodes[u];
        this.savechange();
      }
    },
    savechange() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Mindmap",
        this.$root.$data.session.mindmap.selected.uuid,
        this.$root.$data.session.mindmap.selected
      );
    },
  },
  mounted() {
    this.textchange();
  },
};
</script>

<style scoped >
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
  background-color: var(--button-hover)
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

.card {
  padding: 0px;
  background-color: var(--mm-node);
  color: var(--mm-node-f);
  white-space: pre-line;
  cursor: move;
}

.card .inputcontrol {
  border: 0px;
  height: 30px;
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
