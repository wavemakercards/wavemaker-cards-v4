import { db, databaseImport, databaseExport } from "@/db.js"
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
const dexieDB = {
  data() {
    return {
      db,
      useObservable,
      liveQuery,
      databaseImport,
      databaseExport,
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
    },
    clearDatabase() {
      this.$root.db.Settings.clear()
      this.$root.db.Writer.clear()
      this.$root.db.Cards.clear()
      this.$root.db.Files.clear()
      this.$root.db.Mindmap.clear()
      this.$root.db.ImageLibrary.clear()
      this.$root.db.Gridplanner.clear()
      this.$root.db.Snowflake.clear()
      this.$root.db.Timeline.clear()
    },
    async getSettings(uuid) {
      if (!uuid) {
        let arr = await this.$root.db.Settings.toArray()
        uuid = arr[0].uuid
      }

      this.$root.session.settings = this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Settings.get(uuid)))
    }
  },
  beforeMount() {
    this.windowID = this.uuid(); // each window generates a unique ID so it knows who is doing the emitting of changes
  },

}
export default dexieDB