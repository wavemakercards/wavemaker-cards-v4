<template>
  <div id="ToolHome" v-if="!$root.$data.session.timeline.currentboard">



    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td><h1>Timelines</h1></td>
          <td style="width: 100px">
            <button @click="showaddform = !showaddform" class="formButton">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
</svg> </button>
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
          v-model="author"
          placeholder="Author"
          class="formInput"
        />
        <div style="text-align: right">
          <button
            @click="AddBoard"
            class="formButton"
            style="width: 100px; display: inline"
          >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
</svg>
          </button>
        </div>
      </div>
      <hr />

      <table style="width: 100%">
        <tr v-for="(item, index) in mylist" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>
           
            <div class="author">by {{ item.description }}</div>

         <i> <br/>  {{$root.niceDate(item.lastupdated)}} </i>
          </td>
          <td style="width: 100px">
            <button
              @click="$root.$data.session.timeline.currentboard = item.uuid"
              class="formButton"
            >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M11 21.9C5.9 21.4 2 17.1 2 12C2 6.5 6.5 2 12 2C17.3 2 21.6 6.1 22 11.3C21.7 11.2 21.4 11.1 21 11.1C20.2 11.1 19.6 11.5 19.2 11.9L16.5 14.6L12.5 12.2V7H11V13L15.4 15.7L11 20.1V21.9Z" />
</svg>
            </button>
          </td>
        </tr>
      </table>
    </div>



  </div>


  <TimeLine  v-if="$root.$data.session.timeline.currentboard" />
</template>

<script>
import TimeLine from "./TimeLine"
export default {
  name: "TimeLineHome",
  components: {
    TimeLine
  },
  data() {
    return {
      showaddform: false,
      title: null,
      author: null,
    };
  },
        computed :{
    mylist(){
      let list = {}
      Object.keys(this.$root.$data.shadowDB.Timeline).forEach(element => {
        if(this.$root.$data.shadowDB.Timeline[element].projectID === this.$root.$data.session.selectedProject){
          list[this.$root.$data.shadowDB.Timeline[element].uuid] = this.$root.$data.shadowDB.Timeline[element]
        }
      });
      return list
    }
  },
  methods: {
    AddBoard() {
            if (!this.title || !this.author) {
        alert("Provide a title and author name");
        return false;
      }
      let obj = {};
      obj.title = this.title;
      obj.description = this.author;
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.content = []
      obj.uuid = this.$root.uuid();
      this.$root.$data.shadowDB.Timeline[obj.uuid] = obj;
      this.$root.AddRecord("Timeline", obj);
          this.showaddform = false;
      this.title = null;
      this.author = null;
    },
  },
  mounted() {},
  beforeMount() {
    // check if there is a SETTINGS node for this tool, if not create node
    if (!this.$root.$data.session.timeline) {
      this.$root.$data.session.timeline = {};
    }
  },
};
</script>

<style scoped>


</style>