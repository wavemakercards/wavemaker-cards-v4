<template>

  <div class="planningBoardHolder" v-if="WriterLQ">
    <div id="toolbox" @click="this.$root.session.writer.file = this.WriterLQ">
      <input v-model="this.WriterLQ.title" class="titleinput" @change="updateDatabase" />

      <button @click="this.$root.session.selectedTool = 'writer'" class="toolbutton">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" />
        </svg>
      </button>
    </div>
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

            if (this.$root.$data.session.writer.file === element) {
              this.$root.$data.session.writer.file = null
            }
            this.WriterLQ.files.splice(index, 1)
            this.updateDatabase();

            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        );
    },
    addFile() {
      console.log("Add needed")

      let obj = JSON.parse(JSON.stringify(
        {
          type: "file"
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

      /*
      if (this.$root.session.writer.file) {
        // file selected so put it after that one
        let i = this.WriterLQ.files.indexOf(this.$root.session.writer.file)
        this.WriterLQ.files.splice(i + 1, 0, obj);
      } else {
        this.WriterLQ.files.push(obj);
      }
*/
      this.WriterLQ.files.push(obj);
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
  width: calc(100% - 80px);
}

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
  margin-top: 40px;
  padding: 0px;
  border: none;
  table-layout: fixed;
  width: max-content
}

.boardTable tr {
  margin: 0px;
  padding: 0px;
}


.toolbutton {
  height: 40px;
  width: 40px;
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
</style>
