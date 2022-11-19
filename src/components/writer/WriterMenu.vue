<template>
  <div id="ToolHome" v-if="!$root.session.writer.selected">
    <div class="wavemaker_info_box">
      <table style="width: 100%">
        <tr>
          <td>
            <h1>{{ this.$root.setlang.tools.writer }}</h1>
          </td>
          <td style="width: 50px">
            <button @click="addItem" class="interfaceBtn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
              </svg>
            </button>
          </td>
        </tr>
      </table>

      <hr />

      <table style="width: 100%">
        <tr v-for="(item, index) in toollist" :key="index">
          <td>
            <div class="title">{{ item.title }}</div>

            <div class="author">{{ item.description }}</div>
            <i> <br /> {{ $root.niceDate(item.lastupdated) }} </i>
          </td>
          <td style="width: 50px">
            <button @click="setLiveQuery(item)" class="interfaceBtn">
              <svg viewBox="0 0 24 24">
                <path
                  d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" />
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
      </table>
    </div>
  </div>

  <Writer v-if="$root.session.writer.selected" />
</template>

<script>

import Writer from "./Writer.vue";
export default {
  name: "WriterHome",
  components: {
    Writer,
  },
  data() {
    return {
      toollist: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Writer.toArray())),
    };
  },
  methods: {
    addItem() {
      let obj = {};
      obj.title = '';
      obj.description = '';
      obj.files = [];
      obj.uuid = this.$root.uuid(); // genertate your own UUID so thta you can update the   db
      this.$root.AddRecord("Writer", obj);
      this.$root.session.writer.selected = obj
    },
    setLiveQuery(item) {
      this.$root.session.writer.selected = this.$root.useObservable(this.$root.liveQuery(() => this.$root.db.Writer.get(item.uuid)))
    },
    deleteItem(item) {
      this.$swal(
        {
          title: 'Are you sure?',
          text: "You won't be able to undo this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.recursiveDelete(item.files)
            this.$root.DeleteRecord("Writer", item.uuid)

            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        );
    },
    recursiveDelete(list) {
      /// TODO : uhhh as we have the writer ID this could be done with that?? Why did I do this?
      list.forEach(element => {
        if (element.children.length) {
          this.recursiveDelete(element.children)
        }
        this.$root.DeleteRecord("Files", element.uuid)
      })
    },
  },
  created() {
    if (!this.$root.session.writer) {
      this.$root.session.writer = {};
    }
  },
};
</script>

<style scoped>
#ToolHome {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: auto;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}
</style>
