<template>
  <div id="ToolHome" v-if="!$root.$data.session.planningboard.currentboard">


    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td><h1>Planning Boards</h1></td>
          <td style="width: 100px">
            <button @click="showaddform = !showaddform" class="formButton">
           <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" data-v-0bc5e1e5=""><path d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z" data-v-0bc5e1e5=""></path></svg>
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
          v-model="author"
          placeholder="Author"
          class="formInput"
        />
        <div style="text-align: right">
          <button
            @click="addItem"
            class="formButton"
            style="width: 100px; display: inline"
          >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
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
              @click="$root.$data.session.planningboard.currentboard = item.uuid"
              class="formButton"
            >
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <PlanningBoard  v-if="$root.$data.session.planningboard.currentboard" />
</template>

<script>
import PlanningBoard from "./PlanningBoard"
export default {
  name: "PlanningBoardHome",
  components: {
    PlanningBoard
  },
    computed :{
    mylist(){
      let list = {}
      Object.keys(this.$root.$data.shadowDB.Planningboard).forEach(element => {
        if(this.$root.$data.shadowDB.Planningboard[element].projectID === this.$root.$data.session.selectedProject){
          list[this.$root.$data.shadowDB.Planningboard[element].uuid] = this.$root.$data.shadowDB.Planningboard[element]
        }
      });
      return list
    }
  },
  data() {
    return {
           title: null,
      author: null,
      showaddform: false
    };
  },
  methods: {
    addItem() {
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
      this.$root.$data.shadowDB.Planningboard[obj.uuid] = obj;
      this.$root.AddRecord("Planningboard", obj);
      this.showaddform = false;
      this.title = null;
      this.author = null;
    },
  },
  mounted() {},
  beforeMount() {
    // check if there is a SETTINGS node for this tool, if not create node
    if (!this.$root.$data.session.planningboard) {
      this.$root.$data.session.planningboard = {};
    }
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 1.3rem;
}

</style>