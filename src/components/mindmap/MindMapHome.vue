<template>
  <div id="ToolHome" v-if="!$root.session.mindmap.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td><h1>Mindmap Tool</h1></td>
          <td style="width: 100px">
            <button @click="showaddform = !showaddform" class="formButton">
       <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23" />
</svg>
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
        <tr v-for="(item, index) in $root.shadowDB.Mindmap" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>
          
             <div class="author">by {{ item.description }}</div>
                 <i> <br/>  {{$root.niceDate(item.lastupdated)}} </i>
          </td>
          <td style="width: 100px">
            <button
              @click="$root.session.mindmap.selected = item.uuid"
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
  <div v-if="$root.session.mindmap.selected">
     <WorkSpace />
 <ToolBox />

  </div>
</template>

<script>
import ToolBox from './ToolBox.vue'
import WorkSpace from "./WorkSpace.vue"
export default {
  name: "MindMapHome",
  components: {
WorkSpace,
ToolBox
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
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the shadow db
      this.$root.shadowDB.Mindmap[obj.uuid] = obj;
      this.$root.AddRecord("Mindmap", obj);
      this.title = "";
      this.description = "";
      this.showaddform = false;
    },
  },
  created() {
    if (!this.$root.session.mindmap) {
      this.$root.session.mindmap = {};
        this.$root.session.mindmap.linkstyle="solid";
        this.$root.session.mindmap.currentnode = null      }
  },
};
</script>

<style scoped>



</style>
