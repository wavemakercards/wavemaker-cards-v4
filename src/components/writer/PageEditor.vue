<template>
    <div v-if="item">

        <div class="PageEditorScroll">
            <EditorContent :editor="editor" v-if="editor" />
        </div>
        <div class="titleBar">
            <input type="text" :placeholder="this.$root.setlang.writer.newfile" v-model="item.title"
                @change="changed" />
        </div>
        <div v-if="editor" class="toolbar" :style="[
            $root.$data.session.writer.lhs ? 'left:40px;' : '',
            $root.$data.session.writer.rhs ? 'right:-40px;' : '',
        ]">
            <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" class="strikefix">
                    <path
                        d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" />
                </svg>
            </button>
            <!--
    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" /></svg>
    </button>
    -->
            <button @click="editor.chain().focus().unsetAllMarks().run()">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
                </svg>
            </button>
            <!--
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>
    -->
            <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M18,18V13H13V11L18,4H20V11H21V13H20V18H18M18,11V7.42L15.45,11H18Z" />
                </svg>
            </button>

            <button @click="addImage">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
                </svg>
            </button>
            <!--
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
      h5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
      h6
    </button>
    -->
            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" />
                </svg>
            </button>
            <!--
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M11,6.5V9.33L8.33,12L11,14.67V17.5L5.5,12M13,6.43L18.57,12L13,17.57V14.74L15.74,12L13,9.26M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z"
        />
      </svg>
    </button>
    -->
            <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M9 22C8.4 22 8 21.6 8 21V18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H13.9L10.2 21.7C10 21.9 9.8 22 9.5 22H9M10 16V19.1L13.1 16H20V4H4V16H10M16.3 6L14.9 9H17V13H13V8.8L14.3 6H16.3M10.3 6L8.9 9H11V13H7V8.8L8.3 6H10.3Z" />
                </svg>
            </button>
            <!--
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
    -->
            <button @click="editor.chain().focus().undo().run()">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13.5 21H6V17H13.5C15.43 17 17 15.43 17 13.5S15.43 10 13.5 10H11V14L4 8L11 2V6H13.5C17.64 6 21 9.36 21 13.5S17.64 21 13.5 21Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().redo().run()">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M3 13.5C3 9.36 6.36 6 10.5 6H13V2L20 8L13 14V10H10.5C8.57 10 7 11.57 7 13.5S8.57 17 10.5 17H18V21H10.5C6.36 21 3 17.64 3 13.5Z" />
                </svg>
            </button>

            <button @click="this.$root.session.selectedTool = 'planningboard'">
                <svg viewBox="0 0 24 24">
                    <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
                </svg>
            </button>
        </div>
        <div class="wordcountdisplay">{{ item.wordcount }} of {{ this.$root.calcFullWordCount }} </div>

    </div>

</template>
  
<script>
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db } from "@/db.js";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";

export default {
    name: "NewPage",
    props: {
        pageuuid: String
    },
    components: {
        EditorContent,
    },
    data() {
        return {
            item: useObservable(liveQuery(() => db.Files.get(this.pageuuid))),
            editor: null,
            updateUUID: null
        };
    },
    methods: {
        changed() {

            this.$root.UpdateRecord("Files", this.item.uuid, this.item)
        },
        addImage() {
            let url = window.prompt("Provide a URL to your image");
            if (url) {
                if (url.includes("drive.google.com")) {

                    let parts = url.split("/");
                    let NewUrl =
                        parts[0] + "//" + parts[2] + "/uc?export=view&id=" + parts[5];
                    url = NewUrl;
                }
                this.editor.chain().focus().setImage({ src: url }).run();
            }
        }
    },
    mounted() {

        this.updateUUID = this.$root.uuid()

        /*
        this is a hack to get around tiptap not being responsive to new input - so we watch the variable 
        when a change is triggered we check the uuid generated for each window - that way I can see which window sent the change
        */
        this.$watch('item', (newVal, oldVal) => {
            if (!oldVal) {
                // when first loaded update the content
                this.editor.commands.setContent(this.item.content)
                return false
            }
            if (newVal.updateUUID != this.updateUUID) {
                this.editor.commands.setContent(newVal.content)
            }

        });

        this.editor = new Editor({
            extensions: [StarterKit, Typography, Image],
            content: '',
            onUpdate: () => {
                // HTML
                this.item.wordcount = this.$root.wordCounter(this.editor.getHTML());
                this.text = this.editor.getHTML()
                this.item.content = this.text
                this.item.updateUUID = this.updateUUID
                // JSON
                this.$emit('update:modelValue', this.editor.getJSON())
                this.changed();
            }
        })

    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
};
</script>
<style scoped>
.rhspin {
    right: 300px;

}

.titleBar {
    position: absolute;
    top: 0px;
    background-color: var(--writer-title-bar);
    color: var(--writer-title-bar-f);
    height: 40px;
    width: 100%;

}

.titleBar input {
    width: 100%;
    background-color: inherit;
    color: inherit;
    outline: none;
    height: 40px;
    border: 0px;
    padding-left: 20px;
    padding-right: 20px;
    font-family: inherit;
    font-size: 1.5rem;
}




.toolbar {
    position: absolute;
    top: 40px;
    width: 100%;
    background-color: var(--writer-button-bar);
    color: var(--writer-button-bar-f);
    text-align: center;
    display: block;
}


button {
    position: relative;
    background-color: var(--writer-button-bar);
    border: 0px;
    outline: none;
    height: 40px;
    width: 40px;
    cursor: pointer;
    text-align: center;
}

button svg {
    position: relative;
    fill: var(--writer-button-bar-f);
    width: 20px;
    top: 4px;
    left: 0px;
}

.strikefix {
    /*
  Strikethrough icon looks wierdly bigger
  */
    width: 12px;
}

button:hover,
button:focus,
button:active {
    background-color: var(--button-hover);
    color: var(--button-hover-f);
}

button:hover svg,
button:focus svg,
button:active svg {
    fill: var(--button-hover-f);
}

.wordcountdisplay {
    position: absolute;
    bottom: 0px;
    right: 10px;
    width: 100px;
    background-color: var(--accent);
    color: var(--accent-f);
    z-index: 200;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
    text-align: center;
}
</style>
  