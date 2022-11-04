<template>
  <div class="card">
    <div v-if="this.$root.$data.shadowDB.Cards[this.cardid]">
      <input
        class="cardTitle"
        placeholder="Title"
        v-model="this.$root.$data.shadowDB.Cards[this.cardid].title"
        @change="updatecard"
      />
      <div>
        <textarea
          class="cardDescription"
          placeholder="Description"
          v-model="this.$root.$data.shadowDB.Cards[this.cardid].description"
          rows="5"
          @change="updatecard"
        ></textarea>
      </div>
      <button class="btn editButton" @click="advancedEdit = !advancedEdit">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
          />
        </svg>
        Edit
      </button>
    </div>
    <div v-if="!this.$root.$data.shadowDB.Cards[this.cardid]">
      <div v-if="chooser">
        <button @click="createCard">Create New</button>
<hr/>
        <select style="width:100%" v-model="cardChange">
          <option v-for="(opt, i) in currentProjectCards" :key="i" :value="opt.uuid">{{i +' - '+opt.title}}</option>
        </select>
        <br/>
        <button @click="sendCardChange">Choose</button>

      </div>
      <div v-else>loading</div>
    </div>
  </div>

  <div id="overlay" v-if="advancedEdit"></div>
  <div class="editorHolder" v-if="advancedEdit">
    <button @click="advancedEdit = !advancedEdit">
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
        />
      </svg>
    </button>
    <div>
      <label>Title</label>
      <input
        class="cardTitle"
        placeholder="Title"
        v-model="this.$root.$data.shadowDB.Cards[this.cardid].title"
        @change="updatecard"
      />
    </div>
    <label>Description</label>
    <div>
      <textarea
        class="cardDescription"
        placeholder="Description"
        v-model="this.$root.$data.shadowDB.Cards[this.cardid].description"
        rows="5"
        @change="updatecard"
      ></textarea>
    </div>
    <label>tags</label>
    <span
      class="tag"
      v-for="(tag, ti) in this.$root.$data.shadowDB.Cards[this.cardid].labels"
      :key="ti"
    >
      {{ tag }}
      <button @click="removetag(ti)">
        <svg
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          data-v-024bf5af=""
        >
          <path
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            data-v-024bf5af=""
          ></path>
        </svg>
      </button> </span>
      
    <input placeholder="tag" @change="tagger" v-model="tag" />

    <label>Your Notes</label>
    <AdvancedEditor
      v-if="advancedEdit"
      v-model="this.$root.$data.shadowDB.Cards[this.cardid].content"
      :cardid="this.$root.$data.shadowDB.Cards[this.cardid].uuid"
    />
  </div>
</template>

<script>
/* eslint-disable */
import AdvancedEditor from "./AdvancedEditor.vue";

export default {
  name: "CardViewer",
    emits: ["cardChange"],
  components: {
    AdvancedEditor,
  },
  props: {
    cardid: {
      type: String,
      required: true,
    },
    allowlink: {
      type: Boolean,
      default: false,
    },
    updateelement :{
      type : Object,
      default: false,
    }
  },
  computed:{
    currentProjectCards(){
      let data =[];
      Object.keys(this.$root.$data.shadowDB.Cards).forEach(element => {
        if(this.$root.$data.shadowDB.Cards[element].projectID === this.$root.$data.session.selectedProject){
          data.push(this.$root.$data.shadowDB.Cards[element])
        }
      });
      return data
    }
  },
  data() {
    return {
      advancedEdit: false,
      tag: null,
      chooser: false,
      cardChange : null
    };
  },
  methods: {
    updatecard() {
      this.$root.UpdateRecord(
        "Cards",
        this.cardid,
        this.$root.$data.shadowDB.Cards[this.cardid]
      );
    },
    tagger() {
      if (this.tag) {
        this.$root.$data.shadowDB.Cards[this.cardid].labels.push(this.tag);
        this.tag = null;
        this.updatecard();
      }
    },
    removetag(i) {
      this.$root.$data.shadowDB.Cards[this.cardid].labels.splice(i, 1);
      this.updatecard();
    },
    createCard() {
      console.log("creating Card");
      let obj = {};
      obj.uuid = this.cardid; // use the same uuid to link them
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.title = "";
      obj.content = "";
      obj.labels = [];
      obj.style = "";
      obj.options = {};
      this.$root.$data.shadowDB.Cards[obj.uuid] = obj;
      this.$root.AddRecord("Cards", obj);
    },
    sendCardChange(){
      console.log("Link to card selected" , this.updateelement)
      this.updateelement.uuid = this.cardChange
     // this.$emit("cardChange")
    }
  },
  mounted() {
    if (!this.allowlink) {
      if (!this.$root.$data.shadowDB.Cards[this.cardid] && this.cardid) {
        this.createCard();
      }
    } else {
      if (!this.$root.$data.shadowDB.Cards[this.cardid]) {
        this.chooser = true;
      }
    }
  },
};
</script>


<style scoped >
.card {
  position: relative;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 10px;
  background-color: var(--c0);
  color: var(--c0-f);
  margin: 15px;
  min-height: 150px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card .ProseMirror {
  background-color: #efefef;
  height: 150px;
  overflow-y: scroll;
}
.cardTitle {
  width: 100%;
  border: 0px;
  border-bottom: 1px solid var(--c10);
  margin-bottom: 5px;
  outline: none;
  padding: 10px;
}

.cardTitle:active,
.cardTitle:focus,
.cardTitle:hover {
  border-bottom: 2px solid var(--accent);
}

.cardDescription {
  width: 100%;
  border: 0px;
  border-bottom: 1px solid var(--c10);
  margin-bottom: 5px;
  outline: none;
  padding: 10px;
  resize: vertical;
}

.cardDescription:active,
.cardDescription:focus,
.cardDescription:hover {
  border-bottom: 2px solid var(--accent);
}

.card:focus-within .editButton {
  display: block;
}
.editButton {
  display: none;
  color: var(--primary-f);
  background-color: var(--primary);
  height: 20px;
  padding: 0px;
  padding-left: 25px;
  padding-right: 10px;
  font-size: 10px;
}

.editButton:hover,
.editButton:focus,
.editButton:active {
  color: var(--accent-f);
  background-color: var(--accent);
}

.editButton svg {
  fill: var(--accent-f);
  height: 15px;
  top: 2px;
  left: 2px;
}

#overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: var(--c10);
  opacity: 0.97;
  z-index: 998;
}
.editorHolder {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 20px;
  background-color: var(--c1);
  color: var(--c1-f);
  width: 50%; /* Could be more or less, depending on screen size */
  z-index: 999;
  overflow-y: scroll;
}
.tag {
  position: relative;
  padding: 5px;
  background-color: var(--primary);
  color: var(--primary-f);
  margin: 5px;
  border-radius: 10px;
  padding-right: 30px;
}
.tag button {
  position: absolute;
  right: 5px;
  top: 5px;
  background: none;
  border: none;
  outline: none;
  text-align: right;
  width: 20px;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
}
.tag button svg {
  height: 15px;
  fill: var(--primary-f);
}
.tag button svg:focus,
.tag button svg:active,
.tag button svg:hover {
  fill: var(--primary-f);
}
.tag button label {
  display: block;
}
</style>