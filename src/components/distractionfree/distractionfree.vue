<template>
    <div class="blackout" ref="scrolltarget">

        <div class="distractionfree">
            <EditorContent :editor="editor" v-if="editor" />
        </div>
        <button @click="this.$root.session.selectedTool = 'writer'" class="closebutton">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </svg>
        </button>
    </div>
</template>
<script>
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import { Editor, EditorContent } from '@tiptap/vue-3'
export default {
    name: "DistractionFree",
    components: {
        EditorContent
    },
    data() {
        return {
            item: this.$root.useObservable(this.$root.liveQuery(async () => await this.$root.db.Files.get(this.$root.session.writer.file.uuid))),
            editor: null,
            updateUUID: null,
            mypos: 0,
            keycount: 1
        };
    },
    methods: {
        changed() {
            this.$root.UpdateRecord("Files", this.item.uuid, this.item)
        },
        repositionEditor() {
            if (this.editor && this.item && this.$root.session.settings.documentprefs.caretfocus) {
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
            range = sel.getRangeAt(0);
            caretPos = range.getBoundingClientRect();
            // console.log(caretPos)
            return caretPos.y;
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
                this.editor.commands.setContent(newVal.content)
                return false
            }
            if (newVal.updateUUID != this.updateUUID) {
                this.editor.commands.setContent(newVal.content)
            }

        });

        this.editor = new Editor({
            extensions: [StarterKit, Typography, Image],
            content: '',
            onTransaction: () => {
                if (this.$root.session.settings.documentprefs.autocenter) {
                    this.repositionEditor()
                }
            },
            onUpdate: () => {

                if (this.$root.session.settings.documentprefs.typesound) {
                    window["typesound" + this.keycount].play()
                    if (this.keycount === 9) {
                        this.keycount = 0
                    }
                    this.keycount++
                }
                // HTML
                this.item.wordcount = this.$root.wordCounter(this.editor.getHTML());
                this.item.content = this.editor.getHTML()
                this.item.updateUUID = this.updateUUID
                // JSON
                //this.$emit('update:modelValue', this.editor.getJSON())
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
.distractionfree {
    max-width: 800px;
    margin: 0 auto
}

.blackout {
    position: fixed;
    background-color: var(--distractionfree-bg);
    color: var(--distractionfree-fg);
    fill: var(--distractionfree-fg);
    font-family: var(--distractionfree-font);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow-y: scroll;

}

.closebutton {
    position: fixed;
    top: 5px;
    right: 15px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    outline: none;
    fill: inherit;
    color: inherit;
    cursor: pointer;
    opacity: 0.5;
}

.closebutton:hover,
.closebutton.active,
.closebutton:focus {
    opacity: 1;
}
</style>