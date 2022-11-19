<template>
  <div class="toolbar">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
    <input v-model="SearchTerm" :placeholder="this.$root.setlang.db.search" />


    <button @click="this.$root.makeNewCard()" class="interfaceBtn">
      <svg viewBox="0 0 24 24">
        <path
          d="M13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H20C21.11 4 22 4.89 22 6V13.81C21.12 13.3 20.09 13 19 13C15.69 13 13 15.69 13 19C13 19.34 13.04 19.67 13.09 20M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
      </svg>

    </button>


  </div>
  <div id="scrollWindow">


    <div style="padding:15px;padding-right:135px;">


      <masonry-wall :items="CardsArray" :ssr-columns="1" :column-width="300" :gap="16">
        <template #default="{ item }">
          <div class="cardFrame">
            <CardViewer :cardid="item.uuid" :key="item.lastupdated" />
            <button class="deleteIconButton" @click="deleteCard(item.uuid)">
              <svg style="width: 18px; height: 18px" viewBox="0 0 24 24">
                <path
                  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
              </svg>
            </button>
          </div>
        </template>
      </masonry-wall>
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
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db } from "@/db.js";
export default {
  name: 'CardsDatabaseHome',
  data() {
    return {
      SearchTerm: null,
      currentTag: null,
      cardList: useObservable(liveQuery(async () => await db.Cards.toArray())),
    }
  },
  components: {
    CardViewer,
    MasonryWall
  },
  computed: {
    CardsArray() {
      let list = [];
      if (this.cardList) {
        this.cardList.forEach((element) => {
          let qmatch = false
          if (!this.SearchTerm) {
            qmatch = true
          } else {
            if (
              element.title.toLowerCase().includes(this.SearchTerm.toLowerCase()) ||
              element.description.toLowerCase().includes(this.SearchTerm.toLowerCase())
            ) {
              qmatch = true
            }
          }
          let tmatch = false
          if (!this.currentTag) {
            tmatch = true
          } else {
            if (element.labels.includes(this.currentTag)) {
              tmatch = true
            }
          }

          if (qmatch && tmatch) {
            list.push(element);
          }
        });
      }
      return list;
    },
    taglist() {
      let taglist = []
      this.CardsArray.forEach((card) => {
        card.labels.forEach((tg) => {
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
      this.$swal(
        {
          title: 'Are you sure?',
          text: "You won't be able to undo this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$root.DeleteRecord("Cards", uuid)
            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        );

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
  width: calc(100% - 40px);
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
  width: 30px;
  padding-left: 30px;
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
