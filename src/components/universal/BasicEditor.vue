<template>

  <EditorContent :editor="editor" class="basiceditor" />


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
  name:"BasicEditor",
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    }
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
      content: this.modelValue,
      onUpdate: () => {
       // console.log(this.editor.getHTML())
        // HTML
       this.$emit('update:modelValue', this.editor.getHTML())
         ///  this.$root.$data.shadowDB.Cards[this.cardid].content =  this.editor.getHTML()
         //  this.$root.UpdateRecord("Cards", this.cardid, this.$root.$data.shadowDB.Cards[this.cardid])
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

<style scoped >
.basiceditor .ProseMirror{
    height:300px;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
}
ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}
ul[data-type="taskList"] li > label {
  flex: 0 0 auto;
  margin-right: 0.5rem;
  user-select: none;
}
ul[data-type="taskList"] li > div {
  flex: 1 1 auto;
}
ul[data-type="taskList"] input[type="checkbox"] {
  cursor: pointer;
}
</style>


