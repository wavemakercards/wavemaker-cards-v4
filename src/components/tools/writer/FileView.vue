<template>
  <div
    class="main"
  >
    <div
      v-if="
        $root.$data.shadowDB.Pages[
          $root.$data.session.writer.selectedToolNode.uuid
        ]
      "
    >
      <PagesEditor
        v-model="
          $root.$data.shadowDB.Pages[
            $root.$data.session.writer.selectedToolNode.uuid
          ].content
        "
        :Pagesid="$root.$data.session.writer.selectedToolNode.uuid"
      />
    </div>
    <div class="toolbar" :style = "($root.$data.session.writer.lhs)?'left:80px;':''">
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"
        />
      </svg>
      <input
        type="text"
        v-model="$root.$data.session.writer.selectedToolNode.name"
        @change="updateWriterFilename"
      />
    </div>
  </div>

  <NotePanel />
</template>

<script>
import NotePanel from "./NotePanel";
import PagesEditor from "@/components/universal/PagesEditor";
export default {
  name: "FileView",
  components: {
    NotePanel,
    PagesEditor,
  },
  data() {
    return {};
  },
  methods: {
    updateWriterFilename() {
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selectedToolId,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selectedToolId
        ]
      );
    },
    updatePages() {
      this.$root.UpdateRecord(
        "Pages",
        this.$root.$data.session.writer.selectedToolNode.uuid,
        this.$root.$data.shadowDB.Pages[
          this.$root.$data.session.writer.selectedToolNode.uuid
        ]
      );
    },
  },
  mounted() {
    console.log(
      "this node",
      this.$root.$data.shadowDB.Pages[
        this.$root.$data.session.writer.selectedToolNode.uuid
      ]
    );

    if (this.$root.$data.session.writer.selectedToolNode.type === "file") {
      // check if there is a Pages item
      if (
        !this.$root.$data.shadowDB.Pages[
          this.$root.$data.session.writer.selectedToolNode.uuid
        ]
      ) {
        console.log("creating");
        let obj = {};
        obj.uuid =
          this.$root.$data.session.writer.selectedToolNode.uuid.toString(); // use the same uuid to link them
        obj.projectID = this.$root.$data.session.selectedProject.toString();
        obj.writerID = this.$root.$data.session.writer.selectedToolId;
        obj.content = "";
        obj.notes = [];
        this.$root.$data.shadowDB.Pages[obj.uuid] = obj;
        this.$root.AddRecord("Pages", obj);
      }
    }
  },
};
</script>
<style scoped>
.toolbar {
  position: fixed;
  top: 40px;
  width: 100%;
  background-color: var(--c10);
  height: 40px;
  left: 340px;
  padding-left:40px;
}
.toolbar svg {
  position: absolute;
  top: 7px;
  left: 15px;
  fill: var(--c9-f);
}
.toolbar input {
  width: 100%;
  display: block;
  margin: 0 auto;
  background-color: none;
  background: none;
  color: var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}
.main {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
}





</style>