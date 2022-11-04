<template>
<div class="writer" v-bind:class="
[
$root.$data.lhspin ? 'lhspin' : '',
$root.$data.rhspin ? 'rhspin' : ''
]">
<div v-if="!$root.$data.session.writer.file">
    <div class="wavemaker_info_box">
<div style="text-align:center">
        <svg id="wavemaker_logo" version="1.1" viewBox="0 0 24 24" height="50" width="50">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" >
            <g id="_921457168">
              <path
                class="wavemaker_logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="wavemaker_logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
</div>
<input type="text" class="formInput mantitle" v-model="this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selected
        ].title"
        @change="changed" />
        <input type="text" class="formInput mandesc" v-model="this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selected
        ].description" 
        @change="changed"/>
<h4>
  {{calcWordCount}} Words in this manuscript
</h4>
<p>
  More settings will be on the way - most will be  styling and so on
</p>
        <button @click="exportDoc" class="formButton">Export to word (back up regularly folks - this is an Alpha)</button>



</div>
</div>

<transition name="fade">
<div class="pageHolder" v-if="$root.$data.session.writer.file" :key="$root.$data.session.writer.file.uuid">
     <PageEditor v-model="this.$root.shadowDB.Writer[this.$root.session.writer.selected].files[this.$root.shadowDB.Writer[this.$root.session.writer.selected].files.map(e => e.uuid).indexOf(this.$root.session.writer.file.uuid)].content"  @update:modelValue="changed()" />
    </div>
</transition>
     <div class="titleBar" v-if="$root.$data.session.writer.file">
    <input type="text" v-model="$root.$data.session.writer.file.name" @change="changed" placeholder="New File"  />
</div>
</div>

<WriterRightSide />
    <WriterLeftSide />
</template>

<script>
import WriterLeftSide from "./WriterLeftSide.vue";
import WriterRightSide from "./WriterRightSide.vue";
import PageEditor from "./PageEditor.vue";
export default {
    name:"WriterTool",
    components:{
        WriterLeftSide,
        WriterRightSide,
        PageEditor
    },
    computed:{
        calcWordCount(){
          let w=0
          this.$root.shadowDB.Writer[this.$root.session.writer.selected].files.forEach(page => {
            if(page.wordcount){
              w = w + parseInt(page.wordcount)
            }
            });  

          return w
        }
      },
      methods:{
        exportDoc(){
          if(confirm("Do you want to download a doc file of this Manuscript?")){
            let html ="";
            
            this.$root.shadowDB.Writer[this.$root.session.writer.selected].files.forEach(page => {
              html = html + page.content
            });    

            window.Export2Word(html)
          }
        },
           changed() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selected,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selected
        ]
      );
    }
      }
}
</script>
<style scoped>
.writer{
    position: absolute;
    left:40px;
    right: 40px;
    padding:0px;
    bottom:0px;
    top:0px;
     transition: all 0.3s ease;
}
.pageHolder{
   position: absolute;
    left:0px;
    right: 0px;
    padding:0px;
    bottom:0px;
    top:0px;
    overflow:none;
}
.lhspin {
  left: 300px;

}

.rhspin {
  right: 300px;
 
}
.titleBar{
  position: absolute;
  top:0px;
  background-color: var(--writer-title-bar);
  color: var(--writer-title-bar-f);
  height: 40px;
  width: 100%;

}
.titleBar input{
  width: 100%;
   background-color: inherit;
   color: inherit;
   outline: none;
   height:40px;
   border:0px;
   padding-left:20px;
   padding-right:20px;
   font-family: inherit;
   font-size: 1.5rem;
}


.mantitle,.mandesc{
  background-color: inherit;
  border:0px;
  color: inherit;
  font-family: inherit;
  font-size: 1.5rem; 
  font-weight: bold;
  outline: none;
  margin: 0px;

  }

.mantitle:focus,.mandesc:focus{
  border-bottom: 1px solid var(--accent);
}

.mantitle{
   font-size: 2rem;
}

</style>