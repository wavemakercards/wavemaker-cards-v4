import db from "@/db.js"
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
const dexieDB = {
  data() {
    return {
      db,
      useObservable,
      liveQuery,
      windowID: null
    }
  },
  methods: {
    async getImage(uuid) {
      return await this.$root.db.ImageLibrary.get(uuid)
    },
    async AddRecord(myTable, myData) {
      myData.lastupdated = Date.now();
      return await this.db[myTable].add(myData)
    },
    async UpdateRecord(myTable, myKey, myData) {
      //console.log("updating", myTable, myKey, myData)
      myData.uuid = myKey;
      myData.lastupdated = Date.now();
      return await this.db[myTable].put(JSON.parse(JSON.stringify(myData)))
    },
    async DeleteRecord(myTable, myKey) {
      return await this.db[myTable].delete(myKey)
    }
  },
  beforeMount() {
    this.windowID = this.uuid(); // each window generates a unique ID so it knows who is doing the emitting of changes
  },

}
export default dexieDB