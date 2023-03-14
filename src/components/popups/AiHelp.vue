<template>
  <div style="text-align: left">
    <h1>AI helper</h1>
    <div class="container">
      <div class="item item-center">
      <div v-if="!apiKey">
      You need to provide an API Key
       </div>
        <input class="formcontrol" type="text" v-model="apiKey"/>
    <button @click="saveKey()">Save</button>
      <div v-if="apiKey">
<input class="formcontrol" type="text" v-model="question" />
<button @click="sendRequest()">Send Request</button>
<pre>
result here
</pre>
</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPopup",
  data() {
    return {
      question: null,
      response: null,
      apiKey : null
    };
  },
  methods: {
   saveKey(){
   localStorage.setItem('ChatGPKey', this.apiKey);
   },
    sendRequest(){
        let d = {}
        d.apikey = this.apiKey;
        d.question = this.question;

        console.log(d)

   fetch("https://wavemaker.co.uk/ai/index.php", {
     method: "POST",
     mode : "no-cors",
      cache: "no-cache",
     credentials: "omit",
     headers: {
      'Content-Type': 'application/json'
      },
     body: JSON.stringify(d)
   }).then((response) => response.json() ).then((data) => {
    console.log("Success:", data);
   }).catch((error) => {
    console.error("Error:", error);
   });



   }
  },
  mounted() {
      if(localStorage.getItem('ChatGPKey')){
      this.apiKey=localStorage.getItem('ChatGPKey')
      }
   
  },
};
</script>

<style scoped>
.formcontrol{
width:100%;
background-color: #fff;
color: #000;
padding: 10px;
}
</style>
