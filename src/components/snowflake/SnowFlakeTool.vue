<template>
  <div class="scroller">

    <template v-for="(flake, index) in this.$root.session.snowflake.selected.content" :key="index">
      <div id="toolbox">
        <input v-model="$root.session.snowflake.selected.title" class="titleinput" @change="updateDatabase" />


        <button @click="exportToManuscript" class="toolbutton">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              d="M9 12H18.8L16.3 9.5L17.7 8.1L22.6 13L17.7 17.9L16.3 16.5L18.8 14H9V12M21 17.4V20H3V6H21V8.6L23 10.6V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V15.4L21 17.4Z" />
          </svg>
        </button>
      </div>


      <div class="row">
        <div class="column" :style="!flake.open ? 'display:block' : ''">
          <div class="card">


            <button class="open-flake-button" @click="openflake(flake)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  d="M8,2H16A2,2 0 0,1 18,4V20A2,2 0 0,1 16,22H8A2,2 0 0,1 6,20V4A2,2 0 0,1 8,2M8,10V14H16V10H8M8,16V20H16V16H8M8,4V8H16V4H8Z" />
              </svg>
            </button>
            <input class="title" v-model="flake.title" :placeholder="this.$root.setlang.snowflake.title"
              @change="updateDatabase" />
            <MiniEditor :snowFlake="flake" v-model="flake.content" @updated="updateDatabase" />

            <button class="delete-flake-button" @click="deleteFlake(index)">
              <svg viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        </div>
        <Transition name="h-slide-fade">
          <div class="column" v-if="flake.open">
            <div class="card">
              <input class="title" v-model="flake.children[0].title" :placeholder="this.$root.setlang.snowflake.title"
                @change="updateDatabase" />
              <MiniEditor :snowFlake="flake.children[0]" v-model="flake.children[0].content"
                @updated="updateDatabase" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[1].title" :placeholder="this.$root.setlang.snowflake.title"
                @change="updateDatabase" />
              <MiniEditor :snowFlake="flake.children[1]" v-model="flake.children[1].content"
                @updated="updateDatabase" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[2].title" :placeholder="this.$root.setlang.snowflake.title"
                @change="updateDatabase" />
              <MiniEditor :snowFlake="flake.children[2]" v-model="flake.children[2].content"
                @updated="updateDatabase" />
            </div>

            <button class="replaceButton" @click="replace(flake, index)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  d="M14.58,16.59L19.17,12L14.58,7.41L16,6L22,12L16,18L14.58,16.59M8.58,16.59L13.17,12L8.58,7.41L10,6L16,12L10,18L8.58,16.59M2.58,16.59L7.17,12L2.58,7.41L4,6L10,12L4,18L2.58,16.59Z" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>
    </template>
  </div>

</template>

<script>
import MiniEditor from "@/components/universal/MiniEditor.vue"
export default {
  name: "SnowFlakeTool",
  components: {
    MiniEditor
  },
  data() {
    return {};
  },
  methods: {
    exportToManuscript() {
      //loop throught the timeline and add all the nodes to a writer object and create the files


      this.$swal(
        {
          title: this.$root.setlang.confirmmodal.confirmexport,
          text: this.$root.setlang.confirmmodal.exportmsg,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$root.setlang.confirmmodal.exportconfirmbtn,
          cancelButtonText: this.$root.setlang.confirmmodal.cancelbtn
        }).then((result) => {
          if (result.isConfirmed) {


            let newWriter = {}
            newWriter.uuid = this.$root.uuid()
            newWriter.title = this.$root.session.snowflake.selected.title
            newWriter.descripton = this.$root.session.snowflake.selected.description
            newWriter.files = []

            this.$root.session.snowflake.selected.content.forEach(tl => {
              console.log("SNOW >>>", tl)
              let uuid = this.$root.uuid()
              let newfile = {}
              newfile.writerid = newWriter.uuid
              newfile.title = tl.title
              newfile.content = tl.content
              newfile.notes = []
              newfile.uuid = uuid
              newfile.wordcount = this.$root.wordCounter(tl.content)

              this.$root.AddRecord("Files", newfile)


              let o = {}
              o.uuid = uuid
              o.open = false
              o.type = "file"
              o.children = []
              newWriter.files.push(o)

            })

            this.$root.AddRecord("Writer", newWriter)

            this.$swal(
              this.$root.setlang.confirmmodal.exportsuccess,
              this.$root.setlang.confirmmodal.exportsuccessfeedback,
              'success'
            )
          }
        }
        );




    },

    openflake(flake) {

      if (!flake.children.length) {
        let obj = {};
        obj.level = flake.level + 1;
        obj.content = "";
        obj.open = false;
        obj.children = [];
        obj.title = "";

        flake.children.push({ ...obj })
        flake.children.push({ ...obj })
        flake.children.push({ ...obj })


      }
      flake.open = !flake.open
      this.updateDatabase()
    },
    deleteFlake(index) {


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

            this.$root.session.snowflake.selected.content.splice(index, 1)
            this.startFlake()
            this.updateDatabase()

            this.$swal(
              this.$root.setlang.confirmmodal.success,
              this.$root.setlang.confirmmodal.successfeedback,
              'success'
            )
          }
        }
        );
    },
    replace(flake, index) {


      this.$swal(
        {
          title: this.$root.setlang.confirmmodal.snowconfirm,
          text: this.$root.setlang.confirmmodal.snowconfirmtext,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$root.setlang.confirmmodal.snowconfirmbtn,
          cancelButtonText: this.$root.setlang.confirmmodal.cancelbtn
        }).then((result) => {
          if (result.isConfirmed) {

            let f0 = { ...flake.children[0] }
            let f1 = { ...flake.children[1] }
            let f2 = { ...flake.children[2] }


            // insert in reverse
            this.$root.session.snowflake.selected.content.splice(index + 1, 0, f2)
            this.$root.session.snowflake.selected.content.splice(index + 1, 0, f1)
            this.$root.session.snowflake.selected.content.splice(index + 1, 0, f0)

            // delete the old one 
            this.$root.session.snowflake.selected.content.splice(index, 1)

            this.updateDatabase()


            this.$swal(
              this.$root.setlang.confirmmodal.snowconfirmsuccess,
              this.$root.setlang.confirmmodal.snowconfirmmsg,
              'success'
            )
          }
        }
        )



    },
    updateDatabase() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Snowflake",
        this.$root.session.snowflake.selected.uuid,
        this.$root.session.snowflake.selected
      );
    },
    startFlake() {
      if (
        !this.$root.session.snowflake.selected.content.length
      ) {
        let obj = {};
        obj.title = "";
        obj.level = 0;
        obj.content = "";
        obj.open = false;
        obj.children = [];
        this.$root.session.snowflake.selected.content.push(obj);
      }
    }

  },
  mounted() {
    this.startFlake()
  },
};
</script>

<style scoped>
.toolbutton {
  height: 40px;
  padding: 10px;
  border: 0px;
  color: var(--button-f);
  background-color: var(--mm-title-bar);
  cursor: pointer;
  margin-left: 5px
}

.toolbutton svg {
  fill: var(--mm-title-bar-f);
  width: 100%;
}


.toolbutton:hover,
.toolbutton:active,
.toolbutton:focus {
  color: var(--button-hover-f);
  background-color: var(--button-hover);
}

.toolbutton:hover svg,
.toolbutton:active svg,
.toolbutton:focus svg {
  fill: var(--button-hover-f);
}


.scroller {
  position: absolute;
  top: 40px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  overflow-y: scroll;
}

.card {
  position: relative;
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background-color: var(--paper);
  color: var(--paper-f);
  margin: 10px;
}

.card .title {
  background: none;
  color: inherit;
  outline: none;
  border: 0;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.4rem;
}

.row {
  margin: 0 auto;
  max-width: 1000px;

}

.column {
  position: relative;
  width: 50%;
  display: inline-block;
  vertical-align: middle;
  padding: 11px;
  margin: 0 auto;
}

.open-flake-button {
  position: absolute;
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  right: -20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--accent);
  border: 0px;
  border-radius: 20px;
  fill: var(--accent-f);
}

.open-flake-button svg {
  width: 24px;
}

.open-flake-button:hover,
.open-flake-button:focus,
.open-flake-button:active {
  background-color: var(--success);
}

.open-flake-button:hover svg,
.open-flake-button:focus svg,
.open-flake-button:active svg {
  fill: var(--success-f)
}

.replaceButton {
  position: absolute;
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  right: -20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: var(--accent);
  border: 0px;
  border-radius: 20px;
  fill: var(--accent-f);
}


.replaceButton:hover,
.replaceButton:focus,
.replaceButton:active {
  background-color: var(--success);
}

.replaceButton:hover svg,
.replaceButton:focus svg,
.replaceButton:active svg {
  fill: var(--success-f)
}



.delete-flake-button {
  cursor: pointer;
  border: 0px;
  background: inherit;
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 0px;
  background-color: var(--primary);
  border-radius: 50%;
  width: 30px;
  height: 30px;

}

.delete-flake-button svg {
  width: 16px
}

.delete-flake-button:hover,
.delete-flake-button:active,
.delete-flake-button:focus {
  background-color: var(--danger)
}



.delete-flake-button:hover svg,
.delete-flake-button:active svg,
.delete-flake-button:focus svg {
  fill: var(--danger-f)
}

#toolbox {
  position: fixed;
  top: 50px;
  height: 40px;
  width: 100%;
  background-color: var(--mm-title-bar);
  text-align: right;
}

.titleinput {
  background-color: inherit;
  color: inherit;
  outline: none;
  border: none;
  position: absolute;
  left: 10px;
  top: 0px;
  height: 40px;
  width: calc(100% - 80px);
}
</style>
