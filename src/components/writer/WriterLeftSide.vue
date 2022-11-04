<template>
  <div class="menu" v-bind:class="$root.$data.lhspin ? 'lhspinned' : ''">
    <!--<div class="title">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </div>
    -->
    <button class="pinBtn" @click="$root.$data.lhspin = !$root.$data.lhspin">
      <svg
        style="width: 18px; height: 18px"
        viewBox="0 0 24 24"
        v-if="$root.$data.lhspin"
      >
        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
      </svg>

      <svg
        style="width: 18px; height: px"
        viewBox="0 0 24 24"
        v-if="!$root.$data.lhspin"
      >
        <path
          d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z"
        />
      </svg>
    </button>
    <div class="scrollpanel">

      <button class="settingsBtn" style="border:0; outline:none" @click="this.$root.$data.session.writer.file = null" > 
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M12 19C12 20.08 12.25 21.09 12.68 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V12.08C19.67 12.03 19.34 12 19 12C15.13 12 12 15.13 12 19M23.8 20.4C23.9 20.4 23.9 20.5 23.8 20.6L22.8 22.3C22.7 22.4 22.6 22.4 22.5 22.4L21.3 22C21 22.2 20.8 22.3 20.5 22.5L20.3 23.8C20.3 23.9 20.2 24 20.1 24H18.1C18 24 17.9 23.9 17.8 23.8L17.6 22.5C17.3 22.4 17 22.2 16.8 22L15.6 22.5C15.5 22.5 15.4 22.5 15.3 22.4L14.3 20.7C14.2 20.6 14.3 20.5 14.4 20.4L15.5 19.6V18.6L14.4 17.8C14.3 17.7 14.3 17.6 14.3 17.5L15.3 15.8C15.4 15.7 15.5 15.7 15.6 15.7L16.8 16.2C17.1 16 17.3 15.9 17.6 15.7L17.8 14.4C17.8 14.3 17.9 14.2 18.1 14.2H20.1C20.2 14.2 20.3 14.3 20.3 14.4L20.5 15.7C20.8 15.8 21.1 16 21.4 16.2L22.6 15.7C22.7 15.7 22.9 15.7 22.9 15.8L23.9 17.5C24 17.6 23.9 17.7 23.8 17.8L22.7 18.6V19.6L23.8 20.4M20.5 19C20.5 18.2 19.8 17.5 19 17.5S17.5 18.2 17.5 19 18.2 20.5 19 20.5 20.5 19.8 20.5 19Z" />
</svg>
      <div> Manuscript Settings</div>

  
        </button>

      
      <VueDraggableNext
        :list="$root.$data.shadowDB.Writer[$root.$data.session.writer.selected].files"
        tag="transition-group"
        handle=".handle"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
        @change="changelist"
      >
        <template v-for="(element, index) in $root.$data.shadowDB.Writer[$root.$data.session.writer.selected].files" :key="index">
          <div
            class="list-group-item"
            tabindex="0"
            :class="isSelected(element.uuid) ? 'chosen' : ''">


 <div @click="selectNode(element)" class="itemBox">
            <div class="itemTitle">
              <span class="handle">
                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                  <path
                    d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"
                  />
                </svg>
              </span>
              <div class="title">
              {{element.name}}
              </div>
       
            </div>
            <div class="itemText" >
             {{ previewText(element.content) }} 
            </div>
            <div class="miniwordcount">{{ element.wordcount }} words</div>
 </div>     
                   <button class="deleteIconButton" @click="deleteFile(index, element)"  tabindex="0"  >
<svg style="width:18px;height:18px" viewBox="0 0 24 24">
    <path  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
</svg>
          </button>
          </div>
        </template>
      </VueDraggableNext>
     
    </div>
     <div class="addbar">
        <button @click="addFile">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path  d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H13.81C13.28 21.09 13 20.05 13 19C13 18.67 13.03 18.33 13.08 18H6V16H13.81C14.27 15.2 14.91 14.5 15.68 14H6V12H18V13.08C18.33 13.03 18.67 13 19 13S19.67 13.03 20 13.08V8L14 2M13 9V3.5L18.5 9H13M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
</svg>
        </button>
      </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";


export default {
  name: "WriterLeftSide",
  display: "Transitions",
  order: 7,
  components: {
    VueDraggableNext,
  },
  data() {
    return {
      drag: false,
      pinme: false,
    };
  },
  methods: {
    previewText(str){
      if(str){
         str = str.replace(/(<([^>]+)>)/gi, " ");
         let app ="..."
         if(str.length<100){ app=""}
      return str.substring(0,75) + app
      }
    },
    changelist(){
      console.log("Changed")
         this.ListChanged() 
    },
    selectNode(element){
       this.$root.$data.session.writer.file = element
       /*
      if(this.$root.$data.session.writer.file && this.$root.$data.session.writer.file===element ){ 
        this.$root.$data.session.writer.file = null 
        }else {
          this.$root.$data.session.writer.file = element
          }
          */
    },
    deleteFile(index, element){
     if(confirm("delete this file?")){
       if(this.$root.$data.session.writer.file === element){
        this.$root.$data.session.writer.file = null
      }
      this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.splice(index,1)
     
      this.ListChanged();
     }
    },
      addFile() {
        let obj = JSON.parse(JSON.stringify(
          {
        type: "file",
        name: "New File",
        notes:[],
        content: null
      }
        ));
        obj.uuid = this.$root.uuid();
        
        if(this.$root.$data.session.writer.file){
            // file selected so put it after that one
            let i = this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.indexOf(this.$root.$data.session.writer.file)
             this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.splice(i+1,0,obj);
        }else{
        this.$root.$data.shadowDB.Writer[this.$root.$data.session.writer.selected].files.push(obj);
        }
        this.ListChanged();
  
    },
   ListChanged() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selected,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selected
        ]
      );
    },
           isSelected(id){
      if(this.$root.session.writer.file){
     if (this.$root.session.writer.file.uuid===id){
      return true
     }
      }
      return false
    },
  },
  computed: {
 
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style scoped>
.miniwordcount{
   font-weight:bold; 
   text-align:right;

}
.itemBox{
  padding-right:25px;
}
.settingsBtn{
  height:40px;
  width:100%;
  background-color:var(--writer-side-nav );
  color: var(--writer-side-nav-f );
  text-align: left;
  padding-left:40px;
  cursor:pointer;
}
.settingsBtn svg{
  position: absolute;
  left:5px;
  top:5px;
  fill :var(--writer-side-nav-f );
}
.settingsBtn:hover,
.settingsBtn:focus,
.settingsBtn:active{
 background-color:var(--button-hover);
  color: var(--button-hover-f);
}

.settingsBtn:hover svg,
.settingsBtn:focus svg,
.settingsBtn:active svg{
   fill : var(--button-hover-f)
}

.pinBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 0px;
  background: none;
  padding: 5px;
  cursor: pointer;
  width:40px;
  height:40px;
  background-color: var(--writer-side-nav );

}
.pinBtn svg {
  fill: var(--writer-side-nav-f);
}



.pinBtn:hover,
.pinBtn:active,
.pinBtn:focus {
   background-color:var(--button-hover);
  color: var(--button-hover-f);

}
.pinBtn:hover svg,
.pinBtn:active svg,
.pinBtn:focus svg {
  fill: var(--button-hover-f);
}

.itemTitle {
    position: relative;
  font-weight: bold;
  padding-left: 30px;
  padding-right:10px;
  margin-bottom: 10px;
}

.itemTitle .title{
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  border:0px;
  width:calc(100% -20px);
  outline: none;
  height:20px;
  margin:0px;

}

.itemTitle input{
  font-family: inherit;
  background-color: inherit;
  color: inherit;
  border:0px;
  width:100%;
}

.handle {
  position: absolute;
  left: 0px;
  top:-4px;
  margin-bottom: 5px;
  cursor: move;
}
.itemText {
  font-size: 0.9rem;
  color: inherit;
  font-style: italic;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right:10px;
 }



.button {
  margin-top: 35px;
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
.list-group {
  min-height: 20px;
}
.list-group-item {
  position: relative;
  display:block;
  cursor: pointer;
  padding: 5px;
  padding-top:10px;
  min-height: 40px;
  background-color: var(--writer-side-panels);
color: var(--writer-side-panels-f);
}

.list-group-item svg {
    fill:var(--writer-side-panels-f);
}

.list-group-item:hover,
.list-group-item:focus,
.list-group-item:active  {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.list-group-item:hover svg,
.list-group-item:focus svg,
.list-group-item:active svg{
   fill:var(--button-hover-f)
} 


.list-group-item:hover .deleteIconButton,
.list-group-item:focus .deleteIconButton,
.list-group-item:active .deleteIconButton  {
  display:block
}


.menu {
  font-weight: 100;
  background: var(--writer-side-panels );
  color: var(--writer-side-panels-f);
  width: 300px;
  height: 100%;
  padding: 0px;
  padding-right: 40px;
  padding-top: 0px;
  position: fixed;
  top: 50px;

  -webkit-box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
  left: -260px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.menu:hover,
.menu:focus,
.lhspinned {
  transform: translate3d(260px, 0, 0);
  animation-timing-function: 1s ease-in;
}



.scrollpanel {
  overflow-y: auto;
  position: absolute;
  top: 40px;
  bottom: 0px;
 width:100%;
  padding: 0px;
     background-color: inherit
}

.addbar{
  position:absolute;
  top:0px;
  background-color: var(--writer-side-nav );
   width: calc(100% - 40px);
   height:40px;
}
.addbar button{
  border: 0px;
  padding: 5px;
  cursor: pointer;
  width:40px;
  height:40px;
  background-color: var(--writer-side-nav);
  color: var(--writer-side-nav-f);
}
.addbar button svg {
  fill: var(--writer-side-nav-f);
}

.addbar button:hover,
.addbar button:active,
.addbar button:focus {
background-color: var(--button-hover);
color: var(--button-hover-f);
}
.addbar button:hover svg,
.addbar button:active svg,
.addbar button:focus svg {
  fill:  var(--button-hover-f);
}

.chosen{
  background-color: var(--accent);
  color: var(--accent-f);

}

.chosen>svg{
  fill: var(--accent-f);
}

</style>
