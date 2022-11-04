<template>
  <div id="ToolHome" v-if="!$root.session.timeline.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td><h1>TimeLine Tool</h1></td>
          <td style="width: 100px">
            <button @click="showaddform = !showaddform" class="formButton">
 <svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" /></svg>

            </button>
          </td>
        </tr>
      </table>

      <div v-if="showaddform">
        <hr />
        <input
          type="text"
          v-model="title"
          placeholder="Title"
          class="formInput"
        />
        <input
          type="text"
          v-model="description"
          placeholder="Author Name"
          class="formInput"
        />
        <div style="text-align: right">
          <button
            @click="addItem"
            class="formButton"
            style="width: 100px; display: inline"
          >
       <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
</svg>
          </button>
        </div>
      </div>
      <hr />

      <table style="width: 100%"  v-if="!showaddform">
        <tr v-for="(item, index) in $root.shadowDB.Timeline" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>
          
             <div class="author">by {{ item.description }}</div>
                 <i> <br/>  {{$root.niceDate(item.lastupdated)}} </i>
          </td>
          <td style="width: 100px">
            <button
              @click="$root.session.timeline.selected = item.uuid"
              class="formButton"
            >
           <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
 
 <TimeLineTool v-if="$root.session.timeline.selected"/>
</template>

<script>
import TimeLineTool from "./TimeLineTool.vue"
export default {
  name: "PlanningBoardHome",
  components: {
TimeLineTool
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
      if (!this.title || !this.description) {
        alert("Provide a title and author name");
        return false;
      }
      let obj = {};
      obj.title = this.title;
      obj.description = this.description;
      obj.content = [];
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the shadow db
      this.$root.shadowDB.Timeline[obj.uuid] = obj;
      this.$root.AddRecord("Timeline", obj);

      this.title = "";
      this.description = "";
      this.showaddform = false;
    },
    
  },
  created() {
    if (!this.$root.session.timeline) {
      this.$root.session.timeline = {};
    }
  },
};
</script>

<style scoped>



</style>
