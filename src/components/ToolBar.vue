<template>

  <Transition name="slide-fade">
    <div class="navbar" v-if="navbar">
      <button class="toolbarButton vertical" @click="setTool(null)">
        <svg version="1.1" viewBox="0 0 24 24">
          <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
        </svg>
      </button>
      <button class="toolbarButton vertical" @click="setTool('writer')">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" />
        </svg>
      </button>
      <button class="toolbarButton vertical" @click="setTool('planningboard')">

        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z" />
        </svg>

      </button>
      <button class="toolbarButton vertical" @click="setTool('mindmap')">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M21 16V13C21 11.89 20.11 11 19 11H13V8H15V2H9V8H11V11H5C3.89 11 3 11.89 3 13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21M11 4H13V6H11V4M5 20H3V18H5V20M13 20H11V18H13V20M21 20H19V18H21V20Z" />
        </svg>
      </button>
      <button class="toolbarButton vertical" @click="setTool('snowflake')">

        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23" />
        </svg>
      </button>

      <button class="toolbarButton vertical" @click="setTool('timeline')">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
        </svg>
      </button>
      <button class="toolbarButton vertical " @click="setTool('gridplanner')">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />
        </svg>
      </button>
      <button class="toolbarButton vertical lastbtn" @click="setTool('cardsdatabase')">
        <svg version="1.1" viewBox="0 0 24 24">
          <path
            d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
        </svg>
      </button>

    </div>
  </Transition>

  <div class="TopToolbar">
    <button id="wavemakerIconButton" @click="navbar = !navbar">
      <svg id="wavemaker_logo" version="1.1" viewBox="0 0 24 24">
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
    </button>



    <div style="float: right">



      <button @click="$root.imagemanager = !$root.imagemanager" class="toolbarButton"
        :title="this.$root.setlang.settings.title">
        <svg viewBox="0 0 24 24">
          <path
            d="M7,15L11.5,9L15,13.5L17.5,10.5L21,15M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z" />
        </svg>

      </button>

      <button @click="$root.$data.popup.name = 'SettingsPopup'" class="toolbarButton"
        :title="this.$root.setlang.settings.title">
        <svg viewBox="0 0 24 24">
          <path
            d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>

      </button>


      <button @click="$root.file_downloadDB" class="toolbarButton">
        <svg viewBox="0 0 24 24">
          <path
            d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
        </svg>
      </button>



      <button @click="$root.popup.name = 'GoogleDrive'" class="toolbarButton">
        <svg viewBox="0 0 24 24">
          <path
            d="M7.71,3.5L1.15,15L4.58,21L11.13,9.5M9.73,15L6.3,21H19.42L22.85,15M22.28,14L15.42,2H8.58L8.57,2L15.43,14H22.28Z" />
        </svg>
      </button>


      <span v-if="$root.GoogleDriveApi.loggedin">

        <button @click="this.$root.GoogleDriveWriteFile()" class="toolbarButton" v-if="!$root.GoogleDriveApi.loading">
          <svg viewBox="0 0 24 24">
            <path
              d="M13 19C13 19.34 13.04 19.67 13.09 20H6.5C5 20 3.69 19.5 2.61 18.43C1.54 17.38 1 16.09 1 14.58C1 13.28 1.39 12.12 2.17 11.1S4 9.43 5.25 9.15C5.67 7.62 6.5 6.38 7.75 5.43S10.42 4 12 4C13.95 4 15.6 4.68 16.96 6.04C18.32 7.4 19 9.05 19 11C20.15 11.13 21.1 11.63 21.86 12.5C22.37 13.07 22.7 13.71 22.86 14.42C21.82 13.54 20.5 13 19 13C15.69 13 13 15.69 13 19M16 18H18V22H20V18H22L19 15L16 18Z" />
          </svg>
        </button>

        <button class="toolbarButton" v-if="$root.GoogleDriveApi.loading">
          <svg version="1.1" viewBox="0 0 100 100">
            <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                to="360 50 50" repeatCount="indefinite" />
            </path>
          </svg>
        </button>
      </span>

    </div>
  </div>
</template>
<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      navbar: false
    }
  },
  methods: {
    setTool(me) {

      if (me) {
        this.$root.session.writer = {}
        this.$root.session[me] = {}
      }
      this.$root.session.selectedTool = me;
      this.navbar = false
      console.log("tool set to ", me)

    }
  }
}
</script>
<style scoped>
.TopToolbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: var(--top-toolbar);
  color: var(--top-toolbar-f);
  height: 50px;
}

.navbar {
  width: 50px;
  position: absolute;
  top: 50px;
  left: 0px;
  padding-top: 0px;
  padding-bottom: 10px;

}

.lastbtn {
  border-radius: 0px 0 5px 0px;
}

#wavemakerIconButton {
  padding: 0px;
  background: none;
  border: 0px;
  height: 50px;
  width: 50px;
  padding-left: 2px;
  cursor: pointer;
}

.wavemakerIconButton svg {
  width: 25px;
  height: 25px;
}

#wavemakerIconButton:hover .wavemaker_logo-bottom {
  fill: var(--button-hover-f);
}

#wavemaker_logo {
  margin: 8px;
}

.toolbarButton {
  background-color: var(--top-toolbar);
  border: 0px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  margin-bottom: 0px;
  outline: none;
}

.toolbarButton svg {
  fill: var(--top-toolbar-f);
  width: 20px;
  height: 20px;
}

.toolbarButton:hover,
.toolbarButton:active,
.toolbarButton:focus {
  background-color: var(--button-hover);
}

.toolbarButton:hover svg,
.toolbarButton:active svg,
.toolbarButton:focus svg {
  fill: var(--button-hover-f);
}

.vertical {
  padding-left: 10px;
}
</style>