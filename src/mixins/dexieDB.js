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

      myData.lastupdated = Date.now();
      await this.db[myTable].add(myData)
    },
    async UpdateRecord(myTable, myKey, myData) {
      myData.uuid = myKey;
      myData.lastupdated = Date.now();
      await this.db[myTable].put(JSON.parse(JSON.stringify(myData)))
    },
    async DeleteRecord(myTable, myKey) {
      await this.db[myTable].delete(myKey)
    },
    createDatabase() {


      this.db = new Dexie("wavemakerv4");

      //note this has to match in  dexieDB and db.js

      this.db.version(1).stores(this.DBstores);

      this.setupShadowDB();
    },

  },
  beforeMount() {
    this.windowID = this.uuid(); // each window generates a unique ID so it knows who is doing the emitting of changes

    this.createDatabase();
  },

}
export default dexieDB