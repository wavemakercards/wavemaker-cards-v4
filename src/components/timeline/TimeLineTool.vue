<template>
<div class="scroller">
 <h1>{{this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].title}}<div>{{this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].description}}</div></h1>
 
  <div class="timeline">

     <VueDraggableNext
   :list="this.$root.$data.shadowDB.Timeline[this.$root.$data.session.timeline.selected].content"
        tag="ul"
        group="board"
                :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        handle=".handle"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
          :emptyInsertThreshold="90"
        @change="ListChanged"

      >
        <template v-for="(element, index) in this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].content" :key="index">
      <li>
          <div class="time ">
          <div class="handle">
           <svg style="width:18px;height:18px" viewBox="0 0 24 24">
    <path  d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
</svg>
</div>
           <input class="timeText" tabindex="1" placeholder="Date/Event" v-model="element.event">
        </div>
        <div class="content">
          <input class="title" placeholder="Event Title" tabindex="1" v-model="element.title">
          <p>
            <TimelineEditor v-model="element.text"  tabindex="1" />
          </p>
        </div>
      </li>
    </template>

</VueDraggableNext>

      <div style="clear:both;"></div>

  </div>

</div>
      <button @click="addTime" class="add-btn">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
</svg>
      </button>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TimelineEditor from "./TimelineEditor.vue"
export default {
  name: "TimeLineTool",
  components: {
    VueDraggableNext,
    TimelineEditor
  },
   computed:{
    dragOptions() {
      return {
        animation: 200,
        group: "Cards",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    return {
        drag: false
    };
  },
  methods: {
  addTime(){
    console.log("asdasd")
      let obj ={}
        obj.title = ""
        obj.text =""
        obj.event = ""
        this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].content.push(obj)
         this.ListChanged();
  },
    deleteTime(index){
     if(confirm("delete this event?")){
       this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].content.splice(index,1)
      this.ListChanged();
     }
    },
   ListChanged() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Timeline",
        this.$root.$data.session.timeline.selected,
        this.$root.$data.shadowDB.Timeline[
          this.$root.$data.session.timeline.selected
        ]
      );
    },
  },
  mounted(){
    if(!this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].content.length){
        let obj ={}
        obj.title = ""
        obj.text =""
        obj.event = ""
        this.$root.shadowDB.Timeline[this.$root.session.timeline.selected].content.push(obj)
    }
  }
};
</script>

<style scoped>
.handle{
  position:absolute;
  cursor: grabbing;
  background-color: var(--tl-date)
}
.handle svg{
  fill: var(--tl-date-f)
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: var(--hover-ghost);
}


.add-btn{
  position:absolute;
  bottom:5px;
  right:5px;
    border:0px;
  padding:10px;
  background-color: var(--button);
  color: var(--button-f);
  border-radius: 50%;
  width:50px;
  height:50px;
  padding:7px 0 5px 0px ;
  cursor:pointer
}

.add-btn svg{
  fill:var(--button-f)
}

.add-btn:hover,
.add-btn:active,
.add-btn:focus
{
    background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.add-btn:hover svg,
.add-btn:active svg,
.add-btn:focus svg {
    fill:var(--button-hover-f)
}


.scroller{
    position:absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    overflow-y :scroll;
}

h1{
  font-size:3rem;
  text-align:center;
}
h1 div{
    font-size: 1rem;
}
.timeline{
  position:relative;
  margin:0px auto;
  padding:40px 0;
  width:1000px;
  box-sizing:border-box;
}
.timeline:before{
  content:'';
  position:absolute;
  left:50%;
  width:2px;
  height:100%;
  background:var(--tl-bar)
}
.timeline ul{
  padding:0;
  margin:0;
}
.timeline ul li{
  list-style:none;
  position:relative;
  width:50%;
  padding:20px 40px;
  box-sizing:border-box;
}
.timeline ul li:nth-child(odd){
  float:left;
  text-align:right;
  clear:both;
}
.timeline ul li:nth-child(even){
  float:right;
  text-align:left;
  clear:both;
}
.content{
  padding-bottom:20px;
  background-color: var(--tl-card);
  color: var(--tl-card-f);
}
.timeline ul li:nth-child(odd):before
{
  content:'';
  position:absolute;
  width:10px;
  height:10px;
  top:24px;
  right:-6px;
  background: var(--tl-dot);
  border-radius:50%;
  box-shadow:0 0 0 3px var(--box-shadow);
}
.timeline ul li:nth-child(even):before
{
  content:'';
  position:absolute;
  width:10px;
  height:10px;
  top:24px;
  left:-4px;
  background:var(--tl-dot);
  border-radius:50%;
  box-shadow:0 0 0 3px var(--box-shadow);
}
.timeline ul li .title{
  padding:0;
  margin:0;
  color: inherit;
  font-weight:600;
  border:0px;
  background: none;
  outline:none;
  font-family: inherit;
  width:100%;
  padding:10px;
  border-bottom:1px solid var(--accent-f);
}
.timeline ul li:nth-child(odd) .title{
    text-align: inherit;
}


.timeline ul li p{
  margin:10px 0 0;
  padding:0;
}
.timeline ul li .time .timeText{
  margin:0;
  padding:0;
  padding-left:17px;
  font-size:14px;
  width:100%;
  border:0px;
  color:inherit;
  background-color: inherit;
  outline: none;
}

.timeline ul li:nth-child(even) .timeText{
    text-align: right;
    padding-right:17px;
    padding-left:0px;
}
.timeline ul li:nth-child(even) .time .handle
{
left:auto;
right:10px
}

.timeline ul li:nth-child(odd) .time .handle
{
left:10px;
right:auto
}

.timeline ul li:nth-child(odd) .time
{
  position:absolute;
  top:12px;
  left:calc(100% + 20px);
  width: 50%;
  margin:0;
  padding:8px 16px;
  background:var(--tl-date);
  color:var(--tl-date-f);
  border-radius:18px;
  box-shadow:0px 0px 5px 0px var(--box-shadow);
  text-align: center;
}
.timeline ul li:nth-child(even) .time
{
  position:absolute;
  top:12px;
   width: 50%;
  right:calc(100% + 20px);
  margin:0;
  padding:8px 16px;
  background:var(--tl-date);
  color:var(--tl-date-f);
  border-radius:18px;
  box-shadow:0px 0px 5px 0px var(--box-shadow);
  text-align: center;
}
@media(max-width:1000px)
{
  .timeline{
    width:100%;
  }
}
@media(max-width:767px){
  .timeline{
    width:100%;
    padding-bottom:0;
  }
  h1{
    font-size:2rem;
    text-align:center;
  }
  .timeline:before{
    left:20px;
    height:100%;
  }
  .timeline ul li:nth-child(odd),
  .timeline ul li:nth-child(even)
  {
    width:100%;
    text-align:left;
    padding-left:50px;
    padding-bottom:50px;
  }
  .timeline ul li:nth-child(odd):before,
  .timeline ul li:nth-child(even):before
  {
    top:-18px;
    left:16px;
  }
  .timeline ul li:nth-child(odd) .time,
  .timeline ul li:nth-child(even) .time{
    top:-30px;
    left:50px;
    right:inherit;
  }
  .timeline ul li .time .handle
{
left:10px !important;
right:auto !important
}
.timeline ul li .timeText{
    text-align: left !important;
    padding-left:17px !important;
    padding-right:0px !important;
}

}


</style>
