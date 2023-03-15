<template>
  <div style="text-align: left;">
    <h1><svg style="height: 2em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-65511fdb=""><title data-v-65511fdb="">robot</title><path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" data-v-65511fdb=""></path></svg> OpenAI Assistant (botty)</h1>
    <div class="container">
      <div class="item item-center">
        <div v-if="!loading">
        
      
        <div v-if="!apikey">
          You need to provide an API Key   - need help? look here <a  href="https://wavemaker.co.uk/blog/getting-started-with-the-open-ai-bot/" target="_blank">Click Here for info</a> <br /><br />
   
        </div>
        <button class="interfaceBtn"   @click="showkey=!showkey">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>key</title><path d="M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7 14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z" /></svg>
          Show OpenAi Api Key</button>
        <table style="width:100%" v-if="showkey">
          <tr>
            <td style="width:75%"><input style="width:100%" class="formInput" type="text" v-model="apikey" /></td>
            <td><button class="interfaceBtn" style="width:100%" @click="saveKey()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
              Save</button></td>
          </tr>
        </table>
        
        
        <div v-if="apikey">

          <h1>How can I help you today?</h1>
          <textarea  style="height:auto" class="formInput" type="text" v-model="question"  rows="4"/>
          <label>Set a token limit for this request</label>
          <input type="number" class="formInput"  v-model="maxtokens" />
          <button class="interfaceBtn" @click="sendRequest()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>robot-happy</title><path d="M22 14H21C21 10.13 17.87 7 14 7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.11 2 12 2S10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H10C6.13 7 3 10.13 3 14H2C1.45 14 1 14.45 1 15V18C1 18.55 1.45 19 2 19H3V20C3 21.11 3.9 22 5 22H19C20.11 22 21 21.11 21 20V19H22C22.55 19 23 18.55 23 18V15C23 14.45 22.55 14 22 14M9.79 16.5C9.4 15.62 8.53 15 7.5 15S5.6 15.62 5.21 16.5C5.08 16.19 5 15.86 5 15.5C5 14.12 6.12 13 7.5 13S10 14.12 10 15.5C10 15.86 9.92 16.19 9.79 16.5M18.79 16.5C18.4 15.62 17.5 15 16.5 15S14.6 15.62 14.21 16.5C14.08 16.19 14 15.86 14 15.5C14 14.12 15.12 13 16.5 13S19 14.12 19 15.5C19 15.86 18.92 16.19 18.79 16.5Z" /></svg> Send Request</button>
          <div>
            result here
            <p v-for="(p, i) in this.response" :key="i">
              {{ p.text }}
            </p>
          </div>
        </div>
      </div>
<div v-if="loading">
<div class="loader">
  <svg style="max-width:150px; margin: 0 auto;" version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
 <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>

<h3>
  Open Ai is doing it's thing
</h3>

</div>
</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPopup',
  data() {
    return {
      showkey :false,
      question: null,
      response: null,
      apikey: null,
      maxtokens: 50,
      loading:false
    }
  },
  methods: {
    saveKey() {
      localStorage.setItem('ChatGPKey', this.apikey)
    },
    sendRequest() {
      this.loading = true;
      var formData = new FormData()
      formData.append('apikey', this.apikey)
      formData.append('question', this.question)
      formData.append('maxtokens', this.maxtokens)

      fetch('https://wavemaker.co.uk/ai/index.php', {
        method: 'POST', // or 'PUT'
        cache: 'no-cache',

        body: formData,
      }).then((response) => {
        if (response.status !== 200) {
          console.log(response)
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status,
          )
          this.loading = false;
          return
        }
        console.log(response)
        // Examine the text in the response
        response.text().then((data) => {
          let o = JSON.parse(data)
          console.log(o)
          this.response = o.choices
          this.loading = false
          console.log(' >>>>>>>>>', data)
        })
      })
    },
  },
  mounted() {
    if (localStorage.getItem('ChatGPKey')) {
      this.apikey = localStorage.getItem('ChatGPKey')
    }
  },
}
</script>

<style scoped>
.formcontrol {

border:0px;
  background-color: #fff;
  color: #000;

}

.loader{
  padding:40px;
 text-align: center;
}
.linker{
  color: #fff;
}
</style>
