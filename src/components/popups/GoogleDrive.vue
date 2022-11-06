<template>
  <button
    @click="$root.GoogleDriveSignIn()"
    v-if="!$root.$data.GoogleDriveApi.loggedin"
    class="interfaceBtn GoogleDrive"
  >
    <svg  viewBox="0 0 24 24">
      <path
        d="M7.71,3.5L1.15,15L4.58,21L11.13,9.5M9.73,15L6.3,21H19.42L22.85,15M22.28,14L15.42,2H8.58L8.57,2L15.43,14H22.28Z"
      />
    </svg>

    {{this.$root.setlang.google.info}}
  </button>

  <div v-if="$root.$data.GoogleDriveApi.loggedin" style="text-align:left">


    <div v-if="Object.keys($root.shadowDB.Settings).length">
<h3>{{this.$root.setlang.google.saveinfo}}</h3>
<h4>{{this.$root.$data.shadowDB.Settings[Object.keys(this.$root.$data.shadowDB.Settings)[0]].settings.ProjectName}}</h4>
<button @click="$root.GoogleDriveWriteFile()" class="interfaceBtn">
  <svg  viewBox="0 0 24 24">
    <path d="M13 19C13 19.34 13.04 19.67 13.09 20H6.5C5 20 3.69 19.5 2.61 18.43C1.54 17.38 1 16.09 1 14.58C1 13.28 1.39 12.12 2.17 11.1S4 9.43 5.25 9.15C5.67 7.62 6.5 6.38 7.75 5.43S10.42 4 12 4C13.95 4 15.6 4.68 16.96 6.04C18.32 7.4 19 9.05 19 11C20.15 11.13 21.1 11.63 21.86 12.5C22.37 13.07 22.7 13.71 22.86 14.42C21.82 13.54 20.5 13 19 13C15.69 13 13 15.69 13 19M16 18H18V22H20V18H22L19 15L16 18Z" />
</svg>
  {{this.$root.setlang.google.save}}</button>
    </div>








     <h3>{{this.$root.setlang.google.files}}</h3>
<div >
<button @click="$root.$data.GoogleDriveApi.files=[];$root.GoogleDriveListFiles();" class="interfaceBtn filebutton" style="width:auto;">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="!$root.GoogleDriveApi.searching">>
    <path  d="M18 14.5C19.11 14.5 20.11 14.95 20.83 15.67L22 14.5V18.5H18L19.77 16.73C19.32 16.28 18.69 16 18 16C16.62 16 15.5 17.12 15.5 18.5C15.5 19.88 16.62 21 18 21C18.82 21 19.54 20.61 20 20H21.71C21.12 21.47 19.68 22.5 18 22.5C15.79 22.5 14 20.71 14 18.5C14 16.29 15.79 14.5 18 14.5M10 4L12 6H20C21.1 6 22 6.89 22 8V13C21 12.38 19.79 12 18.5 12C14.91 12 12 14.91 12 18.5C12 19 12.06 19.5 12.17 20H4C2.89 20 2 19.1 2 18L2 6C2 4.89 2.89 4 4 4H10Z" />
</svg>

<svg  version="1.1"   viewBox="0 0 100 100" width="24px" height="24px" v-if="$root.GoogleDriveApi.searching">
    <path  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>


{{this.$root.setlang.google.search}}
</button>
</div>
   

<div v-if="$root.$data.GoogleDriveApi.files.length">
    <div v-for="(f, i) in $root.$data.GoogleDriveApi.files" :key="i">
      <button @click="openFile(f)" class="interfaceBtn filebutton file">
        <svg  viewBox="0 0 24 24">
          <defs id="defs8" />
          <path
            id="path2"
            d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
          />
          <path
            id="path3731"
            d="m 11.084747,9.8305089 h 7.186439 V 17.01695 h -7.186439 z"
            style="fill: none; stroke-width: 0.29943502"
          />
          <path
            id="path3733"
            d="m 17.021865,11.84974 -1.7835,-1.787036 c -0.308989,-0.3095941 -0.810692,-0.3095941 -1.119667,0 l -1.777381,1.783961 c -0.104021,0.104223 -0.104021,0.269733 0,0.373956 l 0.538408,0.539479 0.357918,0.334109 c 0.107067,0.09809 0.269211,0.09809 0.376277,0 l 0.718911,-0.665156 c 0.198848,-0.183903 0.501704,-0.183903 0.697492,0 l 0.71891,0.665156 c 0.107081,0.09809 0.269212,0.09809 0.376292,0 l 0.357932,-0.334109 0.538408,-0.536404 c 0.100961,-0.101162 0.100961,-0.269733 0,-0.373956 z"
            style="stroke-width: 0.0139114"
          />
          <path
            id="path3735"
            d="m 11.325657,13.986203 2.793041,2.798572 c 0.308975,0.309566 0.810678,0.309566 1.119667,0 l 2.79304,-2.798572 c 0.483359,-0.4843 0.143785,-0.62837 -0.211087,-0.965553 l -0.437475,-0.416863 c -0.103993,-0.101148 -0.269211,-0.09807 -0.376277,0 l -0.718897,0.665156 c -0.198876,0.183917 -0.501703,0.183917 -0.697506,0 l -0.71891,-0.665156 c -0.106323,-0.09807 -0.269954,-0.09807 -0.376292,0 l -0.71891,0.665156 c -0.198848,0.183917 -0.501704,0.183917 -0.697492,0 l -0.718911,-0.665156 c -0.106336,-0.09807 -0.269955,-0.09807 -0.376292,0 l -0.403815,0.373969 c -0.37013,0.343305 -0.758647,0.499618 -0.253884,1.008447 z"
            style="stroke-width: 0.0139114"
          />
        </svg>

       <div> {{ f.name }} - ({{f.size + "bytes"}})</div>
       <div style="text-decoration:italic;"> {{f.modifiedTime }}</div>
      </button>
    </div>

</div>
  
  <div >
<hr/>
  <button
        @click="$root.GoogleDriveSignOut"
        class="interfaceBtn filebutton" style="width: auto; display:inline-block"
      >
        <svg  viewBox="0 0 24 24">
          <path
            d="M10 4A4 4 0 0 0 6 8A4 4 0 0 0 10 12A4 4 0 0 0 14 8A4 4 0 0 0 10 4M17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13M10 14C5.58 14 2 15.79 2 18V20H11.5A6.5 6.5 0 0 1 11 17.5A6.5 6.5 0 0 1 11.95 14.14C11.32 14.06 10.68 14 10 14M17.5 14.5C19.16 14.5 20.5 15.84 20.5 17.5C20.5 18.06 20.35 18.58 20.08 19L16 14.92C16.42 14.65 16.94 14.5 17.5 14.5M14.92 16L19 20.08C18.58 20.35 18.06 20.5 17.5 20.5C15.84 20.5 14.5 19.16 14.5 17.5C14.5 16.94 14.65 16.42 14.92 16Z"
          />
        </svg>
        {{this.$root.setlang.google.logout}}
      </button>


    <button class="interfaceBtn filebutton logout" @click="$root.$data.popup.name=null">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
</svg>
{{this.$root.setlang.google.close}}
    </button>
    </div>

  


</div>

</template>

<script>
export default {
  name: "GoogleDrive",
  props: {
    msg: String,
  },
  data(){
    return {
        tab : "load",
        searching : false
    }
  },
  methods: {
    loggy(l){
        console.log(l)
    },
    openFile(f) {
      this.$root.$data.GoogleDriveApi.CURRENT_FILE_OBJ = f;
      this.$root.$data.GoogleDriveApi.CURRENT_FILE_NAME = f.name;
      this.$root.GoogleDriveReadFile();
      this.$root.$data.popup.name= null
    },
  },
  mounted(){
   // this.$root.GoogleDriveSignIn()
  }
};
</script>

<style scoped>
.GoogleDrive {
  width: auto;
  margin: 0 auto;
}




.file {
  position: relative;
  text-align: left;
  padding-left: 40px;
  width: 100%;
  background-color: var(--paper);
  color: var(--paper-f);
  fill: var(--paper-f);
}

.file:hover,.file:focus,.file:active{
  background-color: var(--button-hover);
  color: var(--button-hover-f);
  fill: var(--button-hover-f);
}

.logout {
  width: auto;
  float: right;
}
</style>