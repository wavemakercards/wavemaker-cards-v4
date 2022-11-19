<template>
  <div class="scroller">
    <input class="topinput" :placeholder="this.$root.setlang.tools.name"
      v-model="this.$root.session.timeline.selected.title" @change="updateDatabase" />
    <input class="topinput sub" :placeholder="this.$root.setlang.tools.description"
      v-model="this.$root.session.timeline.selected.description" @change="updateDatabase" />


    <div class="timeline">

      <VueDraggableNext :list="this.$root.$data.session.timeline.selected.content" tag="ul" group="board"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }" handle=".handle" v-bind="dragOptions" @start="drag = true" @end="drag = false" :emptyInsertThreshold="90"
        @change="updateDatabase">
        <template v-for="(element, index) in this.$root.session.timeline.selected.content" :key="index">
          <li>
            <div class="time">
              <div class="handle">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path
                    d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
                </svg>
              </div>
              <input class="timeText" tabindex="1" :placeholder="this.$root.setlang.timeline.date"
                v-model="element.event" @change="updateDatabase">

              <button @click="deleteTime(index)" class="deleteIconButton">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                </svg>
              </button>
            </div>
            <div class="content">
              <input class="title" :placeholder="this.$root.setlang.timeline.title" tabindex="1" v-model="element.title"
                @change="updateDatabase">
              <p>
                <MiniEditor v-model="element.text" tabindex="1" @updated="updateDatabase" />
              </p>
            </div>
          </li>
        </template>

      </VueDraggableNext>

      <div style="clear:both;"></div>
      <div style="text-align: center; padding-left:15px">
        <button @click="addTime" class="add-btn">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              d="M13.72 21.84C13.16 21.94 12.59 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2 22 6.5 22 12C22 12.59 21.94 13.16 21.84 13.72C21 13.26 20.03 13 19 13C17.74 13 16.57 13.39 15.6 14.06L12.5 12.2V7H11V13L14.43 15.11C13.54 16.16 13 17.5 13 19C13 20.03 13.26 21 13.72 21.84M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
          </svg>
        </button>

      </div>

    </div>
    <button @click="exportToManuscript" class="export-btn">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          d="M9 12H18.8L16.3 9.5L17.7 8.1L22.6 13L17.7 17.9L16.3 16.5L18.8 14H9V12M21 17.4V20H3V6H21V8.6L23 10.6V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V15.4L21 17.4Z" />
      </svg>
    </button>
  </div>

</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import MiniEditor from "@/components/universal/MiniEditor.vue"
export default {
  name: "TimeLineTool",
  components: {
    VueDraggableNext,
    MiniEditor
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "Cards",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    return {
      drag: false
    };
  },
  methods: {
    addTime() {
      console.log("asdasd")
      let obj = {}
      obj.title = ""
      obj.text = ""
      obj.event = ""
      this.$root.session.timeline.selected.content.push(obj)
      this.updateDatabase();
    },
    deleteTime(index) {

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

            this.$root.session.timeline.selected.content.splice(index, 1)
            this.updateDatabase();

            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
        )
    },
    updateDatabase() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Timeline",
        this.$root.$data.session.timeline.selected.uuid,
        this.$root.$data.session.timeline.selected

      );
    },
    exportToManuscript() {
      //loop throught the timeline and add all the nodes to a writer object and create the files

      this.$swal(
        {
          title: 'Are you sure?',
          text: "Export your timeline!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, export it!'
        }).then((result) => {
          if (result.isConfirmed) {

            let newWriter = {}
            newWriter.uuid = this.$root.uuid()
            newWriter.title = this.$root.session.timeline.selected.title
            newWriter.descripton = this.$root.session.timeline.selected.description
            newWriter.files = []

            this.$root.session.timeline.selected.content.forEach(tl => {
              let uuid = this.$root.uuid()
              let newfile = {}
              newfile.writerid = newWriter.uuid
              newfile.title = tl.event + "-" + tl.title
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
              'Exported!',
              'Your file has been Exported.',
              'success'
            )
          }
        }
        )





    }
  },
  mounted() {
    if (!this.$root.session.timeline.selected.content.length) {
      let obj = {}
      obj.title = ""
      obj.text = ""
      obj.event = ""
      this.$root.session.timeline.selected.content.push(obj)
    }
    this.updateDatabase()
  }
};
</script>

<style scoped>
.time:hover .deleteIconButton,
.time:focus .deleteIconButton,
.time:active .deleteIconButton {
  display: block;
  top: 10px;
}



.topinput {
  width: 100%;
  font-size: 4rem;
  border: 0px;
  text-align: center;
  outline: none;
}

.sub {
  font-size: 2rem;
}

.handle {
  position: absolute;
  cursor: grabbing;
  background-color: var(--tl-date)
}

.handle svg {
  fill: var(--tl-date-f)
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: var(--hover-ghost);
}


.add-btn {
  position: relative;
  bottom: 5px;
  right: 5px;
  border: 0px;
  padding: 10px;
  background-color: var(--button);
  color: var(--button-f);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 7px 0 5px 0px;
  cursor: pointer;
  margin: 0 auto;
}

.add-btn svg {
  fill: var(--button-f)
}

.add-btn:hover,
.add-btn:active,
.add-btn:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.add-btn:hover svg,
.add-btn:active svg,
.add-btn:focus svg {
  fill: var(--button-hover-f)
}




.export-btn {
  position: fixed;
  top: 60px;
  right: 5px;
  border: 0px;
  padding: 10px;
  background-color: var(--button);
  color: var(--button-f);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 7px 0 5px 0px;
  cursor: pointer;
  margin: 0 auto;
}

.export-btn svg {
  fill: var(--button-f)
}

.export-btn:hover,
.export-btn:active,
.export-btn:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
}

.export-btn:hover svg,
.export-btn:active svg,
.export-btn:focus svg {
  fill: var(--button-hover-f)
}



.scroller {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: scroll;
}

h1 {
  font-size: 3rem;
  text-align: center;
}

h1 div {
  font-size: 1rem;
}

.timeline {
  position: relative;
  margin: 0px auto;
  padding: 40px 0;
  width: 1000px;
  box-sizing: border-box;
}

.timeline:before {
  content: '';
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  background: var(--tl-bar)
}

.timeline ul {
  padding: 0;
  margin: 0;
}

.timeline ul li {
  list-style: none;
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}

.timeline ul li:nth-child(odd) {
  float: left;
  text-align: right;
  clear: both;
}

.timeline ul li:nth-child(odd) .deleteIconButton {
  right: -10px !important;
  top: 8px !important;
}

.timeline ul li:nth-child(even) .deleteIconButton {
  left: -10px !important;
  top: 8px !important;
}

.timeline ul li:nth-child(even) {
  float: right;
  text-align: left;
  clear: both;
}

.content {
  padding-bottom: 20px;
  background-color: var(--tl-card);
  color: var(--tl-card-f);
}

.timeline ul li:nth-child(odd):before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  top: 24px;
  right: -6px;
  background: var(--tl-dot);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--box-shadow);
}

.timeline ul li:nth-child(even):before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  top: 24px;
  left: -4px;
  background: var(--tl-dot);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--box-shadow);
}

.timeline ul li .title {
  padding: 0;
  margin: 0;
  color: inherit;
  font-weight: 600;
  border: 0px;
  background: none;
  outline: none;
  font-family: inherit;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid var(--accent-f);
}

.timeline ul li:nth-child(odd) .title {
  text-align: inherit;
}


.timeline ul li p {
  margin: 10px 0 0;
  padding: 0;
}

.timeline ul li .time .timeText {
  margin: 0;
  padding: 0;
  padding-left: 17px;
  font-size: 14px;
  width: 100%;
  border: 0px;
  color: inherit;
  background-color: inherit;
  outline: none;
}

.timeline ul li:nth-child(even) .timeText {
  text-align: right;
  padding-right: 17px;
  padding-left: 0px;
}

.timeline ul li:nth-child(even) .time .handle {
  left: auto;
  right: 10px
}

.timeline ul li:nth-child(odd) .time .handle {
  left: 10px;
  right: auto
}

.timeline ul li:nth-child(odd) .time {
  position: absolute;
  top: 12px;
  left: calc(100% + 20px);
  width: 50%;
  margin: 0;
  padding: 8px 16px;
  background: var(--tl-date);
  color: var(--tl-date-f);
  border-radius: 18px;
  box-shadow: 0px 0px 5px 0px var(--box-shadow);
  text-align: center;
}

.timeline ul li:nth-child(even) .time {
  position: absolute;
  top: 12px;
  width: 50%;
  right: calc(100% + 20px);
  margin: 0;
  padding: 8px 16px;
  background: var(--tl-date);
  color: var(--tl-date-f);
  border-radius: 18px;
  box-shadow: 0px 0px 5px 0px var(--box-shadow);
  text-align: center;
}

@media(max-width:1000px) {
  .timeline {
    width: 100%;
  }
}

@media(max-width:767px) {
  .timeline {
    width: 100%;
    padding-bottom: 0;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  .timeline:before {
    left: 20px;
    height: 100%;
  }

  .timeline ul li:nth-child(odd),
  .timeline ul li:nth-child(even) {
    width: 100%;
    text-align: left;
    padding-left: 50px;
    padding-bottom: 50px;
  }

  .timeline ul li:nth-child(odd):before,
  .timeline ul li:nth-child(even):before {
    top: -18px;
    left: 16px;
  }

  .timeline ul li:nth-child(odd) .time,
  .timeline ul li:nth-child(even) .time {
    top: -30px;
    left: 50px;
    right: inherit;
  }


  .timeline ul li:nth-child(odd) .deleteIconButton,
  .timeline ul li:nth-child(even) .deleteIconButton {
    left: auto !important;
    right: -10px !important;
    top: 8px !important;
  }



  .timeline ul li .time .handle {
    left: 10px !important;
    right: auto !important
  }

  .timeline ul li .timeText {
    text-align: left !important;
    padding-left: 17px !important;
    padding-right: 0px !important;
  }

}
</style>
