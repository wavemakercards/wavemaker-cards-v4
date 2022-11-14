<template>

  <line class="link" :class="mylink.type" :x1="this.$root.session.mindmap.selected.content.nodes[mylink.from].x + 100"
    :y1="this.$root.session.mindmap.selected.content.nodes[mylink.from].y  + 15"
    :x2="this.$root.session.mindmap.selected.content.nodes[mylink.to].x  + 100"
    :y2="this.$root.session.mindmap.selected.content.nodes[mylink.to].y  + 15" @click="deletelink">
    <marker id="black-arrow" viewBox="0 0 10 10" refX="10" refY="15" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </line>

</template>
<script>


export default {
  name: "LinkNodes",
  props: {
    mylink: Object,
    myindex: Number
  },
  methods: {
    deletelink() {
      console.log("delete", this.myindex)
      this.$root.session.mindmap.selected.content.links.splice(this.myindex, 1)
      this.savechange()
    }
  },
  savechange() {
    console.log("list changed");
    this.$root.UpdateRecord(
      "Mindmap",

      this.$root.$data.session.mindmap.selected.uuid,
      this.$root.$data.session.mindmap.selected

    );
  }
}
</script>

<style scoped >
.solid {
  stroke-width: 4px;
  stroke: var(--mm-background-f)
}

.dotted {
  stroke-dasharray: 2;
  stroke-width: 4px;
  stroke: var(--mm-background-f)
}

.dashed {
  stroke-dasharray: 5;
  stroke-width: 4px;
  stroke: var(--mm-background-f)
}

.link {
  cursor: pointer;
}

.link:hover {
  stroke: var(--danger);
}
</style>