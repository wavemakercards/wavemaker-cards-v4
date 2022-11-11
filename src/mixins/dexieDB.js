import Dexie from "dexie";
import db, { databaseImport, databaseExport, DBstores } from "@/db.js"
import "dexie-observable";
const dexieDB = {
  data() {
    return {
      AllowNextTransaction: null,
      db,
      databaseImport,
      databaseExport,
      DBstores,
      windowID: null
    }
  },
  methods: {
    async getImage(uuid) {
      return await this.$root.db.ImageLibrary.get(uuid)
    },
    async AddRecord(myTable, myData) {
      console.log("Add", myTable, myData);
      myData.lastupdated = Date.now();
      await this.db[myTable].add(myData).then(r => console.log("Added", r));
    },
    async UpdateRecord(myTable, myKey, myData) {
      myData.uuid = myKey;
      myData.lastupdated = Date.now();
      await this.db[myTable].put(JSON.parse(JSON.stringify(myData))).then(r => console.log("Update Complete", r));
    },
    async DeleteRecord(myTable, myKey) {
      await this.db[myTable].delete(myKey).then(r => console.log("Delete Complete", r));
    },
    createDatabase() {


      this.db = new Dexie("wavemakerv4");

      //note this has to match in  dexieDB and db.js

      this.db.version(1).stores(this.DBstores);

      this.setupShadowDB();
    },
    /*  async DBimport(dataObj) {
      await this.db.import(dataObj)
      this.setupShadowDB();
      
      console.log(dataObj)
      Object.keys(dataObj).forEach((table) => {
        this.db[table]
          .clear()
          .then(() => {
            Object.keys(dataObj[table]).forEach((data) => {
              this.AddRecord(table, dataObj[table][data]);
            });
          })
          .then(() => {
            this.setupShadowDB();
          });
      });
    
    },
     DBexport() {  
  
     exportDB(this.db).then(response => {
      console.log(response);
  }).catch(e => {
      console.log("what",e);
  });
   
  
    // return JSON.stringify(this.shadowDB);
    }  */
  },
  beforeMount() {
    this.windowID = this.uuid(); // each window generates a unique ID so it knows who is doing the emitting of changes
    console.log(this.windowID);
    /*
    The Shadow DB is a Reactive Object copy of the database
    You  WRITE to the shadowDB and save it to the database and it will emit changes to all (other) windows
    This bit here simply constructs the shadowDB object from the database
    */
    this.createDatabase();
  },

}
export default dexieDB