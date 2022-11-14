<template>
  <div class="scroller">

    <template v-for="(flake, index) in this.$root.session.snowflake.selected.content" :key="index">
      <div id="toolbox">
        <input v-model="$root.session.snowflake.selected.title" class="titleinput" @change="updateDatabase" />
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
            <MiniEditor :snowFlake="flake" v-model="flake.text" @updated="updateDatabase" />

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
              <MiniEditor :snowFlake="flake.children[0]" v-model="flake.children[0].text" @updated="updateDatabase" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[1].title" :placeholder="this.$root.setlang.snowflake.title"
                @change="updateDatabase" />
              <MiniEditor :snowFlake="flake.children[1]" v-model="flake.children[1].text" @updated="updateDatabase" />
            </div>

            <div class="card">
              <input class="title" v-model="flake.children[2].title" :placeholder="this.$root.setlang.snowflake.title"
                @change="updateDatabase" />
              <MiniEditor :snowFlake="flake.children[2]" v-model="flake.children[2].text" @updated="updateDatabase" />
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
      if (confirm(this.$root.setlang.snowflake.deletewarn)) {
        this.$root.session.snowflake.selected.content.splice(index, 1)
        this.startFlake()
        this.updateDatabase()
      }
    },
    replace(flake, index) {
      if (confirm(this.$root.setlang.snowflake.replacewarn)) {
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

      }
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
