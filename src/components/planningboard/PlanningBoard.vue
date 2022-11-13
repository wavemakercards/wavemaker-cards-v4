<template>

  <div class="planningBoardHolder" v-if="WriterLQ">
    <table class="boardTable" cellspacing="0" cellpadding="0">
      <!--
        :style="'width:' + TableWidth + 'px'"
      -->
      <tr>
        <template v-for="(col, i) in WriterLQ.files" :key="i">
          <PlanningBoardCards :fileId="col.uuid" :FileNode="col" />
        </template>
      </tr>
    </table>

  </div>
  <button class="add-col-btn" @click="addFile">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
        d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
    </svg>
  </button>
</template>

<script>
import PlanningBoardCards from "./PlanningBoardCards.vue"
export default {
  name: "PlanningBoard",
  components: {
    PlanningBoardCards
  },
  data() {
    return {
      WriterLQ: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Writer.get(this.$root.session.writer.selected.uuid))),
      ColumnArray: [],
      TempArray: []
    };
  },
  methods: {
    deleteFile(index, element) {
      if (confirm(this.$root.setlang.writer.deletewarn)) {
        if (this.$root.$data.session.writer.file === element) {
          this.$root.$data.session.writer.file = null
        }
        this.WriterLQ.files.splice(index, 1)
        this.updateDatabase();
      }
    },
    addFile() {
      console.log("Add needed")

      let obj = JSON.parse(JSON.stringify(
        {
          type: "file",
          name: this.$root.setlang.writer.newfile,
          children: [],
          content: null
        }
      ));
      obj.uuid = this.$root.uuid();



      // create the new file first!!
      let file = {}
      file.title = this.$root.setlang.writer.newfile
      file.writerid = this.$root.session.writer.selected.uuid
      file.uuid = obj.uuid
      file.content = ""
      file.notes = []
      // we need to create a new file here

      this.$root.AddRecord("Files", file)

      if (this.$root.session.writer.file) {
        // file selected so put it after that one
        let i = this.WriterLQ.files.indexOf(this.$root.session.writer.file)
        this.WriterLQ.files.splice(i + 1, 0, obj);
      } else {
        this.WriterLQ.files.push(obj);
      }
      this.updateDatabase();

    },
    updateDatabase() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Writer",
        this.WriterLQ.uuid,
        this.WriterLQ
      );
    },
  }
};
</script>

<style scoped>
.add-col-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: 0px;
  padding: 10px;
  background-color: var(--button);
  color: var(--button-f);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 7px 0 5px 0px;
  cursor: pointer
}

.add-col-btn svg {
  fill: var(--button-f)
}

.add-col-btn:hover,
.add-col-btn:focus,
.add-col-btn:active {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.add-col-btn:hover svg,
.add-col-btn:focus svg,
.add-col-btn:active svg {
  fill: var(--button-hover-f)
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



.boardTable {
  position: relative;
  height: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  table-layout: fixed;
  width: max-content
}

.boardTable tr {
  margin: 0px;
  padding: 0px;
}
</style>
