<template>
  <div class="home">
    <div class="top-button">
      <el-button @click="clearAll">清空画布</el-button>
      <el-button type="primary" @click="vueDownload">下载vue文件</el-button>
      <el-button type="success" @click="createCode">生成代码</el-button>
    </div>
    <!-- <el-row>
      <el-col :span="3">
        <LeftAside />
      </el-col>
      <el-col :span="16" style="overflow-x: initial">
        <CenterContainer />
      </el-col>
      <el-col :span="4">
        <RightAside />
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="3" class="right-col">
        <draggable
          :list="leftList"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="cloneComponent"
          :sort="false"
        >
          <div
            v-for="(element, index) in leftList"
            :key="index"
            class="components-right"
          >
            <div class="components-body">
              <i :class="element.componentIcon" />
              {{ element.componentName }}
            </div>
          </div>
        </draggable>
      </el-col>
      <el-col :span="16">
        <draggable
          class="components-draggable"
          :list="exhibitionList"
          :group="{ name: 'componentsGroup' }"
        >
          <div
            v-for="(element, index) in exhibitionList"
            :key="element.index"
            @click="handleItemClick(index)"
            class="components-item"
            :class="element.maxWidth ? 'max-width' : ''"
          >
            <i
              class="el-icon-delete-solid"
              :style="element.magin"
              @click="deleteItem(index)"
            ></i>
            <component :is="element.component" :propValues="element" />
          </div>
        </draggable>
      </el-col>
      <el-col :span="5">
        <RightAside />
      </el-col>
    </el-row>

    <!--代码显示的按钮-->
    <code-dialog-box
      :codeDialogVisible.sync="codeDialogVisible"
      :resultCode="resultCode"
    />

    <!-- 下载弹框 -->
    <el-dialog width="500px" :visible.sync="dialogVisible">
      <el-row :gutter="15">
        <el-form ref="elForm" size="medium" label-width="100px">
          <el-col :span="24">
            <el-form-item label="文件名" prop="fileName">
              <el-input
                v-model="fileName"
                placeholder="请输入文件名"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer">
        <el-button @click="codeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDownload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LeftAside from "./LeftAside";
import CenterContainer from "./CenterContainer";
import RightAside from "./RightAside";
import { finalRenderToCode } from "@/utils/generateToCode";
import codeDialogBox from "./codeDialogBox";
import draggable from "vuedraggable";
import leftList from "../utils/leftComponentJson";
import { saveAs } from "file-saver";
import { deepClone } from "@/utils/index";

export default {
  components: {
    LeftAside,
    CenterContainer,
    RightAside,
    codeDialogBox,
    draggable,
  },
  name: "Home",
  data() {
    return {
      resultCode: "",
      codeDialogVisible: false,
      leftList,
      exhibitionList: [],
      dialogVisible: false,
      fileName: "",
    };
  },
  computed: {
    ...mapState({
      rightPanelData: (state) => state.canvas.rightPanelData,
    }),
  },
  methods: {
    //清空画布
    clearAll() {
      this.$store.dispatch("clearCanvasData");
      this.exhibitionList = [];
      this.$message.success("清空成功！");
    },
    //点击事件唤醒右侧表单
    handleItemClick(index) {
      this.$store.dispatch("setRightPanelData", this.exhibitionList[index]);
    },
    //删除元素
    deleteItem(index) {
      this.exhibitionList.splice(index);
    },
    //深克隆拖拽元素
    cloneComponent(origin) {
      let clone = deepClone(origin);
      this.exhibitionList.push(clone);
    },
    //生成vue文件下载弹框
    vueDownload() {
      this.dialogVisible = true;
      this.fileName = `${+new Date()}.vue`;
    },
    //下载vue文件
    saveDownload() {
      if (!this.resultCode) {
        this.resultCode = finalRenderToCode(this.exhibitionList);
      }
      const blob = new Blob([this.resultCode], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, this.fileName);
      this.codeDialogVisible = false;
    },
    //生成预览代码
    createCode() {
      this.resultCode = finalRenderToCode(this.exhibitionList);
      this.codeDialogVisible = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row,
.el-col,
.home {
  height: 100%;
}
.top-button {
  display: flex;
  border-bottom: 1px solid #d6d6d6;
  padding: 0 0 8px 0;
  box-shadow: 0px 8px #fcfcfc;
}
.components-draggable {
  height: 100%;
  padding: 12px;
}
.components-item {
  float: left;
  background: #f6f7ff;
  border-radius: 6px;
}
.components-body {
  line-height: 30px;
  border: 1px solid sandybrown;
}
.max-width {
  width: 100%;
}
.el-icon-delete-solid {
  float: right;
}
.components-right {
  float: left;
  width: 48%;
  margin: 1%;
  transition: transform 0ms, -webkit-transform 0ms !important;
}
.components-body {
  padding: 8px 7px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;
}
.right-col {
  padding: 8px;
}
</style>
