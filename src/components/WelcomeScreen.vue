<template>
  <div class="wavemaker_welcome" v-if="this.$root.setlang">
    <div class="wavemakerForm">
      <div style="text-align:center">
        <svg id="wavemaker_logo" version="1.1" viewBox="0 0 24 24" height="50" width="50">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)">
            <g id="_921457168">
              <path class="wavemaker_logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z" />
              <path class="wavemaker_logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z" />
            </g>
          </g>
        </svg>
        <div class="softwareName">Wavemaker Cards</div>
        <div>{{ this.$root.setlang.welcome.info }}</div>
      </div>


      <button class="interfaceBtn fullw text-left focuson" @click="MakeSettings">
        <svg viewBox="0 0 24 24">
          <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        <span>{{ this.$root.setlang.welcome.getstarted }}</span>
      </button>


      <button @click="$root.$data.popup.name = 'GoogleDrive'" class="interfaceBtn fullw text-left "
        :title="this.$root.setlang.welcome.loadgoogle">
        <svg viewBox="0 0 24 24">
          <path
            d="M13.75,9H16.14L19,14H16.05L13.5,9.46M18.3,17H12.75L14.15,14.5H19.27L19.53,14.96M11.5,17L10.4,14.86L13.24,9.9L14.74,12.56L12.25,17M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />
        </svg>

        <span>{{ this.$root.setlang.welcome.loadgoogle }}</span>
      </button>



      <button @click="$root.file_loadDB" class="interfaceBtn fullw text-left"
        :title="this.$root.setlang.welcome.loadfile">
        <svg viewBox="0 0 24 24">
          <path
            d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z" />
        </svg>
        <span>{{ this.$root.setlang.welcome.loadfile }}</span>
      </button>


      <div class="languages">
        <select v-model="this.$root.lang" @change="this.$root.switchLang()">
          <option v-for="(k, i) in Object.keys(this.$root.language)" :key="i" :value="k">{{ k }}</option>

        </select>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "welcomeSettings",
  data() {
    return {
      projname: "My New Project"
    }
  },
  methods: {

    async MakeSettings() {

      await this.$root.createDatabase()

      // creates the settings object to allow start
      let obj = {};
      obj.uuid = this.$root.uuid();
      obj.settings = {};
      obj.settings.ProjectName = this.projname;
      this.$root.AddRecord("Settings", obj);
      this.$root.shadowDB.Settings[obj.uuid] = obj;
    }
  }
}

</script>

<style scoped>
.focuson {
  height: 50px;
  background-color: var(--primary);
  color: var(--primary-f);
  fill: var(--primary-f);
  font-size: 1.5rem;
  padding-left: 55px;
}

.focuson svg {
  height: 40px;
  width: 40px;
  left: 5px;
  top: 5px;
}

.focuson:hover,
.focuson:active,
.focuson:focus {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
  fill: var(--button-hover-f);
}

.softwareName {
  font-size: 2em;
}

.languages {
  padding: 10px;
  text-align: center;
}

select {
  padding: 5px
}
</style>