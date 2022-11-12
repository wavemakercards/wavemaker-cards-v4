<template>
  <div v-if="cardInfo">
    <div class="card"
      :style="'background-color: var(' + cardInfo.color + '); color : var(' + cardInfo.color + '-f); fill : var(' + cardInfo.color + '-f)'">



      <div v-if="this.showimage">
        <img :src="'data:image/png;base64,' + this.showimage.base64" />
      </div>



      <div class="cardTitle">
        <span v-if="cardInfo.title">
          {{ cardInfo.title }}
        </span>
        <span v-else>
          {{ this.$root.setlang.cards.cardtitle }}
        </span>
      </div>

      <div class="cardDescription" v-if="cardInfo.showdesc">
        <span v-html="cardInfo.description"></span>
      </div>


      <button class="clearInterfaceIconButton editButton" @click="$root.$data.session.EditCard = cardid">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
        </svg>
      </button>
    </div>
  </div>

  <div class="card" v-if="!cardInfo">
    <div v-if="chooser">
      <button @click="this.$root.makeNewCard(this.cardid)" class="interfaceBtn" style="width:100%; text-align: left;">
        <svg viewBox="0 0 24 24">
          <path
            d="M13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H20C21.11 4 22 4.89 22 6V13.81C21.12 13.3 20.09 13 19 13C15.69 13 13 15.69 13 19C13 19.34 13.04 19.67 13.09 20M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
        </svg>
        {{ this.$root.setlang.cards.createnewbtn }}
      </button>


      <div style="text-align: center; padding:5px;"> or </div>


      <button @click="showLinkBox = !showLinkBox" class="interfaceBtn">
        <svg viewBox="0 0 24 24">
          <path
            d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M11,16H10C8.39,16 6,14.94 6,12C6,9.07 8.39,8 10,8H11V10H10C9.54,10 8,10.17 8,12C8,13.9 9.67,14 10,14H11V16M15,11V13H9V11H15M14,16H13V14H14C14.46,14 16,13.83 16,12C16,10.1 14.33,10 14,10H13V8H14C15.61,8 18,9.07 18,12C18,14.94 15.61,16 14,16Z" />
        </svg>
        {{ this.$root.setlang.cards.linkexisting }}
      </button>

      <div v-if="showLinkBox" class="LinkBox">
        <button class="interfaceBtn" v-for="(opt, i) in linkcards" :key="i" :value="opt.uuid"
          @click="cardChange = opt.uuid; sendCardChange()">
          <svg viewBox="0 0 24 24">
            <path
              d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M11,16H10C8.39,16 6,14.94 6,12C6,9.07 8.39,8 10,8H11V10H10C9.54,10 8,10.17 8,12C8,13.9 9.67,14 10,14H11V16M14,16H13V14H14C14.46,14 16,13.83 16,12C16,10.1 14.33,10 14,10H13V8H14C15.61,8 18,9.07 18,12C18,14.94 15.61,16 14,16M15,13H9V11H15V13Z" />
          </svg>

          {{ opt.title }}
        </button>
      </div>


    </div>
    <div v-else>loading</div>
  </div>



</template>

<script>
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db } from "@/db.js";
export default {
  name: "CardViewer",
  emits: ["linkcard"],
  props: {
    cardid: {
      type: String,
      required: true,
    },
    allowlink: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    currentProjectCards() {
      let data = [];
      Object.keys(this.linkcards).forEach(element => {
        if (this.linkcards[element].title != "") {
          data.push(this.linkcards[element])
        }
      });
      return data
    }
  },
  data() {
    return {
      cardInfo: useObservable(liveQuery(async () => await db.Cards.get(this.cardid))),
      linkcards: useObservable(liveQuery(async () => await db.Cards.toArray())),
      advancedEdit: false,
      tag: null,
      chooser: false,
      cardChange: null,
      showimage: null,
      showLinkBox: false
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
    sendCardChange() {
      console.log(this.cardChange)
      this.$emit("linkcard", this.cardChange, this.cardid)
    }
  },
  async mounted() {
    if (!this.allowlink) {
      if (!this.cardInfo && this.cardid) {
        this.$root.makeNewCard(this.cardid)
      }
    } else {
      if (!this.cardInfo) {
        if (Object.keys(this.$root.$data.shadowDB.Cards).length) {
          this.chooser = true;
        } else {
          this.$root.makeNewCard(this.cardid)
        }
      }
    }
    if (this.cardInfo) {
      if (this.cardInfo.showimage) {
        this.showimage = await this.$root.getImage(this.cardInfo.showimage)
      }
    }
  }
};
</script>


<style scoped >
.LinkBox {
  position: relative;
  overflow-y: scroll;
  width: 100%;
  max-height: 200px;
}

.LinkBox .interfaceBtn {
  background-color: var(--paper);
  color: var(--paper-f);
  fill: var(--paper-f);
}

.interfaceBtn {
  margin-top: 0px;
  width: 100%;
  margin-top: 3px;
  margin-bottom: 3px;
  text-align: left;
}

.card {
  position: relative;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  min-height: 100px;
  padding: 10px;
  background-color: var(--card);
  color: var(--card-f);
  margin: 5px;
  border-radius: 0px;
  font-family: inherit;
  white-space: normal;
}

.card img {
  max-width: 100%;
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
  font-weight: bold;
}

.cardTitle:active,
.cardTitle:focus,
.cardTitle:hover {}

.cardDescription {
  position: relative;
  width: 100%;
  border: 0px;
  min-height: 150px;
  margin-bottom: 5px;
  background-color: inherit;
  color: inherit;
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


.card:active .editButton,
.card:focus .editButton,
.card:hover .editButton {
  display: block;
}

.editButton {
  display: none;
  background-color: var(--button);
  color: var(--button-f);
  fill: var(--button-f);
  position: absolute;
  bottom: 5px;
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
  margin: 5% auto;
  /* 15% from the top and centered */
  padding: 20px;
  background-color: inherit;
  color: inherit;
  width: 50%;
  /* Could be more or less, depending on screen size */
  z-index: 999;
  overflow-y: auto;
}

.tagbox {
  margin-top: 20px;
  margin-bottom: 20px;
}

.tag {
  position: relative;
  padding: 5px;
  background-color: var(--accent);
  color: var(--primary-f);
  margin: 2px;
  border-radius: 5px;
  font-size: 0.9rem;
  display: inline;
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