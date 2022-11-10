<template>
 <VueDraggableNext
        :list="list"
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
        @change="ListChanged"
          :emptyInsertThreshold="50"
      >
        <template v-for="(element, index) in list" :key="index">
          <div
            class="list-group-item"
            tabindex="0"
           >


 <div @click="selectNode(element)" class="itemBox">
            <div class="itemTitle"  :class="isSelected(element.uuid) ? 'chosen' : ''">
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


<div style="padding-left:20px">
 <WriterNode :list="element.children"/>
</div>



          </div>
          

        </template>
      </VueDraggableNext>
</template>

<script>

import { VueDraggableNext } from "vue-draggable-next";
export default {
      name: "WriterNode",
      components: {
        VueDraggableNext,
      },
      props: ["list"], 
        data() {
    return {
      drag: false,
    };
  },
    computed: {
 
    dragOptions() {
      return {
       // animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods:{
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
     if(confirm(this.$root.setlang.writer.deletewarn)){
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
        name: this.$root.setlang.writer.newfile,
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
  }
}
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
/*
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
*/

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

