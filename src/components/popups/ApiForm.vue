<template>

<div v-if="$root.$data.api_credentials.loading">
  <svg class="wavemakerLoadingIcon" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
</div>

<div v-if="!$root.$data.api_credentials.loading" class="wavemakerForm">

<div v-if="!$root.$data.api_credentials.loggedin">
  <h1>Log In</h1>
  <label>email</label>
  <input type="email" v-model="$root.$data.api_credentials.email" class="formInput" >
  <label>Password</label>
  <input type="password" v-model="$root.$data.api_credentials.password" class="formInput">

  <button @click="$root.api_login()" class="formButton">Log IN</button>
    <div>{{$root.$data.api_credentials.error}}</div>
</div>
<div v-if="$root.$data.api_credentials.loggedin">
  <button @click="$root.api_logout()"  class="formButton">Log Out</button>



  <button @click="get()"  class="formButton">Get File</button>
  <button @click="set()" class="formButton" >Set File</button>

</div>
</div>
</template>

<script>
export default {
  name: 'ApiForm',
  methods:{
    async get(){
        let r= await this.$root.api_get()
        console.log("GET -> ", r )
    },
    async set(){
        let r = await this.$root.api_set()
        console.log("SET -> " ,r)
    }

  }

}
</script>

