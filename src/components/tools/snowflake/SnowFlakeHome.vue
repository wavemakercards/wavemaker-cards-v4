<template>
  <div id="ToolHome" v-if="!$root.$data.session.snowflake.currentboard">
    <h1>SnowFlakeHome</h1>
    <p>Create Your Snowflake Tools</p>
    <button @click="showAddForm = true" v-if="!showAddForm">Add</button>
    <div v-if="showAddForm" id="AddForm">
      <button @click="showAddForm = false">close</button>
      <p>Board Name</p>
      <input v-model="newSnowTitle" placeholder="Board Name" />
      <p>Description</p>
      <textarea
        v-model="newSnowDesc"
        placeholder="What is this about?"
      ></textarea>
      <button @click="AddSnow" class="btn">Add</button>
    </div>
    <div class="boards" v-if="!showAddForm">
      <button
        class="board"
        v-for="(b, i) in mylist"
        :key="i"
        @click="$root.$data.session.snowflake.currentboard = b.uuid"
      >
        <h1>{{ b.title }}</h1>
        <p>{{ b.description }}</p>
      </button>
    </div>
  </div>
  <SnowFlake v-if="$root.$data.session.snowflake.currentboard" />
</template>

<script>
import SnowFlake from "./SnowFlake"
export default {
  name: "SnowFlakeHome",
  components: {
    SnowFlake
  },
  data() {
    return {
      showAddForm: false,
      newSnowTitle: null,
      newSnowDesc: null,
    };
  },
       computed :{
    mylist(){
      let list = {}
      Object.keys(this.$root.$data.shadowDB.Snowflake).forEach(element => {
        if(this.$root.$data.shadowDB.Snowflake[element].projectID === this.$root.$data.session.selectedProject){
          list[this.$root.$data.shadowDB.Snowflake[element].uuid] = this.$root.$data.shadowDB.Snowflake[element]
        }
      });
      return list
    }
  },
  methods: {
    AddSnow() {
      let obj = {};
      obj.title = this.newSnowTitle;
      obj.description = this.newSnowDesc;
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.content = { uuid : this.$root.uuid(),
        sub : false,
        cards :[]}
      obj.uuid = this.$root.uuid();
      this.$root.$data.shadowDB.Snowflake[obj.uuid] = obj;
      this.$root.AddRecord("Snowflake", obj);
      this.showAddForm = false;
      this.newSnowTitle = null;
      this.newSnowDesc = null;
    },
  },
  mounted() {},
  beforeMount() {
    // check if there is a SETTINGS node for this tool, if not create node
    if (!this.$root.$data.session.snowflake) {
      this.$root.$data.session.snowflake = {
        uuid : this.$root.uuid(),
        sub : false,
        cards :[]
      };
    }
  },
};
</script>

<style scoped>

.board {
  background-color: var(--c10);
  color: var(--c10-f);
  width: 300px;
  margin: 10px;
  padding: 20px;
  cursor: pointer;
}

#AddForm {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  background-color: var(--c10);
}

input {
  width: 100%;
  padding: 10px;
  border: 0px;
  background-color: var(--c10);
  color: var(--c10-f);
  border-bottom: 1px solid var(--c10-f);
  margin: 5px;
  outline: none;
}
textarea {
  width: 100%;
  padding: 10px;
  background-color: var(--c10);
  color: var(--c10-f);
  border: 0px;
  margin: 5px;
  border-bottom: 1px solid var(--c10-f);
  outline: none;
}
</style>