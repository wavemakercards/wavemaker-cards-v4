<template>
  <div style="text-align:left">
<h1>{{ this.$root.setlang.settings.title }}</h1>


<button class="interfaceBtn fullw" @click="themes=!themes" style="text-align:left" >
    <svg viewBox="0 0 24 24">
    <path  d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z" />
  </svg>
    {{ this.$root.setlang.settings.themes }}
</button>

<div v-if="themes" class="dropdown">
<button class="myoption" @click="setTheme(theme.file)"  v-for="(theme, index) in $root.themeList" :key="index" >
  {{theme.name}}
</button>
</div>



<button class="interfaceBtn fullw" @click="lang=!lang" style="text-align:left" >
  <svg viewBox="0 0 24 24">
    <path  d="M11 1H3C1.9 1 1 1.9 1 3V15L4 12H9V11C9 8.8 10.79 7 13 7V3C13 1.9 12.1 1 11 1M11 4L9.5 4C9.16 5.19 8.54 6.3 7.68 7.26L7.66 7.28L8.92 8.53L8.55 9.54L7 8L4.5 10.5L3.81 9.77L6.34 7.28C5.72 6.59 5.22 5.82 4.86 5H5.85C6.16 5.6 6.54 6.17 7 6.68C7.72 5.88 8.24 4.97 8.57 4L3 4V3H6.5V2H7.5V3H11V4M21 9H13C11.9 9 11 9.9 11 11V18C11 19.1 11.9 20 13 20H20L23 23V11C23 9.9 22.1 9 21 9M19.63 19L18.78 16.75H15.22L14.38 19H12.88L16.25 10H17.75L21.13 19H19.63M17 12L18.22 15.25H15.79L17 12Z" />
</svg>
{{ this.$root.setlang.settings.lang }}
</button>

<div v-if="lang" class="dropdown">
<button class="myoption" v-for="(k,i) in Object.keys(this.$root.language)" :key="i"   @click="language(k)" >
  {{ this.$root.language[k].info.name  }}
</button>

</div>







<hr/>
<button @click="clear" class="interfaceBtn fullw " style="text-align: left;">
  <svg  viewBox="0 0 24 24">
    <path  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
</svg>
  {{ this.$root.setlang.settings.close }}</button>
</div>

</template>

<script>
export default {
  name: 'SettingsPopup',
  data(){
    return{
      themes :false,
      lang :false
    }
  },
  methods:{
    setTheme(t){
      this.$root.theme = t;
      this.$root.switchTheme()
      this.themes =false
    },
    language(l){
      this.$root.lang=l
      this.$root.switchLang()
    },
    async clear(){
      if(confirm(this.$root.setlang.settings.clear)){
        this.$root.session={}
        this.$root.popup={}
         this.$root.dbloaded=false

         this.$root.shadowDB={Settings:{}}
        await this.$root.db.delete()
               location.reload()
      }      
    }
  }
}
</script>

<style scoped>
.themeselect{
  width:100%;
  background-color: inherit;
  color:inherit;
  height: inherit;
  border:0px;
}

.myoption{
  width:100%;
 padding:10px;
 border-radius: 0px;
 border:0px;
 background-color: var(--paper);
 color: var(--paper-f);
 fill: var(--paper-f);
 text-align: left;
}
.myoption:hover,
.myoption:focus,
.myoption:active
{
  background-color: var(--button-hover);
 color: var(--button-hover-f);
 fill: var(--button-hover-f);
}
.dropdown{
  max-height: 200px;
  overflow-y: auto;;
}
</style>
