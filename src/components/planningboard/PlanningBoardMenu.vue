<template>
  <div id="ToolHome" v-if="!$root.session.writer.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
           <tbody>
        <tr>
          <td>
            <h1>{{ this.$root.setlang.tools.planningboard }}</h1>
          </td>
          <td style="width: 50px">
            <button @click="addItem" class="interfaceBtn">
              <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z" />
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <hr />

      <table style="width: 100%">
        <tbody>
        <tr v-for="(item, index) in toollist" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>

            <div class="author">{{ item.description }}</div>
            <i> <br /> {{ $root.niceDate(item.lastupdated) }} </i>
          </td>
          <td style="width: 50px">
            <button @click="setLiveQuery(item)" class="interfaceBtn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" />
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <PlanningBoard v-if="$root.session.writer.selected" :key="$root.session.writer.selected.lastupdated" />
</template>

<script>

import PlanningBoard from "./PlanningBoard.vue";
export default {
  name: "PlanningBoardHome",
  components: {
    PlanningBoard,
  },
  data() {
    return {
      toollist: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Writer.toArray())),
    };
  },
  methods: {
    addItem() {
      let obj = {};
      obj.title = '';
      obj.description = '';
      obj.files = [];
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the   db
      this.$root.AddRecord("Writer", obj);
      this.$root.session.writer.selected = obj
    },
    setLiveQuery(item) {
      this.$root.session.writer.selected = this.$root.useObservable(this.$root.liveQuery(() => this.$root.db.Writer.get(item.uuid)))
    }
  },
  created() {
    if (!this.$root.session.writer) {
      this.$root.session.writer = {};
    }
  },
};
</script>

<style scoped>
#ToolHome {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: auto;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
}

td {
  padding: 10px;
}
</style>
