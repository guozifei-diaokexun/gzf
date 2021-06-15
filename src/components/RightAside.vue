<template>
  <el-aside
    width="320px"
    class="right"
    v-if="JSON.stringify(this.rightPanelData) != '{}'"
  >
    <el-scrollbar>
      <el-form label-position="left" label-width="90px">
        <el-divider content-position="center" v-if="isDialog">
          表单属性
        </el-divider>
        <!-- 是否在弹框上使用from表单 -->
        <el-form-item v-if="isDialog" label="使用表单">
          <el-switch
            v-model="switchIsFrom"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchFrom"
          />
        </el-form-item>

        <!-- 统一标题宽度 -->
        <el-form-item v-if="isFrom && isDialog" label="标题宽度">
          <el-input
            v-model="inputLabelWidth"
            placeholder="请输入统一标题宽度"
            @change="changeLabelWidth"
          />
        </el-form-item>
        <el-divider v-if="isDialog"></el-divider>
        <el-form-item v-if="use('from_field')" label="字段名">
          <el-input
            v-model="rightPanelData.field"
            @change="changeField()"
            placeholder="请输入字段名"
          />
        </el-form-item>
        <el-form-item v-if="use('from_lable')" label="标题">
          <el-input v-model="rightPanelData.label" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item
          v-if="use('from_lable_width') && (isDialog ? !isFrom : true)"
          label="标题宽度"
        >
          <el-input
            v-model="rightPanelData.labelWidth"
            placeholder="请输入标题宽度"
          />
        </el-form-item>

        <!-- 滑块最大值最小值 -->
        <el-form-item v-if="use('from_range')" label="滑动范围">
          <el-row>
            <el-col :span="4">
              <span>最小</span>
            </el-col>
            <el-col :span="8">
              <el-input v-model="rightPanelData.minValue" />
            </el-col>
            <el-col :span="4">
              <span>最大</span>
            </el-col>
            <el-col :span="8">
              <el-input v-model="rightPanelData.maxValue" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 滑块最大值最小值 -->

        <!-- 表单栅格 -->
        <el-form-item label="栅格" v-if="rightPanelData.span !== undefined">
          <el-row>
            <el-col :span="23">
              <el-slider
                v-model="rightPanelData.span"
                :min="0"
                :max="24"
              ></el-slider>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 表单栅格 -->

        <!-- 开关文字 -->
        <el-form-item label="开启文字" v-if="use('from_swith_text')">
          <el-input v-model="rightPanelData.activeText" />
        </el-form-item>
        <el-form-item label="关闭文字" v-if="use('from_swith_text')">
          <el-input v-model="rightPanelData.inactiveText" />
        </el-form-item>
        <!-- 开关文字 -->

        <!-- 是否必须填写 -->
        <el-form-item
          v-if="use('from_required') && isFrom && isDialog"
          label="必填"
        >
          <el-switch
            v-model="rightPanelData.isRequired"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 是否必须填写 -->

        <!-- 显示值 -->
        <el-form-item v-if="use('from_value')" label="值">
          <el-input v-model="rightPanelData.value" placeholder="请输入值" />
        </el-form-item>
        <!-- 显示值 -->

        <!-- 占位符 -->
        <el-form-item v-if="use('from_placeholder')" label="占位符">
          <el-input v-model="rightPanelData.placeholder" placeholder="占位符" />
        </el-form-item>
        <!-- 占位符 -->

        <!-- 是否禁用 -->
        <el-form-item v-if="use('from_disabled')" label="禁用">
          <el-switch
            v-model="rightPanelData.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 是否禁用 -->

        <!-- 可清空 -->
        <el-form-item v-if="use('from_clearable')" label="可清空">
          <el-switch
            v-model="rightPanelData.clearable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 可清空 -->

        <!-- 可搜索 -->
        <el-form-item v-if="use('from_filterable')" label="可搜索">
          <el-switch
            v-model="rightPanelData.filterable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 可搜索 -->

        <!-- 多选 -->
        <el-form-item v-if="use('from_multiple')" label="多选">
          <el-switch
            v-model="rightPanelData.multiple"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 多选 -->

        <!-- 步长 -->
        <el-form-item v-if="use('from_step')" label="步长">
          <el-input-number v-model="rightPanelData.step" placeholder="步长" />
        </el-form-item>
        <!-- 步长 -->

        <!-- 精度 -->
        <el-form-item v-if="use('from_precision')" label="精度">
          <el-input-number
            v-model="rightPanelData.precision"
            :min="0"
            placeholder="精度"
          />
        </el-form-item>
        <!-- 精度 -->

        <!-- 加减按钮位置 -->
        <el-form-item v-if="use('from_controls_position')" label="按钮位置">
          <el-switch
            v-model="rightPanelData['controls-position']"
            active-value="right"
            inactive-value="''"
            inactive-text="标准"
            active-text="右侧"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 加减按钮位置 -->

        <!-- 最小行数 -->
        <el-form-item v-if="use('from_text_rows')" label="最小行数">
          <el-input-number v-model="rightPanelData.minRows" :min="0" />
        </el-form-item>
        <!-- 最小行数 -->

        <!-- 最大行数 -->
        <el-form-item v-if="use('from_text_rows')" label="最大行数">
          <el-input-number v-model="rightPanelData.maxRows" :min="0" />
        </el-form-item>
        <!-- 最大行数 -->

        <el-form-item v-if="use('from_type')" label="类型">
          <el-select v-model="rightPanelData.type" placeholder="请选择">
            <el-option
              v-for="item in rightPanelData.type_list"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="use('from_icon')" label="按钮图标">
          <el-input
            v-model="rightPanelData['icon']"
            placeholder="请选择按钮图标名称"
          >
            <el-button
              slot="append"
              icon="el-icon-thumb"
              @click="openIconsDialog('icon')"
            >
              选择
            </el-button>
          </el-input>
        </el-form-item>

        <el-form-item v-if="use('from_magin')" label="偏移">
          <el-row>
            <el-col :span="4">
              <span>向上</span>
            </el-col>
            <el-col :span="8">
              <el-input v-model="styleData.top" @change="styleCalculation()" />
            </el-col>
            <el-col :span="4">
              <span>向下</span>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="styleData.bottom"
                @change="styleCalculation()"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span>向左</span>
            </el-col>
            <el-col :span="8">
              <el-input v-model="styleData.left" @change="styleCalculation()" />
            </el-col>
            <el-col :span="4">
              <span>向右</span>
            </el-col>
            <el-col :span="8">
              <el-input v-model="styleData.right" @blur="styleCalculation()" />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 浮动 -->
        <el-form-item v-if="use('from_float')" label="浮动">
          <el-radio-group v-model="rightPanelData.float">
            <el-radio label="left">左</el-radio>
            <el-radio label="right">右</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 浮动 -->

        <!-- 绑定弹框 -->
        <el-form-item v-if="use('from_binding_dialog')" label="绑定弹框">
          <el-select v-model="rightPanelData.dialogKey" placeholder="请选择">
            <el-option
              v-for="(item, index) in dialogTemplateList"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 绑定弹框 -->

        <!-- 表格控制器 -->
        <el-form-item v-show="use('from_table_header')" label="表头信息">
          <el-input
            type="textarea"
            v-model="rightPanelData.lablestr"
            placeholder="输入格式为:表头名称/英文名称,多个数据用英文','分割"
            @change="tableLableAnalysis()"
          />
        </el-form-item>
        <!-- 表格控制器 -->

        <!-- tree控制器 -->
        <el-form-item v-show="use('from_tree_column')" label="添加列">
          <el-input
            type="textarea"
            v-model="rightPanelData.additionalLableStr"
            placeholder="输入内容中有的字段,格式为:字段1,字段2"
            @change="additionalLableAnalysis()"
          />
        </el-form-item>
        <el-form-item v-show="use('from_tree_checkbox')" label="可选择">
          <el-switch
            v-model="rightPanelData.checkbox"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- tree控制器 -->

        <!--下拉options-->
        <el-form-item
          v-if="use('from_tree_options')"
          v-for="(item, index) in rightPanelData.selectOptions"
          :label="'选项' + (index + 1)"
          :key="index"
        >
          <div style="display: flex; flex-direction: row">
            <el-input v-model="item.label" style="width: 50%"></el-input>
            <el-input v-model="item.value" style="width: 50%"></el-input>
            <el-button
              type="primary"
              circle
              icon="el-icon-minus"
              @click.prevent="removeSelectOptions(index)"
            ></el-button>
            <el-button
              type="danger"
              circle
              icon="el-icon-plus"
              @click="addSelectOptions"
            ></el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <icons-dialog
      :visible.sync="iconsVisible"
      :current="rightPanelData[currentIconType]"
      @select="setIcon"
    />
  </el-aside>
</template>
<script>
import { mapState } from "vuex";
import IconsDialog from "./IconsDialog";

export default {
  name: "RightAside",
  components: { IconsDialog },
  props: {
    labelWidth: {
      type: Number,
    },
    dialogTemplateList: {
      true: Array,
      default: [],
    },
    isDialog: {
      true: Boolean,
      default: false,
    },
    isFrom: {
      true: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIconType: "",
      iconsVisible: false,
      width: undefined,
      height: undefined,
      styleData: {},
      style: {
        bottom: "margin-top",
        top: "margin-bottom",
        right: "margin-left",
        left: "margin-right",
      },
      inputLabelWidth: this.labelWidth,
      switchIsFrom: this.isFrom,
    };
  },
  watch: {
    rightPanelData: {
      handler() {
        this.styleData = {};
        this.width = undefined;
        this.height = undefined;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      rightPanelData: (state) => state.canvas.rightPanelData,
    }),
  },
  methods: {
    openIconsDialog(iconType) {
      this.iconsVisible = true;
      this.currentIconType = iconType;
    },
    setIcon(val) {
      this.rightPanelData[this.currentIconType] = val;
    },
    removeSelectOptions(index) {
      this.rightPanelData.selectOptions.splice(index, 1);
    },
    addSelectOptions() {
      this.rightPanelData.selectOptions.push({ label: "", value: "" });
    },
    //设置弹框表单的标题宽度
    changeLabelWidth() {
      this.$emit("update:labelWidth", Number.parseInt(this.inputLabelWidth));
    },
    switchFrom() {
      this.$emit("update:isFrom", this.switchIsFrom);
    },
    //是否显示配置属性
    use(str) {
      if (
        JSON.stringify(this.rightPanelData) != "{}" &&
        this.rightPanelData.from_type_list.indexOf(str) > -1
      ) {
        return true;
      }
      return false;
    },
    //样式组装
    styleCalculation() {
      let str = "";
      for (let key in this.styleData) {
        if (this.styleData[key]) {
          let name = this.style[key] ? this.style[key] : key;
          str += name + ":" + this.styleData[key] + "px;";
        }
      }
      this.rightPanelData.magin = str;
    },

    //树形结构额外列处理
    additionalLableAnalysis() {
      if (this.rightPanelData.additionalLableStr) {
        try {
          this.rightPanelData.additionalLable =
            this.rightPanelData.additionalLableStr.split(",");
          return;
        } catch (er) {
          this.$message.success("格式有误");
        }
        this.$message.success("格式有误");
      }
    },
    //字段名调整后验证
    changeField() {
      if (!this.$parent.$parent.$parent.reviewName(this.rightPanelData.field)) {
        this.rightPanelData.field = "";
      }
    },
    //时间选择器类型选择后数据处理
    dateSelct() {
      if (this.rightPanelData.dateType == "datetimerange") {
        this.rightPanelData.value = [new Date(), new Date()];
      } else {
        this.rightPanelData.value = new Date().toString();
      }
    },
    //table表头解析
    tableLableAnalysis() {
      let tableHaderList = [];
      if (this.rightPanelData.lablestr) {
        try {
          let haderList = this.rightPanelData.lablestr.split(",");
          if (haderList.length <= 0) {
            haderList = haderList.push(this.rightPanelData.lablestr);
          }
          haderList.forEach((element) => {
            let lableList = element.split("/");
            tableHaderList.push({
              label: lableList[0],
              value: lableList[1],
            });
          });
          this.rightPanelData.lableList = tableHaderList;
          return;
        } catch (er) {
          this.$message.success("格式有误");
        }
        this.$message.success("格式有误");
      }
    },
  },
};
</script>

<style scoped>
.right {
  width: 350px;
  padding: 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
