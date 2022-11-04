const apitool = {
    data() {
      return { 
        Save_Timer :null,
        api_credentials :{
            email : "",
            password : "",
            loggedin : false,
            loading:false,
            error : ""
          }
       }
    },
    methods: {
      api_login() {
        this.apiCall({});
      },
      api_logout() {
        this.api_credentials = {
          email: "",
          password: "",
          loggedin: false,
        };
        // empty the stored credentials
        localStorage.setItem("wm_user", JSON.stringify(this.api_credentials));
      },

        async api_get() {
            console.log("get")
            let result = JSON.parse(await this.apiCall({ mode: "get" }));
            console.log("Resuly -> ", result);
            if (result.success) {
             let d = JSON.parse(result.success);
              this.$root.importDB(d);
                console.log(d)
                this.$root.$data.popup.name = null
                this.$root.$data.session = {}

                return(result)
              
        } else {
            this.$root.$data.api_credentials.error = result.error
              console.log("error getting");
            }
          },
          async api_set() {
            if(!this.$root.$data.api_credentials.loggedin){
              console.log("Not logged in")
              return false
            }
          
          /*  this.$root.shadowDB.Settings[
              Object.keys(this.$root.shadowDB.Settings)[0]
            ].uploaded = Date();
            */
            let obj = {};
            obj.mode = "put";
            obj.data = this.$root.exportDB();
            let result = JSON.parse(await this.apiCall(obj));
            console.log(result.success)
            if (result.success) {
              console.log("cool");
              this.$root.$data.popup.name = null
            }else{
                this.$root.$data.api_credentials.error = "Problem Uploading"
            }
            return(result)
          },
          async apiCall(postObj) {
            this.$root.$data.api_credentials.loading = true
            this.$root.$data.api_credentials.error=""
        
            postObj.email = this.$root.$data.api_credentials.email;
            postObj.password = this.$root.$data.api_credentials.password;
            
            console.log("calling", postObj)

            let fd = new FormData();
            Object.keys(postObj).forEach((element) => {
              fd.append(element, postObj[element]);
            });
            return await fetch("https://wavemaker.co.uk/api/", {
              method: "POST",
              cache: "no-cache",
              body: fd,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("res ->", res)
                if (res.loggedin === "true") {
                  localStorage.setItem("wm_user", JSON.stringify(res));
                  this.$root.$data.api_credentials.loggedin = true;
                }else{
                  this.$root.$data.api_credentials.loggedin = false;
                }
                this.$root.$data.api_credentials.loading = false
                this.$root.$data.api_credentials.error = res.error
                return JSON.stringify(res);
              })
              .catch((error) => {
                this.$root.$data.api_credentials.loading = false
                console.log(error);
              });
          },
         async AutoSave(){
          if(this.Save_Timer){
            clearTimeout(this.Save_Timer);
            console.log("autosave Fired")
            await this.api_set() ;
          }
           // this.Save_Timer = setTimeout(()=>{this.AutoSave()}, (1000));
          }
    },
    mounted(){
      const userdata = JSON.parse(localStorage.getItem("wm_user"));
      if (userdata) {
        this.api_credentials = userdata;
      }
      // TODO : Autosave tool
   //this.AutoSave()  // not ready for this yet
    }
}
export default apitool