<template>
<h1>Settings</h1>
<button @click="clear">Clear Database</button>
<div>
<h4>Themes</h4>
<select v-model="$root.theme" @change="$root.switchTheme">
  <option  v-for="(theme, index) in $root.themeList" :key="index"   :value="theme.file">{{theme.name}}</option>
</select>

</div>

</template>

<script>
export default {
  name: 'SettingsPopup',
  methods:{
    async clear(){
        this.$root.session={}
        this.$root.popup={}
         this.$root.dbloaded=false

         this.$root.shadowDB={Settings:{}}
        await this.$root.db.delete()
               location.reload()
       
    }
  }
}
</script>

