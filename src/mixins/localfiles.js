const localFiles = {
    data() {
      return { 
        myname : "Iain"
       }
    },
    methods: {
      writename() {
        console.log(this.myname)
       }
    }
}
export default localFiles