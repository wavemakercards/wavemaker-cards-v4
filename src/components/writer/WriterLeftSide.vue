<template>
  <div class="menu" v-bind:class="$root.lhspin ? 'lhspinned' : ''" v-if="writerData">
    <!--<div class="title">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </div>
    -->
    <button class="pinBtn" @click="$root.lhspin = !$root.lhspin">
      <svg style="width: 18px; height: 18px" viewBox="0 0 24 24" v-if="$root.lhspin">
        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
      </svg>

      <svg style="width: 18px; height: px" viewBox="0 0 24 24" v-if="!$root.lhspin">
        <path
          d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" />
      </svg>
    </button>
    <div class="scrollpanel">

      <button class="settingsBtn" style="border:0; outline:none" @click="this.$root.session.writer.file = null">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            d="M12 19C12 20.08 12.25 21.09 12.68 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V12.08C19.67 12.03 19.34 12 19 12C15.13 12 12 15.13 12 19M23.8 20.4C23.9 20.4 23.9 20.5 23.8 20.6L22.8 22.3C22.7 22.4 22.6 22.4 22.5 22.4L21.3 22C21 22.2 20.8 22.3 20.5 22.5L20.3 23.8C20.3 23.9 20.2 24 20.1 24H18.1C18 24 17.9 23.9 17.8 23.8L17.6 22.5C17.3 22.4 17 22.2 16.8 22L15.6 22.5C15.5 22.5 15.4 22.5 15.3 22.4L14.3 20.7C14.2 20.6 14.3 20.5 14.4 20.4L15.5 19.6V18.6L14.4 17.8C14.3 17.7 14.3 17.6 14.3 17.5L15.3 15.8C15.4 15.7 15.5 15.7 15.6 15.7L16.8 16.2C17.1 16 17.3 15.9 17.6 15.7L17.8 14.4C17.8 14.3 17.9 14.2 18.1 14.2H20.1C20.2 14.2 20.3 14.3 20.3 14.4L20.5 15.7C20.8 15.8 21.1 16 21.4 16.2L22.6 15.7C22.7 15.7 22.9 15.7 22.9 15.8L23.9 17.5C24 17.6 23.9 17.7 23.8 17.8L22.7 18.6V19.6L23.8 20.4M20.5 19C20.5 18.2 19.8 17.5 19 17.5S17.5 18.2 17.5 19 18.2 20.5 19 20.5 20.5 19.8 20.5 19Z" />
        </svg>
        <div>{{ this.$root.setlang.writer.settings }}</div>


      </button>
      <div style="height:20px;"></div>
      <WriterNode :list="writerData.files" :parent="writerData" />

    </div>

    <div class="addbar">
      <button @click="addFile">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H13.81C13.28 21.09 13 20.05 13 19C13 18.67 13.03 18.33 13.08 18H6V16H13.81C14.27 15.2 14.91 14.5 15.68 14H6V12H18V13.08C18.33 13.03 18.67 13 19 13S19.67 13.03 20 13.08V8L14 2M13 9V3.5L18.5 9H13M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
        </svg>
      </button>


      <button @click="addchild" style="left:50px" v-if="this.$root.session.writer.file">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path d="M19,15L13,21L11.58,19.58L15.17,16H4V4H6V14H15.17L11.58,10.42L13,9L19,15Z" />
        </svg>
      </button>
    </div>

  </div>
</template>

<script>
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db } from "@/db.js";
import WriterNode from "./WriterNode"
export default {
  name: "WriterLeftSide",
  display: "Transitions",
  order: 7,
  components: {
    WriterNode,
  },
  data() {
    return {
      drag: false,
      pinme: false,
      defaultCard: {
        type: "file",
        name: this.$root.setlang.writer.newfile,
        notes: [],
        content: null,
        children: []
      },
      writerData: useObservable(liveQuery(() => db.Writer.get(this.$root.session.writer.selected))),
    };
  },
  methods: {
    previewText(str) {
      if (str) {
        str = str.replace(/(<([^>]+)>)/gi, " ");
        let app = "..."
        if (str.length < 100) { app = "" }
        return str.substring(0, 75) + app
      }
    },
    changelist() {
      console.log("updateDatabase")
      this.updateDatabase()
    },
    deleteFile(index, element) {
      if (confirm(this.$root.setlang.writer.deletewarn)) {
        if (this.$root.session.writer.file === element) {
          this.$root.session.writer.file = null
        }
        this.writerData.files.splice(index, 1)

        this.updateDatabase();
      }
    },
    searchforuuid(file, parent) {
      let index = parent.indexOf(file)
      if (index !== "undefined") {
        return {
          index,
          parent
        }
      } else {
        this.searchforuuid(file, parent.children)
      }
    },
    async addFile() {
      let obj = {}
      obj.uuid = this.$root.uuid();
      obj.children = [],
        obj.open = true,
        obj.type = "file"

      // create the new file first!!
      let file = {}
      file.title = this.$root.setlang.writer.newfile
      file.writerid = this.$root.session.writer.selected
      file.uuid = obj.uuid
      file.content = ""
      let x = await this.$root.AddRecord("Files", file)
      console.log(x)

      if (this.$root.session.writer.file) {
        // so I need to find the file and it's parent array
        console.log("looking for file")
        let i = this.searchforuuid(this.$root.session.writer.file, this.writerData.files)
        i.parent.splice((i.index + 1), 0, obj);
      } else {
        this.writerData.files.push(obj);
      }
      // we need to create a new file here

      this.updateDatabase();

    },
    async addchild() {
      console.log(this.$root.session.writer.file)
      let obj = JSON.parse(JSON.stringify(this.defaultCard))
      obj.uuid = this.$root.uuid();

      // create the new file first!!
      let file = {}
      file.title = this.$root.setlang.writer.newfile,
        file.uuid = obj.uuid
      file.writerid = this.$root.session.writer.selected
      file.content = ""
      await this.$root.AddRecord("Files", file)

      this.$root.session.writer.file.children.push(obj);

      this.updateDatabase();
    },
    updateDatabase() {
      console.log("list updateDatabase");
      this.$root.UpdateRecord(
        "Writer",
        this.writerData.uuid,
        this.writerData
      );
    }
  },
  computed: {

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style scoped>
.miniwordcount {
  font-weight: bold;
  text-align: right;

}

.itemBox {
  padding-right: 25px;
}

.settingsBtn {
  height: 40px;
  width: 100%;
  background-color: var(--writer-side-nav);
  color: var(--writer-side-nav-f);
  text-align: left;
  padding-left: 40px;
  cursor: pointer;
}

.settingsBtn svg {
  position: absolute;
  left: 5px;
  top: 5px;
  fill: var(--writer-side-nav-f);
}

.settingsBtn:hover,
.settingsBtn:focus,
.settingsBtn:active {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.settingsBtn:hover svg,
.settingsBtn:focus svg,
.settingsBtn:active svg {
  fill: var(--button-hover-f)
}

.pinBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 0px;
  background: none;
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--writer-side-nav);

}

.pinBtn svg {
  fill: var(--writer-side-nav-f);
}



.pinBtn:hover,
.pinBtn:active,
.pinBtn:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);

}

.pinBtn:hover svg,
.pinBtn:active svg,
.pinBtn:focus svg {
  fill: var(--button-hover-f);
}




.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: var(--hover-ghost);
}

.list-group {
  min-height: 20px;
}

.list-group-item svg {
  fill: var(--writer-side-panels-f);
}


.menu {
  font-weight: 100;
  background: var(--writer-side-panels);
  color: var(--writer-side-panels-f);
  width: 300px;
  height: 100%;
  padding: 0px;
  padding-right: 40px;
  padding-top: 0px;
  position: fixed;
  top: 50px;

  -webkit-box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  left: -260px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.menu:hover,
.menu:focus,
.lhspinned {
  transform: translate3d(260px, 0, 0);
  animation-timing-function: 1s ease-in;
}



.scrollpanel {
  overflow-y: auto;
  position: absolute;
  top: 40px;
  bottom: 0px;
  width: 100%;
  padding: 0px;
  background-color: inherit
}

.addbar {
  position: absolute;
  top: 0px;
  background-color: var(--writer-side-nav);
  width: calc(100% - 40px);
  height: 40px;
}

.addbar button {
  border: 0px;
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--writer-side-nav);
  color: var(--writer-side-nav-f);
}

.addbar button svg {
  fill: var(--writer-side-nav-f);
}

.addbar button:hover,
.addbar button:active,
.addbar button:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.addbar button:hover svg,
.addbar button:active svg,
.addbar button:focus svg {
  fill: var(--button-hover-f);
}

.chosen {
  background-color: var(--accent);
  color: var(--accent-f);

}

.chosen>svg {
  fill: var(--accent-f);
}
</style>
