<template>
  <div class="toolbox">
    <ProjectInfo v-if="!$root.session.selectedTool" />
    <WriterMenu v-if="$root.session.selectedTool === 'writer'" />
    <CardsDatabaseHome v-if="$root.session.selectedTool === 'cardsdatabase'" />
    <PlanningBoardHome v-if="$root.session.selectedTool === 'planningboard'" />
    <SnowFlake v-if="$root.session.selectedTool === 'snowflake'" />
    <TimeLine v-if="$root.session.selectedTool === 'timeline'" />
    <MindMapHome v-if="$root.session.selectedTool === 'mindmap'" />
    <GridPlannerHome v-if="$root.session.selectedTool === 'gridplanner'" />

  </div>
  <ToolBar />


  <DistractionFree v-if="$root.session.selectedTool === 'distractionfree'" />
</template>

<script>
import ToolBar from "@/components/ToolBar.vue";
import ProjectInfo from "@/components/project/ProjectInfo.vue";
import WriterMenu from "@/components/writer/WriterMenu.vue";
import CardsDatabaseHome from "@/components/cardsdatabase/CardsDatabaseHome.vue";
import PlanningBoardHome from "@/components/planningboard/PlanningBoardMenu.vue";
import SnowFlake from "@/components/snowflake/SnowFlake.vue";
import TimeLine from "@/components/timeline/TimeLine.vue";
import MindMapHome from "@/components/mindmap/MindMapHome.vue";
import GridPlannerHome from "@/components/gridplanner/GridPlannerHome.vue";
import DistractionFree from "@/components/distractionfree/DistractionFree.vue";

export default {
  name: "StartApp",
  components: {
    ToolBar,
    ProjectInfo,
    WriterMenu,
    PlanningBoardHome,
    SnowFlake,
    TimeLine,
    MindMapHome,
    CardsDatabaseHome,
    GridPlannerHome,
    DistractionFree
  },
  methods: {},
  async mounted() {

    let params = new URLSearchParams(document.location.search);
    let sc = params.get("sc");
    let sel = params.get("sel");
    // hide em away
    params.delete("sc");
    params.delete("sel");
    if (sc === "planningboard") {
      this.$root.session.writer = {}
      this.$root.session.writer.selected = this.$root.useObservable(this.$root.liveQuery(() => this.$root.db.Writer.get(sel)))
      this.$root.session.selectedTool = sc;
    }



    // only for dev
    if (localStorage.getItem("wmDev")) {
      this.session = JSON.parse(localStorage.getItem("wmDev"));
    }
    // now we loaded pop in the warning here
    window.addEventListener("beforeunload", this.$root.unloadEvent);
  },
};
</script>

<style scoped>
.toolbox {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: inherit;
  color: inherit;
}
</style>