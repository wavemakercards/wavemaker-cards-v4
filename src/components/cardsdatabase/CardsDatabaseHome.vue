<template>
  <div class="toolbar">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
    <input v-model="SearchTerm" :placeholder="this.$root.setlang.db.search" />


    <button @click="makeNewCard()" class="interfaceBtn">
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
      </svg>
      New Card
    </button>


  </div>
  <div id="scrollWindow">


    <div style="padding:15px;padding-right:135px;">



      <masonry-wall :items="CardsArray" :ssr-columns="1" :column-width="300" :gap="16">
        <template #default="{ item }">
          <div class="cardFrame">


            <CardViewer :cardid="item.uuid" :updateelement="{}" :key="item.lastupdated" />
            <button class="deleteIconButton" @click="deleteCard(item.uuid)">
              <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
                <path
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
              </svg>
            </button>
          </div>
        </template>
      </masonry-wall>



      <!--
     
    <masonry-wall :items="CardsArray" :ssr-columns="1" :column-width="300" :gap="16">
        <template #default="{ card }">
          <CardViewer :cardid="card.uuid" :updateelement="{}" />
        </template>
      </masonry-wall>


   <div style="display: flex; flex-wrap: wrap;">
        <div v-for="(card, i) in CardsArray" :key="i" class="list-item">
          <div class="list-content">
            <CardViewer :cardid="card.uuid" :updateelement="{}" />
          </div>
        </div>
      </div>
-->

    </div>
    <div class="taglist">

      <div>
        <button @click="currentTag = tag" style="background-color:var(--primary);color:var(--primary-f)">
          [ {{ this.$root.setlang.db.clear }} ]
        </button>
        <button @click="currentTag = tag" v-for="(tag, index) in taglist.sort()" :key="index">
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MasonryWall from '@yeger/vue-masonry-wall'
import CardViewer from "@/components/universal/CardViewer";
export default {
  name: 'CardsDatabaseHome',
  data() {
    return {
      SearchTerm: null,
      currentTag: null
    }
  },
  components: {
    CardViewer,
    MasonryWall
  },
  computed: {
    CardsArray() {
      let list = [];
      Object.keys(this.$root.$data.shadowDB.Cards).forEach((element) => {
        let qmatch = false
        if (!this.SearchTerm) {
          qmatch = true
        } else {
          if (
            this.$root.$data.shadowDB.Cards[element].title.toLowerCase().includes(this.SearchTerm.toLowerCase()) ||
            this.$root.$data.shadowDB.Cards[element].description.toLowerCase().includes(this.SearchTerm.toLowerCase())
          ) {
            qmatch = true
          }
        }
        let tmatch = false
        if (!this.currentTag) {
          tmatch = true
        } else {
          if (this.$root.$data.shadowDB.Cards[element].labels.includes(this.currentTag)) {
            tmatch = true
          }
        }

        if (qmatch && tmatch) {
          list.push(this.$root.$data.shadowDB.Cards[element]);
        }

      });
      return list;
    },
    taglist() {
      let taglist = []
      Object.keys(this.CardsArray).forEach((card) => {
        this.CardsArray[card].labels.forEach((tg) => {
          if (!taglist.includes(tg)) {
            taglist.push(tg)
          }
        })
      })
      // TODO : add a tag filter to the list here as well so it returns any with the selected tag within the search
      return taglist
    }
  },

  methods: {
    deleteCard(uuid) {
      if (confirm("Are you sure you want to delete this card - it will remove it from the project completely")) {
        this.$root.DeleteRecord("Cards", uuid)
        delete this.$root.shadowDB.Cards[uuid]
      }
    },

  },
  mounted() {

  }
}
</script>

<style scoped>
#scrollWindow {
  overflow: auto;
  white-space: nowrap;
  position: absolute;
  top: 40px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 0px;
}

.taglist {
  position: fixed;
  right: 0px;
  top: 90px;
  bottom: 0px;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 50px;
  width: 120px;
  background-color: var(--taglist-panel);
}

.taglist button {
  position: relative;
  display: block;
  width: 100%;
  padding: 5px;
  background-color: var(--taglist-tag);
  color: var(--taglist-tag-f);
  margin: 5px;
  text-align: left;
  font-family: inherit;
  border: 0;
  cursor: pointer;
  word-wrap: break-word;
  white-space: normal;
}

.taglist button:active,
.taglist button:focus,
.taglist button:hover {
  background-color: var(--accent);
  color: var(--accent-f);
}

.toolbar {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  background-color: var(--db-search-bar);
  color: var(--db-search-bar-f);
  height: 40px;
  padding-left: 40px;

}

.toolbar svg {
  position: absolute;
  left: 0px;
  fill: var(--db-search-bar-f);
  top: 8px;
  left: 10px;
}

.toolbar input {
  width: 100%;
  margin: 0 auto;
  background-color: none;
  background: none;
  color: var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}

.toolbar .interfaceBtn {
  position: absolute;
  right: 0px;
  top: 0px;
  margin-top: 0px;
  width: 120px;
}

.toolbar .btn {
  top: 5px;
  white-space: nowrap;
}

.list-item {
  display: flex;
  margin: 5px;
  width: 320px;
}

.list-content {
  width: 100%;
}

.cardFrame {
  position: relative
}

.deleteIconButton {
  background-color: var(--danger);
  color: var(--danger-f);
  fill: var(--danger-f);
}

.cardFrame:hover .deleteIconButton,
.cardFrame:focus .deleteIconButton,
.cardFrame:active .deleteIconButton {
  display: block;
}
</style>
