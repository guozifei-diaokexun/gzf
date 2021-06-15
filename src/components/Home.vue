<template>
  <div class="home">
    <div class="top-button">
      <el-button @click="clearAll">清空画布</el-button>
      <el-button type="primary" :disabled="isPage" @click="vueDownload">
        下载vue文件
      </el-button>
      <el-button type="success" :disabled="isPage" @click="createCode">
        在线运行
      </el-button>
      <el-button type="success" :disabled="!isPage" @click="saveDialog">
        保存弹框
      </el-button>
      <el-switch
        class="switch"
        v-model="isPage"
        @change="switchChange"
        active-text="编辑弹框"
        inactive-text="编辑页面"
      ></el-switch>
      <el-select
        :disabled="!isPage"
        v-model="template"
        @change="templateChange"
        placeholder="请选择"
        style="margin-left: 10px"
      >
        <el-option
          v-for="(item, index) in dialogTemplateList"
          :key="item.index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-row>
      <div>
        <el-col :span="4" class="right-col">
          <draggable
            :list="leftList"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            :sort="false"
          >
            <div
              v-if="isPage ? (isFrom ? isFrom == element.isFrom : true) : true"
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
      </div>
      <el-col :span="14">
        <draggable
          class="components-draggable"
          :list="exhibitionList"
          :group="{ name: 'componentsGroup' }"
        >
          <div
            v-for="(element, index) in exhibitionList"
            :key="element.index"
            @click.capture="handleItemClick(index)"
            class="el-col components-item"
            :style="element.magin + 'float:' + element.float"
            :class="'el-col-' + element.span"
          >
            <i class="el-icon-delete-solid" @click.stop="deleteItem(index)"></i>
            <component :is="element.component" :propValues="element" />
          </div>
        </draggable>
      </el-col>

      <!-- <el-col :span="14" v-if="isPage">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          :label-width="labelWidth + 'px'"
          label-position="left"
        >
          <draggable
            class="components-draggable"
            :list="dialogPageList"
            :group="{ name: 'componentsGroup' }"
          >
            <div
              class="el-col components-item"
              :class="'el-col-' + element.span"
              @click="handleItemClick(index)"
              v-for="(element, index) in dialogPageList"
              :key="element.index"
            >
              <el-form-item :label="element.label" :prop="element.field">
                <i
                  class="el-icon-delete-solid"
                  :style="element.magin"
                  @click="deleteItem(index)"
                ></i>
                <component
                  :is="element.component"
                  :propValues="element"
                  :isDialog="isPage"
                />
              </el-form-item>
            </div>
          </draggable>
        </el-form>
      </el-col> -->

      <el-col :span="6" class="right-boder">
        <RightAside
          :labelWidth.sync="labelWidth"
          :isDialog.sync="isPage"
          :dialogTemplateList="dialogTemplateList"
          :isFrom.sync="isFrom"
        />
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
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDownload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RightAside from "./RightAside";
import { finalRenderToCode } from "@/utils/generateToCode";
import codeDialogBox from "./codeDialogBox";
import draggable from "vuedraggable";
import leftList from "../utils/leftComponentJson";
import { saveAs } from "file-saver";
import { deepClone } from "@/utils/index";

export default {
  components: {
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
      isPage: false,
      formData: {},
      deepCloneData: [],
      labelWidth: 90,
      dialogTemplateList: [],
      template: "",
      storage: window.localStorage,
      isFrom: true,
      i: 0,
    };
  },
  watch: {
    labelWidth: {
      handler(val) {
        this.exhibitionList.forEach((item) => {
          item.labelWidth = val;
        });
      },
      immediate: true,
    },
  },
  beforeRouteLeave() {
    this.storage.clear();
  },
  computed: {
    ...mapState({
      rightPanelData: (state) => state.canvas.rightPanelData,
    }),
  },
  methods: {
    //清空画布
    clearAll() {
      this.$confirm("确认要清空吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.exhibitionList = [];
        this.$store.dispatch("setRightPanelData", {});
        this.$message.success("清空成功！");
      });
    },
    //点击事件唤醒右侧表单
    handleItemClick(index) {
      this.$store.dispatch("setRightPanelData", this.exhibitionList[index]);
    },
    //开启弹框编辑模式
    switchChange() {
      this.$store.dispatch("setRightPanelData", {});
      if (this.isPage) {
        this.deepCloneData = deepClone(this.exhibitionList);
        this.exhibitionList = [];
      } else {
        this.exhibitionList = this.deepCloneData;
      }
    },
    //删除元素
    deleteItem(index) {
      this.exhibitionList.splice(index, 1);
      this.$store.dispatch("setRightPanelData", {});
    },
    //深克隆拖拽元素
    cloneComponent(origin) {
      let data = deepClone(origin);
      data.field = data.field + this.i++;
      this.exhibitionList.push(data);
    },
    //手动填写字段名称检核
    reviewName(name) {
      if (this.exhibitionList.length <= 0) {
        return true;
      }
      let list = this.exhibitionList.filter((item) => {
        return item.field == name;
      });
      if (list.length > 1) {
        this.$message.warning("字段重复");
        return false;
      }
      return true;
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
    //保存弹框模板
    saveDialog() {
      this.$prompt("请输入模板名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator(value) {
          if (!value) {
            return false;
          }
        },
        inputErrorMessage: "请输入模板名称",
      }).then(({ value }) => {
        var storage = window.localStorage;
        let template = {
          formData: "formData" + this.i++,
          isFrom: this.isFrom,
          value: this.exhibitionList,
          labelWidth: this.labelWidth,
        };
        this.dialogTemplateList.push({
          lable: value,
          value: value,
        });
        storage.setItem(value, JSON.stringify(template));
        this.exhibitionList = [];
      });
    },
    //选择弹框模板进行编辑
    templateChange() {
      var storage = window.localStorage;
      let data = storage.getItem(this.template);
      this.exhibitionList = JSON.parse(data).value;
    },
    //生成预览代码
    createCode() {
      this.resultCode = finalRenderToCode(this.exhibitionList);
      this.codeDialogVisible = true;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  box-sizing: border-box;
}

.main {
  height: calc(100% - 39px);
  box-sizing: border-box;
}

.main > .el-col {
  height: 100%;
}

.top-button {
  display: flex;
  border-bottom: 1px solid #d6d6d6;
  padding: 0 0 8px 0;
  box-shadow: 0px 8px #fcfcfc;
}
.top-button .switch {
  margin: 10px 0 0 8px;
}
.components-draggable {
  height: 100%;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  border: 1px dashed #409eff;
}
.components-item {
  position: relative;
  background: #72b1edf0;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 0.5em 1em;
}

.components-item:hover .el-icon-delete-solid {
  display: inline;
  color: red;
}
.components-body {
  line-height: 30px;
  border: 1px solid sandybrown;
}
.el-icon-delete-solid {
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
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
</style>
