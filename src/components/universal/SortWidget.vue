
<script>
import { ref } from 'vue';
export default {
  name: 'SortWidget',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data(){
    return {
        open : false
    }
  },
  methods:{
    togglebox(){
        console.log("toggle?")
        this.open=!this.open
    },
    changeMe(me){
        this.$emit('update:modelValue', me)
        this.togglebox()
    }
  }
}
</script>


<template>
  <details :open="open" >
  <summary class="sort-summary" @click.prevent="togglebox">
      <span class="label">
        <span v-if="modelValue === 'name-desc'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-alphabetical-descending-variant</title><path d="M15.75 19L12.5 22.25L9.25 19H15.75M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z" /></svg>
        </span>
        <span v-else-if="modelValue === 'name-asc'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-alphabetical-ascending-variant</title><path d="M9.25 5L12.5 1.75L15.75 5H9.25M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z" /></svg>
        </span>
        <span v-else-if="modelValue === 'lastupdated-desc'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-clock-ascending-outline</title><path d="M20 17H23L19 21L15 17H18V3H20V17M8 5C4.14 5 1 8.13 1 12C1 15.87 4.13 19 8 19C11.86 19 15 15.87 15 12C15 8.13 11.87 5 8 5M8 7.15C10.67 7.15 12.85 9.32 12.85 12C12.85 14.68 10.68 16.85 8 16.85C5.32 16.85 3.15 14.68 3.15 12C3.15 9.32 5.32 7.15 8 7.15M7 9V12.69L10.19 14.53L10.94 13.23L8.5 11.82V9" /></svg>
        </span>
        <span v-else-if="modelValue === 'lastupdated-asc'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-clock-descending-outline</title><path d="M18 7H15L19 3L23 7H20V21H18V7M8 5C4.14 5 1 8.13 1 12C1 15.87 4.13 19 8 19C11.86 19 15 15.87 15 12C15 8.13 11.87 5 8 5M8 7.15C10.67 7.15 12.85 9.32 12.85 12C12.85 14.68 10.68 16.85 8 16.85C5.32 16.85 3.15 14.68 3.15 12C3.15 9.32 5.32 7.15 8 7.15M7 9V12.69L10.19 14.53L10.94 13.23L8.5 11.82V9" /></svg>
        </span>
      </span>
    </summary>

    <div class="floater" role="radiogroup" aria-label="Sort type">
      <label class="label" ><input type="radio" class="myradio" value="name-desc" :checked="modelValue === 'name-desc'" @change="changeMe('name-desc')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-alphabetical-descending-variant</title><path d="M15.75 19L12.5 22.25L9.25 19H15.75M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z" /></svg>
      </label>
      <label class="label" ><input type="radio" class="myradio" value="name-asc" :checked="modelValue === 'name-asc'" @change="changeMe('name-asc')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-alphabetical-ascending-variant</title><path d="M9.25 5L12.5 1.75L15.75 5H9.25M8.89 14.3H6L5.28 17H2.91L6 7H9L12.13 17H9.67L8.89 14.3M6.33 12.68H8.56L7.93 10.56L7.67 9.59L7.42 8.63H7.39L7.17 9.6L6.93 10.58L6.33 12.68M13.05 17V15.74L17.8 8.97V8.91H13.5V7H20.73V8.34L16.09 15V15.08H20.8V17H13.05Z" /></svg>
      </label>
      <label class="label" ><input type="radio" class="myradio" value="lastupdated-desc" :checked="modelValue === 'lastupdated-desc'" @change="changeMe('lastupdated-desc')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-clock-ascending-outline</title><path d="M20 17H23L19 21L15 17H18V3H20V17M8 5C4.14 5 1 8.13 1 12C1 15.87 4.13 19 8 19C11.86 19 15 15.87 15 12C15 8.13 11.87 5 8 5M8 7.15C10.67 7.15 12.85 9.32 12.85 12C12.85 14.68 10.68 16.85 8 16.85C5.32 16.85 3.15 14.68 3.15 12C3.15 9.32 5.32 7.15 8 7.15M7 9V12.69L10.19 14.53L10.94 13.23L8.5 11.82V9" /></svg>
      </label>
      <label class="label" ><input type="radio" class="myradio" value="lastupdated-asc" :checked="modelValue === 'lastupdated-asc'" @change="changeMe('lastupdated-asc')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><title>sort-clock-descending-outline</title><path d="M18 7H15L19 3L23 7H20V21H18V7M8 5C4.14 5 1 8.13 1 12C1 15.87 4.13 19 8 19C11.86 19 15 15.87 15 12C15 8.13 11.87 5 8 5M8 7.15C10.67 7.15 12.85 9.32 12.85 12C12.85 14.68 10.68 16.85 8 16.85C5.32 16.85 3.15 14.68 3.15 12C3.15 9.32 5.32 7.15 8 7.15M7 9V12.69L10.19 14.53L10.94 13.23L8.5 11.82V9" /></svg>
      </label>
    </div>
  </details>
</template>





<style scoped>
details{
    width: 30px;
    background-color: var(--primary);
    color: var(--button-hover-f);
    fill: var(--button-hover-f);
    position: relative;
    border-radius: 5px;
    z-index: 99999999;
}

.floater{
    position: fixed;
    background-color: var(--primary);
    width: 30px;
        border-radius: 5px;
}
.label{
    display: flex; align-items: center;
    cursor: pointer;
    padding: 5px;
 border-radius: 5px;
    text-align: center;
    &:hover{
        background-color: #000;
        color: #fff;
        fill:#fff
    }
}
  .sort-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
  .myradio{
    display: none;
  }
</style>