
const path = require("path");
const { defineConfig } = require('@vue/cli-service')
const myJson = require('./package.json');
module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "./build/v4/" + myJson.version), // deploy build to the wavemakercards.github.io
  "publicPath": "./", // allow it to run from a folder
  // transpileDependencies: true,  // double checks dependencies - slows build
  productionSourceMap: false, // disable large source map files
  pwa: {
    name: 'My App',
    themeColor: '#424242',
    msTileColor: '#424242',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      exclude: [
        ".htaccess"
      ]
    },
    manifestOptions: {
      "name": "Wavemaker Cards",
      "short_name": "Wavemaker",
      "theme_color": "#424242",
      "background_color": "#424242",
      "display": "standalone",
      "scope": "./",
      "start_url": "./"
    }
  }
})