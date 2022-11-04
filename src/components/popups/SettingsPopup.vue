<template>
<h1>Settings</h1>
<button @click="clear">Clear Database</button>
<div>
<h4>Themes</h4>
<select v-model="$root.shadowDB.Settings[Object.keys($root.shadowDB.Settings)[0]].settings.theme" @change="switchTheme">
  <option value="default">Default</option>
  <option value="light">Light</option>
</select>

<pre>
  {{$root.shadowDB.Settings[Object.keys($root.shadowDB.Settings)[0]].settings}}
</pre>
</div>

</template>

<script>
export default {
  name: 'SettingsPopup',
  methods:{
    switchTheme(){
      document.getElementById("themeSwitch").href = "themes/"+this.$root.shadowDB.Settings[Object.keys(this.$root.shadowDB.Settings)[0]].settings.theme+".css";
    },
    async clear(){
        this.$root.$data.session={}
        this.$root.$data.popup={}
         this.$root.$data.dbloaded=false

         this.$root.$data.shadowDB={Settings:{}}
        await this.$root.$data.db.delete()
               location.reload()
       
    }
  },
  mounted(){
   if(!this.$root.shadowDB.Settings[Object.keys(this.$root.shadowDB.Settings)[0]].settings.theme){
    this.$root.shadowDB.Settings[Object.keys(this.$root.shadowDB.Settings)[0]].settings.theme = "default"
   }
  }
}
</script>

