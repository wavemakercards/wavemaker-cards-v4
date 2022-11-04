<template>

  <div id="filesystem"  :style = "($root.$data.session.writer.lhs)?'left:-300px;':''">

 <FileMenuItem  :files="$root.$data.shadowDB.Writer[$root.$data.session.writer.selectedToolId].files"/> 

    <div class="buttonholder"  :style = "($root.$data.session.writer.lhs)?'left:-220px;':''">
      <button
  
        @click="addFolder()"

      >
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"
          /></svg
        >
      </button>
      <button
  
        @click="addFile()"
        
      >
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M23 18H20V15H18V18H15V20H18V23H20V20H23M6 2C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H13.81C13.45 21.38 13.2 20.7 13.08 20H6V4H13V9H18V13.08C18.33 13.03 18.67 13 19 13C19.34 13 19.67 13.03 20 13.08V8L14 2M8 12V14H16V12M8 16V18H13V16Z"
          />
        </svg>
      
      </button>

 <button
        class="toggleButton"
        @click="$root.$data.session.writer.lhs=!$root.$data.session.writer.lhs"


      >
    <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="!$root.$data.session.writer.lhs">
    <path  d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
</svg>
      
<svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="$root.$data.session.writer.lhs">
    <path  d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" />
</svg>

      </button>

      
    </div>

    
  </div>

 
</template>

<script>
import FileMenuItem from "@/components/tools/writer/FileMenuItem.vue"
export default {
  name: "FileSystem",
  components: {
    FileMenuItem
  },
  data() {
    return {
      FileStructure: [
        {
          type: "folder",
          uuid: this.$root.uuid(),
          name: "Your Novel",
          open: true,
          files: [
            {
              type: "file",
              uuid: this.$root.uuid(),
              name: "Chapter 1",
            },
          ],
        },
        {
          type: "folder",
          uuid: this.$root.uuid(),
          name: "Character Profiles",
          open: true,
          files: [
            {
              type: "file",
              uuid: this.$root.uuid(),
              name: "Protagonist",
            },
            {
              type: "file",
              uuid: this.$root.uuid(),
              name: "Antagonist",
            },
          ],
        },
      ],
      foldertemplate: {
        type: "folder",
        name: "New Folder",
        open: true,
        files: [],
      },
      filetemplate: {
        type: "file",
        name: "New File",
        notes:[]
      },
    };
  },
  methods: {
    addFolder() {
      if (!this.$root.$data.session.writer.selectedToolNode) {
        // no folder selected so add to root
        let obj = JSON.parse(JSON.stringify(this.foldertemplate));
        obj.uuid = this.$root.uuid();
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selectedToolId
        ].files.push(obj);
        this.ListChanged();
      } else {
        if (this.$root.$data.session.writer.selectedToolNode.type === "folder") {
          let obj = JSON.parse(JSON.stringify(this.foldertemplate));
          obj.uuid = this.$root.uuid();
          this.$root.$data.session.writer.selectedToolNode.files.push(obj);
          this.$root.$data.session.writer.selectedToolNode.open = true;
          this.ListChanged();
        }
      }
    },
    addFile() {
      if (!this.$root.$data.session.writer.selectedToolNode) {
        // no folder selected so add to root
        let obj = JSON.parse(JSON.stringify(this.filetemplate));
        obj.uuid = this.$root.uuid();
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selectedToolId
        ].files.push(obj);
        this.ListChanged();
      } else {
        if (this.$root.$data.session.writer.selectedToolNode.type === "folder") {
          let obj = JSON.parse(JSON.stringify(this.filetemplate));
          obj.uuid = this.$root.uuid();
          this.$root.$data.session.writer.selectedToolNode.open = true;
          this.$root.$data.session.writer.selectedToolNode.files.push(obj);
          this.ListChanged();
        }
      }
    },
    ListChanged() {
      console.log("list changed");
      this.$root.UpdateRecord(
        "Writer",
        this.$root.$data.session.writer.selectedToolId,
        this.$root.$data.shadowDB.Writer[
          this.$root.$data.session.writer.selectedToolId
        ]
      );
    },
  },
  mounted() {
    /*
    if (
      this.$root.$data.shadowDB.Writer[
        this.$root.$data.session.writer.selectedToolId
      ].files.length === 0
    ) {
      this.$root.$data.shadowDB.Writer[
        this.$root.$data.session.writer.selectedToolId
      ].files = [...this.FileStructure];
    }
    */
  },
};
</script>

<style scoped>
#filesystem{
  position: absolute;
  top:0px;
  bottom:0px;
  overflow: auto;
  width:300px;
  background-color: var(--c9);
  padding-top:40px;
border-right:2px solid var(--c10);
}

.buttonholder {
  position: fixed;
  top: 40px;
  left: 40px;
  right: 0px;
  width: 300px;
  background-color: var(--c10);
  height: 40px;
}
.buttonholder button svg{
  fill:var(--accent-f)
}
.buttonholder button {
  width: 130px;
  border-radius: 0px;
  border:0px;
  cursor:pointer;
  height:40px;
    background-color: var(--accent);
}
.toggleButton {
  width: 40px !important;
}
.buttonholder button:active,
.buttonholder button:hover,
.buttonholder button:focus {
  background-color: var(--success);
}
</style>

