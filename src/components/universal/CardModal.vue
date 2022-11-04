<template>
  <div id="overlay"></div>
  <div class="scrollHolder">
  <div class="cardEditorHolder">
    <button @click="$root.$data.session.EditCard = null" class="clearInterfaceIconButton" style="float:right">
     <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
</svg>
    </button>
    <div>

      <input
        class="cardTitle"
        placeholder="Title"
        v-model="this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].title"
        @change="updatecard"
      />
    </div>
    <div>
      <!--
      <textarea
        class="cardDescription"
        placeholder="Description"
        v-model="this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].description"
        rows="5"
        @change="updatecard"
      ></textarea>
-->
        <DescriptionEditor
      v-model="
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard]
          .description
      "
      :cardid="
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].uuid
      "
    />
    </div>
    <label>tags</label>
    <input placeholder="tag" @change="tagger" v-model="tag" class="forminput" />
    <span
      class="tag"
      v-for="(tag, ti) in this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].labels"
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
      </button>
    </span>

    

    <label>Your Notes</label>
    <AdvancedEditor
      v-model="
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard]
          .content
      "
      :cardid="
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].uuid
      "
    />
  </div>

 </div>

</template>

<script>
/* eslint-disable */
import AdvancedEditor from "@/components/universal/AdvancedEditor.vue";
import DescriptionEditor from "@/components/universal/DescriptionEditor.vue";

export default {
  name: "CardViewer",
  emits: ["cardChange"],
  components: {
    AdvancedEditor,
    DescriptionEditor
  },
  data() {
    return {
      tag: null,
    };
  },
  methods: {
    updatecard() {
      this.$root.UpdateRecord(
        "Cards",
        this.$root.$data.session.EditCard,
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard]
      );
    },
    tagger() {
      if (this.tag) {
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].labels.push(this.tag);
        this.tag = null;
        this.updatecard();
      }
    },
    removetag(i) {
      this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].labels.splice(i, 1);
      this.updatecard();
    },
  },
  mounted() {},
};
</script>


<style scoped >
#overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: var(--c4);
  opacity: 0.97;
  z-index: 998;
}
.cardTitle{
  width:100%;
  background-color: inherit;
  color: inherit;
  padding:5px;
  border:0px;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom:10px;
}

.cardDescription{
  width:100%;
  background-color: inherit;
  color: inherit;
  padding:10px;
  border:0px;
  font-family: inherit;
  background-color: var(--c8);
  border-radius: 10px;
  resize: none;
}
label{
  display:block;
  padding:5px;
}
.scrollHolder{
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
padding-top:50px;
padding-bottom:50px;
  bottom:0px;
  overflow-y :auto;

    z-index: 999;
}
.cardEditorHolder {
    padding: 20px;
  background-color: var(--c9);
  color: var(--c19-f);
  margin:0 auto;
max-width: 700px;
  overflow:hidden;
  border-radius: 10px;;
}
.forminput{
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border:0px;
    display: inline-block;
    text-align: center;
}
.tag {
  position: relative;
  display: inline-block;
  padding: 5px;
  background-color: var(--accent);
  color: var(--accent-f);
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
  fill: var(--accent-f);
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