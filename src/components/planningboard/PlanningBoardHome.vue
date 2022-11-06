<template>
  <div id="ToolHome" v-if="!$root.session.writer.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td><h1>{{this.$root.setlang.tools.planningboard}}</h1></td>
          <td style="width: 100px">
            <button @click="showaddform = !showaddform" class="interfaceBtn">
            <svg  version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z" /></svg>

            </button>
          </td>
        </tr>
      </table>

      <div v-if="showaddform">
        <hr />
        <input
          type="text"
          v-model="title"
          :placeholder="this.$root.setlang.tools.name"
          class="formInput"
        />
        <input
          type="text"
          v-model="description"
          :placeholder="this.$root.setlang.tools.description"
          class="formInput"
        />
        <div style="text-align: right">
          <button
            @click="addItem"
            class="interfaceBtn"
 
          >
       <svg viewBox="0 0 24 24">
    <path  d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
</svg>
          </button>
        </div>
      </div>
      <hr />

      <table style="width: 100%"  v-if="!showaddform">
        <tr v-for="(item, index) in $root.$data.shadowDB.Writer" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>
          
             <div class="author"> {{ item.description }}</div>
                 <i> <br/>  {{$root.niceDate(item.lastupdated)}} </i>
          </td>
          <td style="width: 100px">
            <button
              @click="$root.$data.session.writer.selected = item.uuid"
              class="interfaceBtn"
            >
           <svg viewBox="0 0 24 24">
    <path  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <PlanningBoard v-if="$root.$data.session.writer.selected" /> 
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
      title: null,
      description: null,
      showaddform: false,
    };
  },
  methods: {
    addItem() {
      if (!this.title ) {
        alert(this.$root.setlang.tools.warn);
        return false;
      }
      let obj = {};
      obj.title = this.title;
      obj.description = this.description;
      obj.files = [];
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the shadow db
      this.$root.$data.shadowDB.Writer[obj.uuid] = obj;
      this.$root.AddRecord("Writer", obj);

      this.title = "";
      this.description = "";
      this.showaddform = false;
    },
  },
  created() {
    if (!this.$root.$data.session.writer) {
      this.$root.$data.session.writer = {};
    }
  },
};
</script>

<style scoped>



</style>
