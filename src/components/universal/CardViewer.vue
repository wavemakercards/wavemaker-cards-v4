<template>
  <div class="card">
    <div v-if="this.$root.$data.shadowDB.Cards[this.cardid]">
      <input
        class="cardTitle"
        placeholder="Title"
        v-model="this.$root.$data.shadowDB.Cards[this.cardid].title"
        @change="updatecard"
      />
      <div style="height:130px; overflow-y:scroll">
        <!--
        <textarea
          class="cardDescription"
          placeholder="Description"
          v-model="this.$root.$data.shadowDB.Cards[this.cardid].description"
          rows="5"
          @change="updatecard"
        ></textarea>
-->
        <DescriptionEditor
      v-model="
        this.$root.$data.shadowDB.Cards[this.cardid]
          .description
      "
      :cardid="
        this.$root.$data.shadowDB.Cards[this.cardid].uuid
      "
      class="cardDescription"
    />


      </div>
      <button class="clearInterfaceIconButton editButton" @click="$root.$data.session.EditCard = cardid">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
          />
        </svg>
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


</template>

<script>
/* eslint-disable */
import DescriptionEditor from "@/components/universal/DescriptionEditor.vue";
export default {
  name: "CardViewer",
  components:{
    DescriptionEditor
  },
  emits: ["linkcard"],
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
      default: [],
      required: false,
    }
  },
  computed:{
    currentProjectCards(){
      let data =[];
      Object.keys(this.$root.$data.shadowDB.Cards).forEach(element => {
        if(this.$root.$data.shadowDB.Cards[element].projectID === this.$root.$data.session.selectedProject && this.$root.$data.shadowDB.Cards[element].title !="" ){
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
      obj.description="";
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
      this.$emit("linkcard")
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
  background-color: var(--card);
  color: var(--card-f);
  margin: 5px;
  min-height: 150px;
  border-radius: 0px;
  font-family: inherit;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.cardTitle {
  width: 100%;
  border: 0px;
  border-bottom: 1px solid var(--card-f);
  background-color: inherit;
  color: inherit;
  margin-bottom: 5px;
  outline: none;
  padding: 10px;
    font-family: inherit;
    font-weight:bold;
}

.cardTitle:active,
.cardTitle:focus,
.cardTitle:hover {

}

.cardDescription {
  width: 100%;
  border: 0px;

  margin-bottom: 5px;
    background-color: var(--card);
  color: var(--card-f);
  outline: none;
  padding: 0px;
  resize: vertical;
    font-family: inherit;

}

.cardDescription:active,
.cardDescription:focus,
.cardDescription:hover {
  border-bottom: 2px solid var(--primary);
}

.card:focus-within .editButton {
  display: block;
}
.editButton {
  display: none;
  background-color: var(--primary);
  color: var(--primary-f);
}
.editButton svg{
    fill: var(--primary-f);
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
  overflow-y: auto;
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