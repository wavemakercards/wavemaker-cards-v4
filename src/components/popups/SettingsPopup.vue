<template>
  <div style="text-align:left">
    <h1>{{ this.$root.setlang.settings.title }}</h1>
    <div class="container">

      <div class="item item-center">
        <h2>Document Preferences</h2>

        <label>Alignment</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.align"
          @change="updateSettings">
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>
        <label>Font Size</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.fontsize"
          @change="updateSettings">
          <option value="1rem">Smallest</option>
          <option value="1.5rem">Small</option>
          <option value="2rem">Standard</option>
          <option value="3rem">Big</option>
          <option value="3.5rem">Biggest</option>
        </select>
        <label>Line Height</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.lspacing"
          @change="updateSettings">
          <option value="3rem">Standard Spacing</option>
          <option value="4rem">Double Spaced</option>
          <option value="5rem">2.5 Spaced</option>
          <option value="6rem">Triple Spaced</option>
        </select>
        <label>Paragraph Indentation</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.indentation"
          @change="updateSettings">
          <option value="20px">Yes</option>
          <option value="0px">no</option>
        </select>
        <label>Paragraph Spacing</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.pspacing"
          @change="updateSettings">
          <option value="20px">Standard Spacing</option>
          <option value="30px">1.5x spacing</option>
          <option value="40px">2x spacing</option>
          <option value="50px">2.5x spacing</option>
          <option value="100px">5x spacing</option>
        </select>
        <label>Page Width</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.page"
          @change="updateSettings">
          <option value="800px">Page Style</option>
          <option value="100%">Full Width</option>
        </select>
        <table>
          <tr>
            <td>
              <label>Text Colour</label>
              <input type="color" v-model="this.$root.session.settings.documentprefs.color" @change="updateSettings">
            </td>
            <td>
              <label>Page Colour</label>
              <input type="color" v-model="this.$root.session.settings.documentprefs.bgcolor" @change="updateSettings">
            </td>
          </tr>
        </table>
        <label>H1 Alignment</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h1align"
          @change="updateSettings">
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>

        <label>H2 Alignment</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h2align"
          @change="updateSettings">
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>

        <label>H3 Alignment</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h3align"
          @change="updateSettings">
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>

        <label>H4 Alignment</label>
        <select class="wavemaker-form" v-model="this.$root.session.settings.documentprefs.h4align"
          @change="updateSettings">
          <option value="left">Align Left</option>
          <option value="center">Align Center</option>
          <option value="right">Align Right</option>
          <option value="justify">Justify</option>
        </select>

        <hr />
        <h2>Distraction-Free Preferences</h2>

        <table>
          <tr>
            <td>
              <label>Text Colour</label>
              <input type="color" v-model="this.$root.session.settings.documentprefs.distractionfree_fg"
                @change="updateSettings" style=" width:30px; height:30px">
            </td>
            <td>
              <label>Page Colour</label>
              <input type="color" v-model="this.$root.session.settings.documentprefs.distractionfree_bg"
                @change="updateSettings" style=" width:30px; height:30px">
            </td>
            <td>
              <label>Typewriter sound</label>
              <input type="checkbox" v-model="this.$root.session.settings.documentprefs.typesound"
                style="width:20px; height:20px" />
            </td>
          </tr>
        </table>


        <br />
        <button @click="resetSettings" class="interfaceBtn">
          <svg viewBox="0 0 24 24">
            <path
              d="M13.5 21H6V17H13.5C15.43 17 17 15.43 17 13.5S15.43 10 13.5 10H11V14L4 8L11 2V6H13.5C17.64 6 21 9.36 21 13.5S17.64 21 13.5 21Z" />
          </svg>

          Reset to defaults</button>
      </div>
      <div class="item">

        <button class="interfaceBtn fullw" @click="themes = !themes" style="text-align:left">
          <svg viewBox="0 0 24 24">
            <path
              d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z" />
          </svg>
          {{ this.$root.setlang.settings.themes }}
        </button>

        <div v-if="themes" class="dropdown">
          <button class="myoption" @click="setTheme(theme.file)" v-for="(theme, index) in $root.themeList" :key="index">
            {{ theme.name }}
          </button>
        </div>



        <button class="interfaceBtn fullw" @click="lang = !lang" style="text-align:left">
          <svg viewBox="0 0 24 24">
            <path
              d="M11 1H3C1.9 1 1 1.9 1 3V15L4 12H9V11C9 8.8 10.79 7 13 7V3C13 1.9 12.1 1 11 1M11 4L9.5 4C9.16 5.19 8.54 6.3 7.68 7.26L7.66 7.28L8.92 8.53L8.55 9.54L7 8L4.5 10.5L3.81 9.77L6.34 7.28C5.72 6.59 5.22 5.82 4.86 5H5.85C6.16 5.6 6.54 6.17 7 6.68C7.72 5.88 8.24 4.97 8.57 4L3 4V3H6.5V2H7.5V3H11V4M21 9H13C11.9 9 11 9.9 11 11V18C11 19.1 11.9 20 13 20H20L23 23V11C23 9.9 22.1 9 21 9M19.63 19L18.78 16.75H15.22L14.38 19H12.88L16.25 10H17.75L21.13 19H19.63M17 12L18.22 15.25H15.79L17 12Z" />
          </svg>
          {{ this.$root.setlang.settings.lang }}
        </button>

        <div v-if="lang" class="dropdown">
          <button class="myoption" v-for="(k, i) in Object.keys(this.$root.language)" :key="i" @click="language(k)">
            {{ this.$root.language[k].info.name }}
          </button>
        </div>

        <hr />




        <button @click="$root.closeProject()" class="interfaceBtn fullw " style="text-align: left;">
          <svg viewBox="0 0 24 24">
            <path
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
          </svg>
          {{ this.$root.setlang.settings.close }}</button>
      </div>

    </div>
    <div style="clear: both;"></div>
  </div>

</template>

<script>
export default {
  name: 'SettingsPopup',
  data() {
    return {
      themes: false,
      lang: false
    }
  },
  methods: {
    setTheme(t) {
      this.$root.theme = t;
      this.$root.switchTheme()
      this.themes = false
    },
    language(l) {
      this.$root.lang = l
      this.$root.switchLang()
      this.lang = false
    },

    resetSettings() {
      this.$root.session.settings.documentprefs = JSON.parse(JSON.stringify(this.$root.SettingsTemplate.documentprefs))
      this.updateSettings()
    },
    updateSettings() {
      // set the --root variables for each thingy

      document.documentElement.style.setProperty('--my-variable-name', 'pink');
      document.documentElement.style.setProperty('--pageEditor-align', this.$root.session.settings.documentprefs.align)
      document.documentElement.style.setProperty('--pageEditor-fontsize', this.$root.session.settings.documentprefs.fontsize)
      document.documentElement.style.setProperty('--pageEditor-lspacing', this.$root.session.settings.documentprefs.lspacing)
      document.documentElement.style.setProperty('--pageEditor-indentation', this.$root.session.settings.documentprefs.indentation)
      document.documentElement.style.setProperty('--pageEditor-pspacing', this.$root.session.settings.documentprefs.pspacing)
      document.documentElement.style.setProperty('--pageEditor-page', this.$root.session.settings.documentprefs.page)
      document.documentElement.style.setProperty('--pageEditor-font', this.$root.session.settings.documentprefs.font)
      document.documentElement.style.setProperty('--pageEditor-color', this.$root.session.settings.documentprefs.color)
      document.documentElement.style.setProperty('--pageEditor-bgcolor', this.$root.session.settings.documentprefs.bgcolor)

      document.documentElement.style.setProperty('--pageEditor-font', this.$root.session.settings.documentprefs.distractionfree_font)
      document.documentElement.style.setProperty('--pageEditor-color', this.$root.session.settings.documentprefs.distractionfree_fg)
      document.documentElement.style.setProperty('--pageEditor-bgcolor', this.$root.session.settings.documentprefs.distractionfree_bg)

      this.$root.UpdateRecord(
        "Settings",
        this.$root.session.settings.uuid,
        this.$root.session.settings
      )
    }
  },
  mounted() {
    console.log(this.$root.session.settings.documentprefs)
  }
}
</script>

<style scoped>
label {
  padding: 10px
}

.wavemaker-form {
  width: 100%;
  padding: 10px;
  background-color: var(--c9);
  color: var(--c0);
  border: 0px;
  border-bottom: 1px dashed var(--c0);
}

.container {
  display: flex;
}

.item {
  width: 300px;
  /* A fixed width as the default */
}

.item-center {
  flex-grow: 1;
  /* Set the middle element to grow and stretch */
}

.item+.item {
  margin-left: 2%;
}

.themeselect {
  width: 100%;
  background-color: inherit;
  color: inherit;
  height: inherit;
  border: 0px;
}

.myoption {
  width: 100%;
  padding: 10px;
  border-radius: 0px;
  border: 0px;
  background-color: var(--paper);
  color: var(--paper-f);
  fill: var(--paper-f);
  text-align: left;
}

.myoption:hover,
.myoption:focus,
.myoption:active {
  background-color: var(--button-hover);
  color: var(--button-hover-f);
  fill: var(--button-hover-f);
}

.dropdown {
  max-height: 200px;
  overflow-y: auto;
  ;
}
</style>
