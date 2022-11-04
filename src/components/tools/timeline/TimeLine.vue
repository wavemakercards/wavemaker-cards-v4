<template>
<div id="line"></div>
<div class="toolbar">
      
      <input  v-model="$root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].title" placeholder="Board Name">
   <button @click="AddCard" class="addColBtn" >

<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21M14 18H3V6H19V13H21V6C21 4.89 20.11 4 19 4H3C1.9 4 1 4.89 1 6V18C1 19.11 1.9 20 3 20H14V18Z" /></svg>
</button>
    
    
    

      
</div>
  <div class="toolHolder">
<div class="timelinebody">
  <ul class="timeline" id="timelineSortable" group="tl" >

  <draggable v-for="(element, index ) in $root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content" :key="index">

<li>
  <div class="timeline-badge handle" title="Click here to add a card above this one">
   <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M21 11.11V5C21 3.9 20.11 3 19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.11C12.37 22.24 14.09 23 16 23C19.87 23 23 19.87 23 16C23 14.09 22.24 12.37 21 11.11M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M5 19V5H7V7H17V5H19V9.68C18.09 9.25 17.08 9 16 9C12.13 9 9 12.13 9 16C9 17.08 9.25 18.09 9.68 19H5M16 21C13.24 21 11 18.76 11 16S13.24 11 16 11 21 13.24 21 16 18.76 21 16 21M16.5 16.25L19.36 17.94L18.61 19.16L15 17V12H16.5V16.25Z" />
</svg>
   
   </div>
  <div class="timeline-panel timelinecard">
   <button @click="deleteElement(index)" class="clearInterfaceIconButton delBtn">
<svg viewBox="0 0 24 24" data-v-b51eb58c=""><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" data-v-b51eb58c=""></path></svg>
   </button>
        <input class="formitem" v-model="element.title" />
        <textarea class="formitem" v-model="element.content"></textarea>
  </div>
</li>
 
  </draggable>

  </ul>

</div>




<!--
<div class="timeline">

<ul>
<draggable
        item-key="index"
        tag="transition-group"
        :component-data="{ tag: 'div', name: 'flip-list', type: 'transition' }"
        v-model="$root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <li v-for="(element, index ) in $root.$data.shadowDB.Timeline[$root.$data.session.timeline.currentboard].content" :key="index">
   
    <div  class="timelinecard" >
        <button @click="deleteElement(index)">delete</button>
        <input class="formitem" v-model="element.title" />
        <textarea class="formitem" v-model="element.content"></textarea>
   
          </div>
      </li>
      
     
</draggable>
</ul>

</div>
</div>

-->
</div>
</template>

<script>
/*eslint-disable*/
import { VueDraggableNext } from "vue-draggable-next";
export default {
  data(){
    return{
       drag: false,
       order: 7,
    }
  },  
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
      components: {
      draggable: VueDraggableNext
  },
    methods: {
        AddCard(){
            console.log("addnig")
          let o = {}
          o.title =""
          o.content = ""
          o.uuid = this.$root.uuid()
          this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard].content.push(o)
          this.$root.UpdateRecord("Timeline",this.$root.$data.session.timeline.currentboard, this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.currentboard]) 
          },
        chooseside(number){
            let dir ="right_content"
            if(number % 2 == 0){
                dir = "left_content"
            }
            return dir
        },
           updateme(n, el){
     console.log(n, el)
this.changecall()
  
    },
    deleteElement(index){
      if(!confirm("Do you want to delete this card?")){
        return false
      }
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

.addColBtn {
  height: 40px;
  border-radius: 0px;
  border: 0px;
  cursor: pointer;
  height: 40px;
  background-color: var(--accent);
}
.addColBtn svg {
  fill: var(--accent-f);
}
.addColBtn:active, .addColBtn:hover,
 .addColBtntton:focus {
  background-color: var(--success);
}

.addColBtn:active svg, .addColBtn:hover svg,
 .addColBtntton:focus svg {
  fill: var(--success-f);
}

/************************* */
.toolHolder{
    position: fixed;
    top:80px;
    bottom: 0px;
    left:0px;
    right:0px;
    overflow: auto;
}
.toolbar{
  position: relative;
  display: flex; 
    background-color: var(--c10);
    color: var(--c10-f);
    height:40px;
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

.timelinecard{
  background-color: #fff;
  position: relative;
  min-height: 200px;
  max-width: 400px;
}

.delBtn{
  display:none;
  position:absolute;
  top:5px;
  right:10px;
  background-color: var(--danger);
}
.delBtn svg{
  width:15px;
  height:15px;
}

.timelinecard:focus-within >.delBtn{
  display: block;
}

.timeline {
    list-style: none;
    padding: 20px 0 20px;
    position: relative;
    min-height: 250px;
    padding-left:50px;
    padding-right:50px;
    margin:0 auto;
    max-width:1000px;
  }

  .timeline:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: #cccccc;
    left: 50%;
    margin-left: -1.5px;
  }

  .timeline li {
    margin-bottom: 20px;
    position: relative;
  }

  .timeline li:before,
  .timeline li:after {
    content: " ";
    display: table;
  }

  .timeline li:after {
    clear: both;
  }

  .timeline li:before,
  .timeline li:after {
    content: " ";
    display: table;
  }

  .timeline>li:after {
    clear: both;
  }

  .timeline li .timeline-panel {
    width: 47%;
    float: left;
    border: 1px solid #d4d4d4;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  }

  .timeline li .timeline-panel:before {
    position: absolute;
    top: 26px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 15px solid #ccc;
    border-right: 0 solid #ccc;
    border-bottom: 15px solid transparent;
    content: " ";
  }

  .timeline li .timeline-panel:after {
    position: absolute;
    top: 27px;
    right: -14px;
    display: inline-block;
    border-top: 14px solid transparent;
    border-left: 14px solid #fff;
    border-right: 0 solid #fff;
    border-bottom: 14px solid transparent;
    content: " ";
  }

  .timeline li .timeline-badge {
    color: #fff;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 1.4em;
    text-align: center;
    position: absolute;
    top: 16px;
    left: 50%;
    margin-left: -25px;
    background-color: var(--primary);
    z-index: 100;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
  }
.timeline-badge svg{
  margin-top:12px;
  fill:var(--primary-f);
}
  .timeline li.timeline-inverted .timeline-panel {
    float: right;
  }

  .timeline li.timeline-inverted .timeline-panel:before {
    border-left-width: 0;
    border-right-width: 15px;
    left: -15px;
    right: auto;
  }

  .timeline li.timeline-inverted .timeline-panel:after {
    border-left-width: 0;
    border-right-width: 14px;
    left: -14px;
    right: auto;
  }

  /*Odd numbers flipping by Iain*/
  .timeline li:nth-child(odd) .timeline-panel {
    float: right;
  }

  .timeline li:nth-child(odd) .deleteevent {
    right: 0px;
    left: auto;
  }

  .timeline li:nth-child(odd) .timeline-panel:before {
    border-left-width: 0;
    border-right-width: 15px;
    left: -15px;
    right: auto;
  }

  .timeline li:nth-child(odd) .timeline-panel:after {
    border-left-width: 0;
    border-right-width: 14px;
    left: -14px;
    right: auto;
  }

</style>
