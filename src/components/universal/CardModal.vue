<template>
  <div id="overlay"></div>
  <div class="scrollHolder">
    <div class="cardEditorHolder"
      :style="'background-color: var(' + this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].color + '); color : var(' + this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].color + '-f); fill : var(' + this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].color + '-f)'">
      <button @click="$root.$data.session.EditCard = null" class="clearInterfaceIconButton closebtn">
        <svg viewBox="0 0 24 24">
          <path
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
        </svg>
      </button>

      <div class="colorbox">
        <button class="c1" @click="setCardColor(1)"></button>
        <button class="c2" @click="setCardColor(2)"></button>
        <button class="c3" @click="setCardColor(3)"></button>
        <button class="c4" @click="setCardColor(4)"></button>
        <button class="c5" @click="setCardColor(5)"></button>
        <button class="c6" @click="setCardColor(6)"></button>
        <button class="c7" @click="setCardColor(7)"></button>
      </div>


      <div class="inputHolder">
        <input class="cardTitle" placeholder="Title"
          v-model="this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].title" @change="updatecard" />
      </div>

      <div class="inputHolder">
        <DescriptionEditor v-model="
          this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard]
            .description
        " :cardid="
  this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].uuid
" />
      </div>
      <div class="inputHolder">
        <span class="tag" v-for="(tag, ti) in this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].labels"
          :key="ti">
          {{ tag }}
          <button @click="removetag(ti)">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" data-v-024bf5af="">
              <path
                d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                data-v-024bf5af=""></path>
            </svg>
          </button>
        </span>
        <input placeholder="#" @change="tagger" v-model="tag" class="tagInput"
          :style="'width: ' + taginputwidth + 'ch'" />
      </div>

      <div class="inputHolder">
        <AdvancedEditor v-model="
          this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard]
            .content
        " :cardid="
  this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].uuid
" />
      </div>


      <div class="inputHolder">
        <button @click="addImage()" class="interfaceBtn" :title="this.$root.setlang.settings.title">
          <svg viewBox="0 0 24 24">
            <path
              d="M7,15L11.5,9L15,13.5L17.5,10.5L21,15M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z" />
          </svg>

        </button>

        <div v-for="(image, key) in imageList" :key="key">
          <div class="imgHolder">
            <img :src="'data:image/png;base64,' + image.base64" style="height:100px;" />
          </div>
          <div>

            <button v-if="this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].showimage !== image.uuid"
              @click="chooseImage(image.uuid)">choose</button>
            <button v-else @click="chooseImage(image.uuid)">Chosen</button>

          </div>
        </div>



      </div>



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
  computed: {
    taginputwidth() {
      if (this.tag) {
        if (this.tag.length > 6) {
          return this.tag.length
        }
      }
      return 6
    }
  },
  data() {
    return {
      tag: null,
      imageList: []
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
    chooseImage(id) {
      if (this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].showimage != id) {
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].showimage = id
      } else {
        this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].showimage = null
      }

      console.log("image " + id)
      this.updatecard()
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
    setCardColor(c) {
      this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].color = "--card" + c
      this.updatecard();
    },

    setupImages() {
      this.imageList = []
      console.log(this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images)
      this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images.forEach(async (id) => {
        let image = await this.$root.getImage(id)
        if (image) {
          this.imageList.push(image)
        } else {
          // if the image is not in the db remove them from the array
          this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images =
            this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images.filter(item => item !== id)
        }
      });

    },
    addImage() {
      this.$root.imagemanager = true
      this.$root.imageUpdate = {
        table: "Cards",
        targetuuid: this.$root.$data.session.EditCard,
        target: this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images
      }
    }

  },
  mounted() {
    if (!this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images) {
      this.$root.$data.shadowDB.Cards[this.$root.$data.session.EditCard].images = []
    }
    this.setupImages()

  }
};
</script>


<style scoped >
#overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: var(--popup-block);
  opacity: 0.97;

}

.cardTitle {
  width: 100%;
  background-color: inherit;
  color: inherit;
  padding: 5px;
  border: 0px;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.5rem;
  outline: none;

}

.cardDescription {
  width: 100%;
  background-color: inherit;
  color: inherit;
  padding: 10px;
  border: 0px;
  font-family: inherit;
  border-radius: 10px;
  resize: none;
}

label {
  display: block;
  padding: 5px;
}

.scrollHolder {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  padding-top: 50px;
  padding-bottom: 50px;
  bottom: 0px;
  overflow-y: auto;

}

.inputHolder {
  padding: 5px;
  --opacity: 0.05;
  --hack: 10000%;
  --color: var(--card-f);
  background: linear-gradient(to bottom, var(--color) calc((var(--opacity) - 1) * var(--hack)), transparent calc(var(--opacity) * var(--hack)));
  margin-bottom: 10px;
  ;
}

.cardEditorHolder {
  position: relative;
  padding: 20px;
  background-color: var(--card);
  color: var(--card-f);
  margin: 0 auto;
  max-width: 700px;
  overflow: hidden;

}

.closebtn {
  position: absolute;
  right: 10px;
  top: 10px;
  fill: inherit;
}

.tagInput {
  padding: 7px;
  margin: 5px;
  border-radius: 0px;
  border: 0px;
  outline: none;
  display: inline-block;
  background-color: var(--accent);
  color: var(--accent-f);
  border-radius: 10px;

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


.colorbox button {
  width: 30px;
  height: 30px;
  border: 2px solid var(--paper-f);
  cursor: pointer;
  margin: 5px;
  border-radius: 15px;
}

.c1 {
  background-color: var(--card1);
}

.c2 {
  background-color: var(--card2);
}

.c3 {
  background-color: var(--card3);
}

.c4 {
  background-color: var(--card4);
}

.c5 {
  background-color: var(--card5);
}

.c6 {
  background-color: var(--card6);
}

.c7 {
  background-color: var(--card7);
}
</style>