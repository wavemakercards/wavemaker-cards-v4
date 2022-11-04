const shadowDatabase = {
    data() {
      return { 
        shadowDB: {},
        dbloaded : false
       }
    },
    methods: {
      async setupShadowDB() {
        this.shadowDB = {};
        let dbcounter = 0;
        let dblimit = 0;
        await this.db.tables.forEach((table) => {
          if (table.name.charAt(0) != "_") {
            // avoid the system tables
            dblimit++;
            this.shadowDB[table.name] = {}; // can't just ASSIGN as it wont be reactive so set it using VUE ** it does in vue3 apparently!
            this.db[table.name]
              .each((r) => {
                this.shadowDB[table.name][r.uuid] = r;
              })
              .then(() => {
                dbcounter++;
                if (dbcounter === dblimit) {
                  this.dbloaded = true;
                }
              });
          }
        });
      }
    },
    mounted(){
     this.setupShadowDB()
    }
}
export default shadowDatabase