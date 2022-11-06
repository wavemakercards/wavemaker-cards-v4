<template>
  <div class="scroller">
  
      <template
        v-for="(flake, index) in $root.shadowDB.Snowflake[
          this.$root.session.snowflake.selected
        ].content"
        :key="index"
      >
        <div class="row">
        <div class="column" :style="!flake.open ? 'display:block' : ''" >
          <div class="card">


     <button class="delete-flake-button" @click="deleteFlake(index)">
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" />
</svg>
            </button>


            <button class="open-flake-button" @click="openflake(flake)">
        
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2M8,10V14H16V10H8M8,16V20H16V16H8M8,4V8H16V4H8Z" />
</svg>
            </button>
                <input class="title"  v-model="flake.title" :placeholder="this.$root.setlang.snowflake.title" @change="ListChanged" />
                  <SnowflakeEditor :snowFlake="flake" :modelValue="flake.text" @change="ListChanged" />
          </div>
        </div>
<Transition name="h-slide-fade" >
        <div class="column" v-if="flake.open">
          <div class="card">
            <input class="title"  v-model="flake.children[0].title " :placeholder="this.$root.setlang.snowflake.title" @change="ListChanged" />
               <SnowflakeEditor :snowFlake="flake.children[0]" :modelValue="flake.children[0].text" @change="ListChanged" />
          </div>

          <div class="card">
              <input class="title"  v-model="flake.children[1].title " :placeholder="this.$root.setlang.snowflake.title" @change="ListChanged" />
                 <SnowflakeEditor :snowFlake="flake.children[1]"  :modelValue="flake.children[1].text" @change="ListChanged" />
          </div>

          <div class="card">
               <input class="title"  v-model="flake.children[2].title " :placeholder="this.$root.setlang.snowflake.title" @change="ListChanged" />
                  <SnowflakeEditor :snowFlake="flake.children[2]" :modelValue="flake.children[2].text"  @change="ListChanged" />
          </div>

          <button class="replaceButton" @click="replace(flake,index)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M14.58,16.59L19.17,12L14.58,7.41L16,6L22,12L16,18L14.58,16.59M8.58,16.59L13.17,12L8.58,7.41L10,6L16,12L10,18L8.58,16.59M2.58,16.59L7.17,12L2.58,7.41L4,6L10,12L4,18L2.58,16.59Z" />
</svg>
          </button>
        </div>
</Transition>
        </div>
      </template>
    </div>
  
</template>

<script>
import SnowflakeEditor from "./SnowflakeEditor.vue"
export default {
  name: "SnowFlakeTool",
  components: {
    SnowflakeEditor
  },
  data() {
    return {};
  },
  methods: {
    openflake(flake){
      
      if(!flake.children.length){
      let obj = {};
      obj.level = flake.level+1;
      obj.content = "";
      obj.open = false;
      obj.children = [];
      obj.title = "";

        flake.children.push({...obj})
        flake.children.push({...obj})
        flake.children.push({...obj})


      }
      flake.open=!flake.open
       this.ListChanged()
      },
deleteFlake(index){
    if(confirm(this.$root.setlang.snowflake.deletewarn)){
      this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected].content.splice(index,1)
        this.startFlake()
        this.ListChanged()
    }
},
    replace(flake,index){
        if(confirm(this.$root.setlang.snowflake.replacewarn)){
          let f0={...flake.children[0]}
          let f1={...flake.children[1]}
          let f2={...flake.children[2]}

           
           // insert in reverse
            this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected].content.splice(index+1,0, f2)
             this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected].content.splice(index+1,0, f1)
                  this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected].content.splice(index+1,0, f0)

// delete the old one 
 this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected].content.splice(index,1)

           this.ListChanged()
           
        }
    },
       ListChanged() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Snowflake",
        this.$root.$data.session.snowflake.selected,
        this.$root.$data.shadowDB.Snowflake[
          this.$root.$data.session.snowflake.selected
        ]
      );
    },
    startFlake(){
       if (
      !this.$root.shadowDB.Snowflake[this.$root.session.snowflake.selected]
        .content.length
    ) {
      let obj = {};
      obj.title = "";
      obj.level = 0;
      obj.content = "";
      obj.open = false;
      obj.children = [];
      this.$root.shadowDB.Snowflake[
        this.$root.session.snowflake.selected
      ].content.push(obj);
    }
    }

  },
  mounted() {
   this.startFlake()
  },
};
</script>

<style scoped>
.scroller {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  overflow-y: scroll;
}
.card {
  position:relative;
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background-color: var(--paper);
  color: var(--paper-f);
  margin: 10px;
}
.card .title{
  background: none;
  color: inherit;
  outline: none;
  border: 0;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.4rem;
}
.row {
  margin:0 auto;
max-width:1000px;

}
.column {
  position: relative;
    width: 50%;
    display: inline-block;
    vertical-align: middle;
    padding:11px;
    margin:0 auto;
}

.open-flake-button{
   position: absolute;
  width: 40px;
  height: 40px;
  top : calc(50% - 20px);
  right: -20px;
  cursor:pointer;
  width:40px;
  height:40px;


}
.open-flake-button svg{
  width:24px;

}

.open-flake-button:hover,
.open-flake-button:focus,
.open-flake-button:active{
  background-color: var(--success);
}
.open-flake-button:hover svg,
.open-flake-button:focus svg,
.open-flake-button:active svg{

  fill: var(--success-f)
}

.replaceButton{
  position: absolute;
  width: 40px;
  height: 40px;
  top : calc(50% - 20px);
  right: -20px;
}

.delete-flake-button{
  cursor: pointer;
  border:0px;
  background: inherit;
  position: absolute;
  top:0px;
  right:0px;
}

.delete-flake-button:hover svg,
.delete-flake-button:active svg,
.delete-flake-button:focus svg{
  fill :var(--danger)
}
</style>
