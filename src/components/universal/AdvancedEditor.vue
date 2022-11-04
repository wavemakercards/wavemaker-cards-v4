<template>

  <EditorContent :editor="editor" class="advancedEditor" />

</template>

<script>

//TODO : Clean the basic editor up
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
})
export default {
  name:"AdvancedEditor",
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
     cardid: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,  
        TaskList,
        CustomTaskItem
      ],
      content: this.$root.$data.shadowDB.Cards[this.cardid].content,
      onUpdate: () => {
        // HTML
     //   this.$emit('update:modelValue', this.editor.getHTML())
           this.$root.$data.shadowDB.Cards[this.cardid].content =  this.editor.getHTML()
           this.$root.UpdateRecord("Cards", this.cardid, this.$root.$data.shadowDB.Cards[this.cardid])
        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.advancedEditor .ProseMirror{
    min-height:300px;
    background-color:var(--c0);
    color:var(--c0-f);
}



</style>


