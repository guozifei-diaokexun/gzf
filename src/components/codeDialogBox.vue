<template>
  <el-dialog title="代码预览" fullscreen center :visible="codeDialogVisible" :before-close="closeDialog" top="2vh">
    <prism-editor class="my-editor" v-model="resultCode" :highlight="highlighter" line-numbers readonly/>

    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  // 引入code编辑器
  import { PrismEditor } from "vue-prism-editor";
  import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

  // import highlighting library (you can use any library you want just return html string)
  import { highlight, languages } from "prismjs/components/prism-core";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-javascript";
  import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

  export default {
    name: 'codeDialogBox',
    components: {
      PrismEditor,
    },
    props: {
      codeDialogVisible: {
        type: Boolean,
        default: false,
      },
      resultCode: {
        type: String,
        default: '',
      }
    },
    methods: {
      highlighter(code) {
        return highlight(code, languages.js);
      },
      closeDialog() {
        this.$emit('update:codeDialogVisible', false)
      }
    }
  }
</script>

<style scoped>
  .my-editor {
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 3px;
  }

  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
