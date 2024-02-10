<template>
  <div id="toolbox">
    <input v-model="$root.session.mindmap.selected.title" class="titleinput" @change="updateDatabase" />


    <select v-model="$root.session.mindmap.linkstyle" class="toolselect">
      <option value="solid">_____</option>
      <option value="dashed">- - - -</option>
      <option value="dotted">..........</option>
    </select>

    <button @click="addNode" class="toolbutton" style="wid">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
        d="M5 19V5H12V12H19V13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H13.35C13.13 20.37 13 19.7 13 19H5M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
     </svg>
    </button>

    <button @click="addNode('image')" class="toolbutton">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          d="M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z" />
      </svg>
    </button>


  </div>
</template>

<script>
export default {
  name: "ToolBox",
  methods: {
    addNode(i) {
      let o = {
        text: "",
        x: 50,
        y: 50,
        w: "auto",
        h: 32
      }
      if (i) {
        o.type = i
      }
      this.$root.session.mindmap.selected.content.nodes[this.$root.uuid()] = o
    },
    updateDatabase() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Mindmap",
        this.$root.$data.session.mindmap.selected.uuid,
        this.$root.$data.session.mindmap.selected
      );
    },
  },
  mounted() {
    if (!this.$root.session.mindmap.linkstyle) {
      this.$root.session.mindmap.linkstyle = "solid"
    }
  }
};
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

.titleinput {
  background-color: inherit;
  color: inherit;
  outline: none;
  border: none;
  position: absolute;
  left: 10px;
  top: 0px;
  height: 40px;
  width: calc(100% - 180px);

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


.toolselect {
  position: relative;
  display: inline-block;
  top: -10px;
  height: 40px;
  padding: 10px;
  font-weight: bold;
  background-color: var(--mm-title-bar);
  color: var(--mm-title-bar-f);
  border: 0px;
  outline: none;
}
</style>
