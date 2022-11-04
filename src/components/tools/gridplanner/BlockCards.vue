<template>
    <draggable
        :list="cards"
        item-key="uuid"
        class="list-group"
         group="board"
        ghost-class="ghost"
        @change="changecall"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
             <div class="list-group-item" >
          <CardViewer :cardid="element.uuid"  :allowlink="true"  :updateelement="element"  @cardChange="updateme(val, element)"/>
          <button @click="deleteElement(element)">delete</button>
          </div>
        </template>
      </draggable>
        <button class="btn" @click="addCard()">
            <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" data-v-b51eb58c=""><path d="M13 11H16V13H13V16H11V13H8V11H11V8H13V11M22 5.5V16L16 22H5.5C3.6 22 2 20.4 2 18.5V5.5C2 3.6 3.6 2 5.5 2H18.5C20.4 2 22 3.6 22 5.5M20 5.8C20 4.8 19.2 4 18.2 4H5.8C4.8 4 4 4.8 4 5.8V18.3C4 19.3 4.8 20.1 5.8 20.1H15V18.6C15 16.7 16.6 15.1 18.5 15.1H20V5.8Z" data-v-b51eb58c=""></path></svg>
            Add Card</button>
</template>
<script>
/* eslint-disable */
import CardViewer from "@/components/universal/CardViewer.vue"
import draggable from "vue-draggable-next";
export default {
    props : {
        cards : Object,
        default : []
    },
    components : {
        draggable,
        CardViewer
    },
    methods :{
         addCard(){
          console.log(this.cards)
          let obj = {}
          obj.uuid = this.$root.uuid()
          this.cards.push(obj)
     this.changecall()
      },
      changecall(){
          this.$root.UpdateRecord("Gridplanner",this.$root.$data.session.gridplanner.currentboard, this.$root.$data.shadowDB.Gridplanner[this.$root.$data.session.gridplanner.currentboard]) 
      },
        deleteElement(element){
      element.uuid="DELETE"
      let deleteindex = this.cards.indexOf(element)
      this.cards.splice(deleteindex, 1)
   this.changecall()
    },
    }
}
</script>

<style scoped>

</style>