if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let r={};const a=e=>c(e,s),d={module:{uri:s},exports:r,require:a};i[s]=Promise.all(n.map((e=>d[e]||a(e)))).then((e=>(o(...e),r)))}}define(["./workbox-a1f32f28"],(function(e){"use strict";e.setCacheNameDetails({prefix:"wavemakercards-v4"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"audio/type.mp3",revision:"abfb176cc511f43ac411e92fd8599ac3"},{url:"css/app.30616e9f.css",revision:null},{url:"favicon.ico",revision:"5c7666d0806c30cfcf38ba52fd85ed31"},{url:"icon.ico",revision:"c3d14fdaf1c3255e40af278c7cc2526e"},{url:"img/icons/android-chrome-192x192.png",revision:"3db747f87572cc91faf91a184d6a9433"},{url:"img/icons/android-chrome-512x512.png",revision:"24bf9d36a780d94ec4f506e8873e941c"},{url:"img/icons/android-chrome-maskable-192x192.png",revision:"e4b9b98e4e6fc84a0e742988c534ef3f"},{url:"img/icons/android-chrome-maskable-512x512.png",revision:"5e014e9e1082d58016cdd123895971b9"},{url:"img/icons/apple-touch-icon-120x120.png",revision:"026f3f70323871445d1405c697dcca22"},{url:"img/icons/apple-touch-icon-152x152.png",revision:"0176ab696267d1f638d3aca0c4517922"},{url:"img/icons/apple-touch-icon-180x180.png",revision:"ab3e356c073e32fa020dd7178d781ee9"},{url:"img/icons/apple-touch-icon-60x60.png",revision:"d802e664b73c050cd92bba7e269524bd"},{url:"img/icons/apple-touch-icon-76x76.png",revision:"febe654a7c3f868dda7f9f2d6f287952"},{url:"img/icons/apple-touch-icon.png",revision:"bd1679da7804d222f29f3917287d8971"},{url:"img/icons/favicon-16x16.png",revision:"95133d642cc0ecb604f28e3d2377e292"},{url:"img/icons/favicon-32x32.png",revision:"3ce944214a8e1615da88bf98bf311696"},{url:"img/icons/favicon.svg",revision:"0d0dea6894b490210d81d331de70bcad"},{url:"img/icons/msapplication-icon-144x144.png",revision:"0e11816af1035728cb9d7b651e5cca63"},{url:"img/icons/mstile-150x150.png",revision:"32107b5df67b4943aa5ba20ee3654617"},{url:"img/icons/safari-pinned-tab.svg",revision:"68bb287b3031c171ebe66a36281e89f2"},{url:"index.html",revision:"0b8f8acd48ec8a277375eaceda81c035"},{url:"js/app.a511d536.js",revision:null},{url:"js/chunk-vendors.f4b114d7.js",revision:null},{url:"manifest.json",revision:"c06ebaf453dfee941a1e3d5e9b37d219"},{url:"privacy.html",revision:"f94c99fc47a15888d310c696318135df"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"themes/bluesky.css",revision:"848624025c412ed56aba9c9e0fa97423"},{url:"themes/default.css",revision:"543a807c67a6920c313ff61d0d563784"},{url:"themes/light.css",revision:"456e6acad5d52e85b4721c0d13a0ed99"},{url:"themes/wavemaker.css",revision:"a44ad9e2e6383bba7b3f947490830437"},{url:"wavemaker.js",revision:"24f440cc91f49b61087b15f5b443eeb9"}],{})}));