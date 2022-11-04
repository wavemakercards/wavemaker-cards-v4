<template>
 <div v-if="Object.keys($root.shadowDB.Settings).length">
    <Start />
  </div>
  <div v-if="!Object.keys($root.shadowDB.Settings).length" >
  <WelcomeScreen />
  </div>
   <CardModal v-if="$root.$data.session.EditCard" />
  <PopupManager/>
<!--
  Hidden File open element
  this is used byt the fileManage.js to trigger a file open dialogue
 -->
 <input
      type="file"
      id="wavemakerHiddenPicker"
      name="upload"
      accept=".wm4"
      @change="file_load"
      style="display: none"
    />
</template>

<script>
//import '@/css/wavemaker.css'
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
export default {
  name: 'App',
  mixins: [apitool, fileManage ,shadowDatabase,dexieDB,GoogleDriveApi],
  components:{
    PopupManager,
    WelcomeScreen,
    Start,
    CardModal
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
  data(){
    return{
      theme : "default",
      themeList :[
        {name : "Default Wavemaker", file : "default"},
        {name : "Light Theme", file : "light"},
        {name : "Blue Sky", file : "bluesky"}
      ],
      lhspin:true,
      rhspin:true,
      show : false,
      popup :{
        name :null
        },
      lang: "en",
      language: Languages,
      uuid,
       session: {},
       navshow:true
    }
  },
  methods:{
    wordCounter(str) {
      str = str.replace(/(<([^>]+)>)/gi, " ");
      return str.split(" ").filter(function (n) {
        return n != "";
      }).length;
    },
    niceDate(timestamp){
      var d= new Date(timestamp)
      return  d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" - "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
    },
      screensizefixes() {
        let w = window.innerWidth
        if(w<720){
          this.lhspin = false
          this.rhspin = false
        }
           if(w>720){
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
    switchTheme(){
      document.getElementById("themeSwitch").href = "themes/"+this.theme+".css";
      localStorage.setItem("wmTheme", this.theme)
    },
  },
  mounted(){

    if (localStorage.getItem("wmTheme")) {
        this.theme = localStorage.getItem("wmTheme")
        this.switchTheme()
    }
    window.addEventListener("keydown", this.SpecialKeys);
    // set the text direction  on load - this looks like it might be a bit buggy for rtl  - will need to run tests
    document.body.dir=this.language[this.lang].textdirection
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


