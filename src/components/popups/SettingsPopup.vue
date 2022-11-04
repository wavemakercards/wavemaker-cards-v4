<template>
<h1>Settings</h1>
<button @click="clear">Clear Database</button>
</template>

<script>
export default {
  name: 'SettingsPopup',
  methods:{
    async clear(){
        this.$root.$data.session={}
        this.$root.$data.popup={}
         this.$root.$data.dbloaded=false

         this.$root.$data.shadowDB={Settings:{}}
        await this.$root.$data.db.delete()
               location.reload()
       
    }
  }

}
</script>

