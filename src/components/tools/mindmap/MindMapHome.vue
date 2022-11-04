<template>
  <div id="ToolHome" v-if="!$root.$data.session.mindmap.currentboard">
    <h1>MindMap</h1>
    <p>Create Your planning Boards</p>
    <button @click="showAddForm = true" v-if="!showAddForm">Add</button>
    <div v-if="showAddForm" id="AddForm">
      <button @click="showAddForm = false">close</button>
      <p>Board Name</p>
      <input v-model="newBoardTitle" placeholder="Board Name" />
      <p>Description</p>
      <textarea
        v-model="newBoardDesc"
        placeholder="What is this about?"
      ></textarea>
      <button @click="AddBoard" class="btn">Add</button>
    </div>
    <div class="boards" v-if="!showAddForm">
      <button
        class="board"
        v-for="(b, i) in mylist"
        :key="i"
        @click="$root.$data.session.mindmap.currentboard = b.uuid"
      >
        <h1>{{ b.title }}</h1>
        <p>{{ b.description }}</p>
      </button>
    </div>
  </div>
  <MindMap v-if="$root.$data.session.mindmap.currentboard" />
</template>

<script>
import MindMap from "./MindMap";
export default {
  name: "MindMapHome",
  components: {
    MindMap,
  },
  data() {
    return {
      showAddForm: false,
      newBoardTitle: null,
      newBoardDesc: null,
    };
  },
  computed: {
    mylist() {
      let list = {};
      Object.keys(this.$root.$data.shadowDB.Gridplanner).forEach((element) => {
        if (
          this.$root.$data.shadowDB.Gridplanner[element].projectID ===
          this.$root.$data.session.selectedProject
        ) {
          list[this.$root.$data.shadowDB.Gridplanner[element].uuid] =
            this.$root.$data.shadowDB.Gridplanner[element];
        }
      });
      return list;
    },
  },
  methods: {
    AddBoard() {
      let obj = {};
      obj.title = this.newBoardTitle;
      obj.description = this.newBoardDesc;
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.content = [];
      obj.uuid = this.$root.uuid();
      this.$root.$data.shadowDB.Mindmap[obj.uuid] = obj;
      this.$root.AddRecord("Mindmap", obj);
      this.showAddForm = false;
      this.newBoardTitle = null;
      this.newBoardDesc = null;
    },
  },
  mounted() {},
  beforeMount() {
    // check if there is a SETTINGS node for this tool, if not create node
    if (!this.$root.$data.session.mindmap) {
      this.$root.$data.session.mindmap = {};
    }
  },
};
</script>

<style scoped>
.boards {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-flow: wrap;
}

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