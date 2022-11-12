<template>
  <div v-if="Object.keys($root.shadowDB.Settings).length">
    <Start />
  </div>
  <div v-if="!Object.keys($root.shadowDB.Settings).length">
    <WelcomeScreen />
  </div>

  <CardModal v-if="$root.session.EditCard" :key="$root.EditCardrefresh" />


  <ImageManager v-if="$root.imagemanager" />
  <PopupManager />
  <!--
  Hidden File open element
  this is used byt the fileManage.js to trigger a file open dialogue
 -->
  <input type="file" id="wavemakerHiddenPicker" name="upload" accept=".wm4" @change="file_load" style="display: none" />
</template>

<script>
import '@/css/wavemakerInterface.css'
import '@/css/transitions.css'
import apitool from '@/mixins/apitool.js'
import fileManage from '@/mixins/fileManage.js'
import shadowDatabase from '@/mixins/shadowDatabase.js'
import dexieDB from '@/mixins/dexieDB.js'
import GoogleDriveApi from '@/mixins/GoogleDriveApi.js'
import PopupManager from '@/components/popups/PopupManager.vue'
import WelcomeScreen from '@/components/WelcomeScreen.vue'
import Start from '@/components/Start.vue'
import { v4 as uuid } from "uuid";
import Languages from "./lang.json";
import CardModal from "./components/universal/CardModal.vue"
import ImageManager from "./components/universal/ImageManager.vue"
export default {
  name: 'App',
  mixins: [apitool, fileManage, shadowDatabase, dexieDB, GoogleDriveApi],
  components: {
    PopupManager,
    WelcomeScreen,
    Start,
    CardModal,
    ImageManager
  },
  /*
   watch: {  // for dev
    session: {
      // handler(newValue, oldValue) {
        handler(newValue) {
        localStorage.setItem("wmDev", JSON.stringify(newValue));
      },
      deep: true
    }
  },
  */
  data() {
    return {
      EditCardrefresh: null,
      theme: "default",
      themeList: [
        { name: "Default Wavemaker", file: "default" },
        { name: "Light Theme", file: "light" },
        { name: "Blue Sky", file: "bluesky" }
      ],
      lhspin: true,
      rhspin: true,
      show: false,
      popup: {
        name: null
      },
      lang: "en",
      language: Languages,
      setlang: null,
      uuid,
      session: {},
      navshow: true,
      imagemanager: false,
      imageUpdate: {
        table: null,
        targetuuid: null,
        target: null
      }
    }
  },
  methods: {
    switchLang() {
      localStorage.setItem("wmLang", this.lang)
      this.updateLang()
    },
    updateLang() {

      this.setlang = this.$root.language[this.$root.lang]
      /*
            Object.keys(this.$root.language[this.$root.lang]).forEach((section)=>{
              Object.keys(section).forEach(item =>{
                this.setlang[section][item] = this.$root.language[this.$root.lang][section][item]
              })
            
            })
              */

    },

    openInNew(d) {
      var w = window.innerWidth - ((window.innerWidth / 100) * 5);
      var h = window.innerHeight - ((window.innerHeight / 100) * 5);
      if (d === "planningboard") {
        window.open("/?sc=" + d + "&sel=" + this.$root.session.writer.selected, "PlanningBoard", "width=" + w + "px,height=" + h + "px");
        return false
      }
      // otherwise it's a URL - may need to check for the old https here
      window.open(d, "Info", "width=" + w + "px,height=" + h + "px");
    },
    wordCounter(str) {
      str = str.replace(/(<([^>]+)>)/gi, " ");
      return str.split(" ").filter(function (n) {
        return n != "";
      }).length;
    },
    niceDate(timestamp) {
      var d = new Date(timestamp)
      return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    },
    screensizefixes() {
      let w = window.innerWidth
      if (w < 720) {
        this.lhspin = false
        this.rhspin = false
      }
      if (w > 720) {
        this.lhspin = true
        this.rhspin = true
      }
    },
    SpecialKeys(e) {
      /* */
      if (e.shiftKey && e.key === "Enter") {
        console.log("Session :", JSON.parse(JSON.stringify(this.session)));
        console.log("shadowDB : ", JSON.parse(JSON.stringify(this.shadowDB)));
      }
      /*
      if (e.ctrlKey && e.key === "Enter") {
        console.log(this.pretty(this.session));
        let params = "?selectedProject=" + this.session.selectedProject;
        params += "&selectedTool=" + this.session.selectedTool;
        params += "&selectedToolId=" + this.session.selectedToolId;
        window.history.replaceState(null, null, params);
      }
      */
    },
    switchTheme() {
      document.getElementById("themeSwitch").href = "themes/" + this.theme + ".css";
      localStorage.setItem("wmTheme", this.theme)
    },
    makeNewCard(existingid) {
      let newId = this.$root.uuid(); // use the same uuid to link them
      if (existingid) {
        newId = existingid
      }
      let obj = {};
      obj.uuid = newId
      obj.projectID = this.$root.$data.session.selectedProject;
      obj.title = "";
      obj.description = "";
      obj.showdesc = false;
      obj.content = "";
      obj.labels = [];
      obj.images = [];
      obj.style = "";
      obj.options = {};
      obj.color = "--card1"
      this.$root.AddRecord("Cards", obj);
      this.$root.$data.session.EditCard = obj.uuid
    },
    unloadEvent(e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = "";
    }
  },
  mounted() {

    if (localStorage.getItem("wmTheme")) {
      this.theme = localStorage.getItem("wmTheme")
      this.switchTheme()
    }

    if (localStorage.getItem("wmLang") && localStorage.getItem("wmLang") != "undefined") {

      this.lang = localStorage.getItem("wmLang")
    } else {
      this.lang = "en"
    }
    this.updateLang();
    window.addEventListener("keydown", this.SpecialKeys);
    // set the text direction  on load - this looks like it might be a bit buggy for rtl  - will need to run tests
    document.body.dir = this.$root.setlang.textdirection
    this.screensizefixes()
  },
  created() {
    window.addEventListener("resize", this.screensizefixes);
  },
  unmount() {
    window.removeEventListener("resize", this.screensizefixes);
  }
}
</script>


