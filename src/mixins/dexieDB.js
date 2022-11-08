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
    AddRecord(myTable, myData) {
      console.log("Add", myTable, myData);
      myData.lastupdated = Date.now();
      this.db.transaction("rw", myTable, (tx) => {
        tx.source = this.windowID; //TODO : this stopped working see hack workaround
        this.AllowNextTransaction = false; // This is the Hack
        // this.shadowDB[myTable][myData.uuid] =  myData;
        this.db[myTable].add(myData);
      });
    },
    UpdateRecord(myTable, myKey, myData) {
      myData.uuid = myKey;
      myData.lastupdated = Date.now();
      this.db
        .transaction("rw", myTable, (tx) => {
          tx.source = this.windowID; //TODO : this stopped working see hack workaround
          this.AllowNextTransaction = false; // This is the Hack
          //this.shadowDB[myTable][myKey] =  myData;
          this.db[myTable].put(JSON.parse(JSON.stringify(myData))); // this clears upa  bug where a proxy is passed
        })
        .then(console.log("Update Complete"));
    },
    DeleteRecord(myTable, myKey) {
      this.db
        .transaction("rw", myTable, (tx) => {
          console.log("TX", tx);

          tx.source = this.windowID; //TODO : this stopped working see hack workaround
          this.AllowNextTransaction = false; // This is the Hack
          this.db[myTable].delete(myKey);
        })
        .then(console.log("Delete Complete"));
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
  mounted() {
    this.db.on("changes", (changes) => {
      console.log("allow change", this.AllowNextTransaction, changes);
      if (this.AllowNextTransaction) {
        // TODO : Fix this properly
        changes.forEach((change) => {
          //        if (change.source != this.windowID) {
          // using transactions allows me to filter updates out of the window that sent them (just causes lag occasionanly)
          switch (change.type) {
            case 1: // CREATED
              this.shadowDB[change.table][change.key] = change.obj; // can't just ASSIGN as it wont be reactive so set it using VUE
              break;
            case 2: // UPDATED
              this.shadowDB[change.table][change.key] = change.obj;
              break;
            case 3: // DELETED
              delete this.shadowDB[change.table][change.key];
              break;
          }
        });
      }
      this.AllowNextTransaction = true;
    });

  }
}
export default dexieDB