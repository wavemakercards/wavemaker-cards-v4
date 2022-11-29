<template>
    <div v-if="item">

        <div class="PageEditorScroll" ref="scrolltarget">
            <EditorContent :editor="editor" v-if="editor" />
        </div>

        <div class="titleBar" v-if="item">
            <input type="text" :placeholder="this.$root.setlang.writer.newfile" v-model="item.title"
                @change="changed" />
        </div>
        <div v-if="editor" class="toolbar" :style="[
            $root.$data.session.writer.lhs ? 'left:40px;' : '',
            $root.$data.session.writer.rhs ? 'right:-40px;' : '',
        ]">
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
                :title="this.$root.setlang.editor.bold">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }" :title="this.$root.setlang.editor.italic">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }" :title="this.$root.setlang.editor.strikethrough">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" class="strikefix">
                    <path
                        d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" />
                </svg>
            </button>
            <!--
    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      
<svg version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" /></svg>
    </button>

            <button @click="editor.chain().focus().unsetAllMarks().run()">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
                </svg>
            </button>
       
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>
    -->
            <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }" :title="this.$root.setlang.editor.paragraph">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                :title="this.$root.setlang.editor.h1">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                :title="this.$root.setlang.editor.h2">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
                </svg>
            </button>
            <!--
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
            -->


            <button @click="addImage" :title="this.$root.setlang.editor.pic">
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
                :class="{ 'is-active': editor.isActive('bulletList') }" :title="this.$root.setlang.editor.blist">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" />
                </svg>
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }" :title="this.$root.setlang.editor.nlist">
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

        <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M9 22C8.4 22 8 21.6 8 21V18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H13.9L10.2 21.7C10 21.9 9.8 22 9.5 22H9M10 16V19.1L13.1 16H20V4H4V16H10M16.3 6L14.9 9H17V13H13V8.8L14.3 6H16.3M10.3 6L8.9 9H11V13H7V8.8L8.3 6H10.3Z" />
                </svg>
            </button>

    -->

            <!--
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
  
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
  -->
            <button @click="this.$root.session.selectedTool = 'planningboard'"
                :title="this.$root.setlang.editor.planningboard">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M22,9V7H20V5A2,2 0 0,0 18,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H18A2,2 0 0,0 20,19V17H22V15H20V13H22V11H20V9H22M18,19H4V5H18V19M6,13H11V17H6V13M12,7H16V10H12V7M6,7H11V12H6V7M12,11H16V17H12V11Z">
                    </path>
                </svg>
            </button>

            <button @click="this.$root.session.selectedTool = 'distractionfree'"
                :title="this.$root.setlang.editor.typewriter">

                <!--
 <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
                </svg>

             -->

                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path
                        d="M20 13H16C16 14.1 15.1 15 14 15H10C8.9 15 8 14.1 8 13H4L2 18V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V18M6 20C5.11 20 4.66 18.92 5.29 18.29C5.92 17.66 7 18.11 7 19C7 19.55 6.55 20 6 20M10 20C9.11 20 8.66 18.92 9.29 18.29C9.92 17.66 11 18.11 11 19C11 19.55 10.55 20 10 20M14 20C13.11 20 12.66 18.92 13.29 18.29C13.92 17.66 15 18.11 15 19C15 19.55 14.55 20 14 20M18 20C17.11 20 16.66 18.92 17.29 18.29C17.92 17.66 19 18.11 19 19C19 19.55 18.55 20 18 20M18 10V3H6V10H3V12H21V10M8 5H16V6H8M8 7H14V8H8" />
                </svg>

            </button>



            <button @click="hilighter = !hilighter" :title="this.$root.setlang.editor.hilight">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path
                        d="M7 16C7.55 16 8 16.45 8 17C8 18.1 7.1 19 6 19C5.83 19 5.67 19 5.5 18.95C5.81 18.4 6 17.74 6 17C6 16.45 6.45 16 7 16M18.67 3C18.41 3 18.16 3.1 17.96 3.29L9 12.25L11.75 15L20.71 6.04C21.1 5.65 21.1 5 20.71 4.63L19.37 3.29C19.17 3.09 18.92 3 18.67 3M7 14C5.34 14 4 15.34 4 17C4 18.31 2.84 19 2 19C2.92 20.22 4.5 21 6 21C8.21 21 10 19.21 10 17C10 15.34 8.66 14 7 14Z" />
                </svg>
            </button>

            <div class="hilighter" v-if="hilighter">
                <button style="background-color: yellow;"
                    @click="editor.chain().focus().toggleHighlight({ color: 'yellow' }).run()"></button>

                <button style="background-color: #ffc078;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()"></button>
                <button style="background-color: #8ce99a;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()"></button>
                <button style="background-color: #74c0fc;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()"></button>
                <button style="background-color: #b197fc;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()"></button>
                <button style="background-color: #ffa8a8;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()"></button>
                <button style="background-color: #ff0000;"
                    @click="editor.chain().focus().toggleHighlight({ color: '#ff0000' }).run()"></button>

            </div>

            <!--
 <button @click="doComment()">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path
                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" />
                </svg>
            </button>

-->

            <button @click="wordcountToggle()" :title="this.$root.setlang.editor.wordcount">


                <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="!item.excludefromwordcount">
                    <path
                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                </svg>



                <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="item.excludefromwordcount">
                    <path
                        d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" />
                </svg>
            </button>



        </div>
        <div class="wordcountdisplay" v-if="item">{{ item.wordcount }} / {{ this.$root.fullWordCount }} </div>

    </div>

</template>
  
<script>

import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import Highlight from '@tiptap/extension-highlight'
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
            item: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Files.get(this.pageuuid))),
            editor: null,
            updateUUID: null,
            mypos: 0,
            hilighter: false
        };
    },
    methods: {
        wordcountToggle() {
            this.item.excludefromwordcount = !this.item.excludefromwordcount
            this.changed()
            this.$root.calcFullWordCount()
        },
        repositionEditor() {
            if (this.editor && this.item) {
                this.mypos = this.getCaretPosition()
                if (this.mypos != 0 && this.$refs.scrolltarget) {
                    let calculatedPosition = parseInt(this.mypos) + this.$refs.scrolltarget.scrollTop - (window.innerHeight / 2)
                    this.$refs.scrolltarget.scrollTo({ top: calculatedPosition, behavior: 'smooth' });
                }
            }
        },
        getCaretPosition() {
            var caretPos = 0
            var sel, range;
            sel = window.getSelection();

            if (sel.anchorNode) { // prebvent this happening on the odd occasion that a null is sent back for the anchor node

                range = sel.getRangeAt(0);
                caretPos = range.getBoundingClientRect();

                return caretPos.y;
            }
        },

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
                this.item.wordcount = this.$root.wordCounter(this.editor.getHTML());
                this.$root.calcFullWordCount()
                return false
            }
            if (newVal.updateUUID != this.updateUUID) {
                this.editor.commands.setContent(newVal.content)
                this.item.wordcount = this.$root.wordCounter(this.editor.getHTML());
                this.$root.calcFullWordCount()
            }

        });

        this.editor = new Editor({
            extensions: [StarterKit, Typography, Image, Highlight.configure({ multicolor: true })],
            content: '',
            onTransaction: () => {
                this.repositionEditor()
            },
            onUpdate: () => {
                // HTML
                this.item.wordcount = this.$root.wordCounter(this.editor.getHTML());
                this.text = this.editor.getHTML()
                this.item.content = this.text
                this.item.updateUUID = this.updateUUID
                // JSON
                this.$emit('update:modelValue', this.editor.getJSON())
                this.$root.calcFullWordCount()
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

.hilighter {
    position: absolute;
    padding: 5px;
    right: 0px;

    width: 30px;
    text-align: center;
    margin: 0 auto;
}



.hilighter button {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 2px solid #fff;
    margin: 2px;
}

.hilighter button:hover,
.hilighter button:focus,
.hilighter button:active {
    border: 2px solid #424242;
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
    padding-bottom: 7px;
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

mark {
    background-color: #ffe066;
    padding: 0.125em 0;
    border-radius: 0.25em;
    box-decoration-break: clone;
}



.body-blue {
    color: blue;
}

.body-red {
    color: red;
}

.body-green {
    color: green;
}
</style>
  