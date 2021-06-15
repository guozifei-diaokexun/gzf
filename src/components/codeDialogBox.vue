<template>
  <el-drawer
    :visible.sync="codeDialogVisible"
    :with-header="false"
    size="100%"
    :modal-append-to-body="true"
    :append-to-body="true"
    :before-close="closeDialog"
  >
    <div class="home" v-if="codeDialogVisible">
      <!-- 头部 -->
      <run-header>
        <!-- 操作 -->
        <template #operation>
          <el-button type="text" @click="run">
            <span>运行</span>
          </el-button>
          <el-button type="text" @click="reset">
            <span>重置</span>
          </el-button>
          <el-button type="text" @click="copyhandle($event)">
            <span>复制</span>
          </el-button>
          <el-button type="text" @click="closeDialog">
            <span>关闭</span>
          </el-button>
        </template>
      </run-header>

      <div class="demo-split">
        <div slot="left" class="demo-split-pane">
          <!-- 代码 -->
          <codemirror
            class="left-box"
            ref="mycodemirror"
            v-model="code"
            :options="cmOptions"
            @ready="onCmReady"
          ></codemirror>
        </div>
        <div slot="right" class="demo-split-pane">
          <!-- 展示 -->
          <run-code
            class="right-box"
            v-if="runCodeHash"
            :code="code"
            ref="runcode"
          ></run-code>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
// @ is an alias to /src
import runHeader from "../configure/layout/header";
import runCode from "../configure/runCode/runCode";
//vue-codemirror相关
import { codemirror } from "vue-codemirror";
import "../configure/codeMirror/index.js";
import "../configure/codeMirror/myCodeMirror.css";

import clip from "@/utils/clipboard.js";

export default {
  name: "vueRunning",
  components: {
    runHeader,
    runCode,
    codemirror,
  },
  props: {
    codeDialogVisible: {
      type: Boolean,
      default: false,
    },
    resultCode: {
      type: String,
      default: "",
    },
  },
  watch: {
    resultCode: {
      handler(val) {
        this.code = val;
      },
      immediate: true,
    },
  },
  created() {
    //解决嵌套使用codemirror时，点击才会显示的问题。
    setTimeout(() => {
      if (this.codeDialogVisible) {
        this.$refs.mycodemirror.codemirror.refresh();
      }
    }, 1);
  },
  data() {
    return {
      split: 0.5,
      code: "",
      cmOptions: {
        mode: "htmlmixed",
        lineNumbers: true, //行号
        // scrollbarStyle: "simple",
        autoCloseBrackets: true, //自动补全括号
        matchBrackets: true, //匹配括号
        showCursorWhenSelecting: true, //select显示光标
        autoCloseTags: true,
        tabSize: 2,
        foldGutter: true, //可折叠的块
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers",
        ],
        autofocus: true,
        styleActiveLine: true,
        hintOptions: {
          completeSingle: false,
        },
        keyMap: "sublime",
        extraKeys: {
          "Ctrl-Q": "autocomplete",
        },
      },
      runCodeHash: true,
    };
  },
  methods: {
    copyhandle(event) {
      this.$message.success("复制成功");
      clip(this.code, event);
    },
    run() {
      this.$refs.runcode.destroyCode();
      this.$refs.runcode.renderCode();
      this.$message.success("已运行");
    },
    reset() {
      this.$refs.runcode.destroyCode();
      this.code = this.resultCode;
      this.$nextTick(() => {
        this.$refs.runcode.renderCode();
        this.$message.success("已重置");
      });
    },
    onCmReady(cm) {
      cm.on("keypress", () => {
        cm.showHint();
      });
    },
    closeDialog() {
      this.$emit("update:codeDialogVisible", false);
    },
  },
};
</script>
<style>
.demo-split {
  position: absolute;
  top: 50px;
  height: calc(100% - 50px);
  width: 100%;
}
.demo-split-pane {
  padding: 5px;
  float: left;
  height: 100%;
  width: 49%;
  border: 1px solid #1890ff;
  overflow: auto;
}

.code {
  white-space: pre-wrap;
}
.right-box {
  width: 100%;
  height: 100%;
}
.right-box #id {
  width: 100%;
}
.btn-icon {
  font-size: 20px;
  color: #1296db;
}
</style>
