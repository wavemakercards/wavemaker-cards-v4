import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "",
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false
      },
      registerType: "autoUpdate", // Automatically update the service worker
      injectRegister: "auto", // Automatically inject the service worker registration
      devOptions: { enabled: true },
      manifest: {
        "name": "Wavemaker Cards",
        "short_name": "Wavemaker",
        "theme_color": "#424242",
        "icons": [
            {
                "src": "./img/icons/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "./img/icons/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "./img/icons/android-chrome-maskable-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "./img/icons/android-chrome-maskable-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "start_url": "./",
        "display": "standalone",
        "background_color": "#424242",
        "scope": "./"       
      },
    }),
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});

 