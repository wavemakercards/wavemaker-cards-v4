<template>
  <div class="toolbar">
    <input
      v-model="
        $root.$data.shadowDB.Gridplanner[
          $root.$data.session.gridplanner.currentboard
        ].title
      "
      placeholder="Board Name"
    />
    <button @click="AddRow" class="btn">
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M22,14A2,2 0 0,1 20,16H4A2,2 0 0,1 2,14V10A2,2 0 0,1 4,8H20A2,2 0 0,1 22,10V14M4,14H8V10H4V14M10,14H14V10H10V14M16,14H20V10H16V14Z"
        />
      </svg>
      Add Row
    </button>

    <button @click="AddCol" class="btn">
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"
        />
      </svg>
      Add Column
    </button>
    <button
      @click="$root.$data.session.gridplanner.currentboard = null"
      class="btn"
    >
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
      Close
    </button>
  </div>

  <div id="tableDisplay">
    <draggable
      v-model="
        this.$root.$data.shadowDB.Gridplanner[
          this.$root.$data.session.gridplanner.currentboard
        ].content.columns
      "
      tag="div"
      class="titles"
      handle=".handle"
      :style="rowWidth"
      :item-key="(key) => key"
      @change="headerChange"
    >
      <template #item="{ element: header }">
        <div scope="col" class="header">
          <div class="handle">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <path d="M21,11H3V9H21V11M21,13H3V15H21V13Z" />
            </svg>
          </div>
          <input v-model="header.title" @change="changecall" class="titletext" />
        </div>
      </template>
    </draggable>
    <draggable
      v-model="
        this.$root.$data.shadowDB.Gridplanner[
          this.$root.$data.session.gridplanner.currentboard
        ].content.rows
      "
      tag="div"
      handle=".handle"
      :item-key="(key) => key"
    >
      <template #item="{ element: r }">
        <div scope="row" class="rowclass" :style="rowWidth">
          <div class="rowHeader">
            <div class="handle">
              <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <path d="M11,21H9V3H11V21M15,3H13V21H15V3Z" />
              </svg>
            </div>

            <input v-model="r.title" @change="changecall" class="titletext" />
          </div>
          <div v-for="(sq, k) in r.cols" :key="k" class="rowBlock">
            <BlockCards :cards="sq" />
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <div></div>
</template>

<script>
import draggable from "vue-draggable-next";
import BlockCards from "./BlockCards.vue";
export default {
  name: "GridPlanner",
  components: {
    draggable,
    BlockCards,
  },
  computed: {
    rowWidth() {
      return (
        "width: " +
        (200 +
          320 *
            this.$root.$data.shadowDB.Gridplanner[
              this.$root.$data.session.gridplanner.currentboard
            ].content.columns.length) +
        "px;"
      );
    },
  },
  data() {
    return {
      columns: [],
      rows: [],
    };
  },
  methods: {
    headerChange(e) {
      console.log("moved from", e.moved.oldIndex, "to", e.moved.newIndex);

      this.$root.$data.shadowDB.Gridplanner[
        this.$root.$data.session.gridplanner.currentboard
      ].content.rows.forEach((row) => {
        this.array_move(row.cols, e.moved.oldIndex, e.moved.newIndex);
      });
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      // return arr; // for testing
      this.changecall();
    },

    AddCol() {
      let o = {};
      o.title = "New Col";
      o.uuid = this.$root.uuid();
      this.$root.$data.shadowDB.Gridplanner[
        this.$root.$data.session.gridplanner.currentboard
      ].content.columns.push(o);

      this.$root.$data.shadowDB.Gridplanner[
        this.$root.$data.session.gridplanner.currentboard
      ].content.rows.forEach((element) => {
        element.cols.push([]);
      });

      this.changecall();
    },
    AddRow() {
      let o = {};
      (o.title = "New Row"), (o.cols = []);
      this.$root.$data.shadowDB.Gridplanner[
        this.$root.$data.session.gridplanner.currentboard
      ].content.columns.forEach(() => {
        o.cols.push([]);
      });
      this.$root.$data.shadowDB.Gridplanner[
        this.$root.$data.session.gridplanner.currentboard
      ].content.rows.push(o);

      this.changecall();
    },
    changecall() {
      this.$root.UpdateRecord(
        "Gridplanner",
        this.$root.$data.session.gridplanner.currentboard,
        this.$root.$data.shadowDB.Gridplanner[
          this.$root.$data.session.gridplanner.currentboard
        ]
      );
    },
  },
  mounted() {},
};
</script>

<style scoped>
.toolbar {
  display: flex;
  background-color: var(--c10);
  color: var(--c10-f);
  height: 50px;
}
.toolbar input {
  width: 100%;
  margin: 0 auto;
  background-color: none;
  background: none;
  color: var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}

.toolbar .btn {
  top: 5px;
  white-space: nowrap;
}
#tableDisplay {
  overflow: auto;
  position: fixed;
  top: 100px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: aliceblue;
}
.titles {
  padding-left: 200px;
  display: flex;
}
.rowclass {
  display: flex;
}
.header {
  width: 320px;
  padding: 10px;
  background-color: black;
  color: #fff;
  flex: 1;
  min-height: 100px;
  position: relative;
  padding-left: 40px;
    align-items: center;
}

.rowHeader {
  position: relative;
  width: 200px;
  padding: 10px;
  background-color: black;
  color: #fff;
  min-height: 100px;
  text-align: right;
  padding-left: 40px;
  align-items: center;
}
.rowBlock {
  width: 320px;
  padding: 10px;
  border: 1px dotted darkblue;
  background-color: blueviolet;
  color: #fff;
  flex: 1;
  align-items: center;
}
.handle {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom:0px
}
.handle svg {
   top: calc(50% - 15px);
  fill: var(--c0);
}

.titletext{
    width: calc(100% - 40px);
    position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0, -50%);

}
</style>