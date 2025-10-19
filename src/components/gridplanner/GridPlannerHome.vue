<template>
  <div id="ToolHome" v-if="!$root.session.gridplanner.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td>
            <h1>{{ this.$root.setlang.tools.gridplanner }}</h1>
          </td>
          <td style="width: 50px">
            <button @click="showaddform = !showaddform" class="interfaceBtn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M18,14H20V17H23V19H20V22H18V19H15V17H18V14M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" />
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="showaddform">
        <hr />
        <input type="text" v-model="title" :placeholder="this.$root.setlang.tools.name" class="formInput" />
        <!--
  <input type="text" v-model="description" :placeholder="this.$root.setlang.tools.description"
          class="formInput" />
        -->

        <div style="text-align: right">
          <button @click="addItem" class="interfaceBtn">
            <svg viewBox="0 0 24 24">
              <path
                d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </button>
        </div>
      </div>
      <hr />

      <table style="width: 100%" v-if="!showaddform">
        <tbody>
        <tr v-for="(item, index) in Gridplanners" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>
            <!--
     <div class="author">{{ item.description }}</div>
-->

            <i> <br /> {{ $root.niceDate(item.lastupdated) }} </i>
          </td>
          <td style="width: 50px">
            <button @click="chooseItem(item)" class="interfaceBtn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
              </svg>
            </button>
          </td>
          <td style="width: 50px">
            <button @click="deleteItem(item)" class="interfaceBtn deleteBtn">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="$root.session.gridplanner.selected">
    <Gridplanner />

  </div>
</template>

<script>
import Gridplanner from "./GridPlanner.vue"
export default {
  name: "GridPlannerHome",
  components: {
    Gridplanner
  },
  data() {
    return {
      title: null,
      description: null,
      showaddform: false,
      Gridplanners: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Gridplanner.toArray())),
    };
  },
  methods: {
    deleteItem(item) {
      this.$swal(
        {
          title: this.$root.setlang.confirmmodal.confirmdelete,
          text: this.$root.setlang.confirmmodal.noundo,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$root.setlang.confirmmodal.confirmbtn,
          cancelButtonText: this.$root.setlang.confirmmodal.cancelbtn
        }).then((result) => {
          if (result.isConfirmed) {


            this.$root.DeleteRecord("Gridplanner", item.uuid)

            this.$swal(
              this.$root.setlang.confirmmodal.success,
              this.$root.setlang.confirmmodal.successfeedback,
              'success'
            )
          }
        }
        );
    },
    chooseItem(item) {
      this.$root.session.gridplanner.selected = this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Gridplanner.get(item.uuid)))
    },
    addItem() {
      if (!this.title) {
        alert(this.$root.setlang.tools.warn);
        return false;
      }
      let obj = {};
      obj.title = this.title;
      obj.description = this.description;
      obj.content = { headers: [], rows: [] }
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the shadow db
      this.$root.AddRecord("Gridplanner", obj);
      this.title = "";
      this.description = "";
      this.showaddform = false;
    },
  },
  created() {
    if (!this.$root.session.gridplanner) {
      this.$root.session.gridplanner = {};
    }
  },
};
</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: bold;
}

td {
  padding: 10px;
}
</style>
