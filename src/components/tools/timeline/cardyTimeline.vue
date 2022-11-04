<template>
<div class="toolbar">
      
      <input  v-model="$root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].title" placeholder="Board Name">
   <button @click="AddCard" class="btn" >

<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21M14 18H3V6H19V13H21V6C21 4.89 20.11 4 19 4H3C1.9 4 1 4.89 1 6V18C1 19.11 1.9 20 3 20H14V18Z" /></svg>    Add Card </button>
       <button @click="$root.$data.session.timeline.currentboard=null" class="btn" >

<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>
       Close </button>

      
</div>
  <div class="toolHolder">
<div class="timeline">
    <!--
  <div class="container" :class="chooseside(index)" v-for="(card, index) in $root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content" :key="index">
    <div class="content">
      <h2>2017</h2>
      <p>{{card}}.</p>
    </div>
  </div>
-->


        <draggable
        v-model="$root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content"
         group="timeline"
        ghost-class="ghost"
       tag="transition-group"
        :component-data="{ tag: 'div', name: 'flip-list', type: 'transition' }"
        @change="changecall"
        @start="dragging = true"
        @end="dragging = false"
      >
        
        <template #item="{ element, index }">

             <div class="container" :class="chooseside(index)" >
                 <div class="content">
          <CardViewer :cardid="element"  :allowlink="true"  :updateelement="$root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content"  @cardChange="updateme(val, element)"/>
          <button @click="deleteElement(index)">delete</button>
                 </div>
          </div>
  
        </template>
         
      </draggable>




</div>
</div>
</template>

<script>
import CardViewer from "@/components/universal/CardViewer";
import draggable from "vue-draggable-next";
export default {
  data(){
    return{
       drag: false
    }
  },
      components: {
      draggable,
CardViewer
  },
    methods: {
        AddCard(){
            console.log("addnig")
          let o = this.$root.uuid()
          this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content.push(o)
          this.$root.UpdateRecord("Timeline",this.$root.$data.session.timeline.currentboard, this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard]) 
          },
        chooseside(number){
            let dir ="right"
            if(number % 2 == 0){
                dir = "left"
            }
            return dir
        },
           updateme(n, el){
     console.log(n, el)
this.changecall()
  
    },
    deleteElement(index){
      this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content.splice(index, 1)
     this.changecall()
  
    },
      AddCol(){
          let o = {}
          o.title = ""
          o.cards = []
          this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content.push(o)
          this.changecall()
      },
      addCard(){
          console.log(this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content)
          let obj = {}
          obj.uuid = this.$root.uuid()
          this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content.push(obj)
          this.changecall()
      },
      changecall(){
          this.$root.UpdateRecord("Timeline",this.$root.$data.session.timeline.currentboard, this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard]) 
      }
    },
}
</script>

<style scoped>
.TransitionContainer {
  position: relative;
  padding: 0;
}

.itemContainer {
  width: 100%;

  box-sizing: border-box;
}

.flip-list-move {
  transition: all 0.5s;
}



.toolHolder{
    position: fixed;
    top:100px;
    bottom: 0px;
    left:0px;
    right:0px;
    overflow: auto;
}

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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}




/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -12px;
  background-color: white;
  border: 4px solid #FF9F55;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: 0;
}

/* Place the container to the right */
.right {
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -12px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

/* Full-width containers */
  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

/* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

/* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 15px;
  }

/* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>
