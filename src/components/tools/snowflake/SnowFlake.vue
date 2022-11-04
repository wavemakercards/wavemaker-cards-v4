<template>
<div class="toolbar">
    <input  v-model="$root.$data.shadowDB.Snowflake[$root.$data.session.snowflake.currentboard].title" placeholder="Board Name">
   
    <button @click="$root.$data.session.snowflake.displaytree=!$root.$data.session.snowflake.displaytree" class="btn" v-if="!$root.$data.session.snowflake.displaytree" >
  <svg style="transform: rotate(270deg);" version="1.1" width="24" height="24" viewBox="0 0 24 24" data-v-024bf5af=""><path d="M21 16V13C21 11.89 20.11 11 19 11H13V8H15V2H9V8H11V11H5C3.89 11 3 11.89 3 13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21M11 4H13V6H11V4M5 20H3V18H5V20M13 20H11V18H13V20M21 20H19V18H21V20Z" data-v-024bf5af=""></path></svg> View
    </button>

     <button @click="$root.$data.session.snowflake.displaytree=!$root.$data.session.snowflake.displaytree" class="btn" v-if="$root.$data.session.snowflake.displaytree" >
  
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2M8,10V14H16V10H8M8,16V20H16V16H8M8,4V8H16V4H8Z" /></svg> View
    </button>

    <button @click="$root.$data.session.snowflake.currentboard=null" class="btn" >
    <svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>
        Close
    </button>

      
</div>
  <div class="table">          
          <FlakeItem :item="$root.$data.shadowDB.Snowflake[$root.$data.session.snowflake.currentboard].content"  :coltoggle="true" /> 
  </div>
</template>

<script>
import FlakeItem from "./FlakeItem";
export default {
  name: "SnowFlake",
  components: {
FlakeItem
  },
  data() {
    return {
    };
  },
  methods: {
      AddCol(){
          let o = {}
          o.title = ""
          o.cards = []
          this.$root.$data.shadowDB.Snowflake[this.$root.$data.session.snowflake.currentboard].content.push(o)
          this.$root.UpdateRecord("Snowflake",this.$root.$data.session.snowflake.currentboard, this.$root.$data.shadowDB.Snowflake[this.$root.$data.session.snowflake.currentboard]) 
      },
  },
  mounted() {}
};
</script>

<style scoped>
.toolbar{
    display: flex; 
    background-color: var(--c10);
    color: var(--c10-f);
    height:50px;

}
.toolbar input{
 width:100%;
  margin:0 auto;
  background-color: none;
  background: none;
  color:var(--c9-f);
  padding: 10px;
  border: 0px;
  outline: none;
  font-size: 1.4rem;
}

.toolbar .btn{
    top:5px;
  white-space: nowrap;
}
.table {
    overflow: auto;
    white-space: nowrap;
    position: absolute;
    top:50px;
    left:0px;
    bottom:0px;
    right:0px;
    padding:0px;
}


</style>