<template>
  <el-aside width="350px" class="right" v-if="rightPanelData">
    <el-scrollbar>
      <el-form label-position="left" label-width="100px">
        <el-form-item v-if="rightPanelData.field !== undefined" label="字段名">
          <el-input v-model="rightPanelData.field" placeholder="请输入字段名" />
        </el-form-item>
        <el-form-item v-if="rightPanelData.label" label="标题">
          <el-input v-model="rightPanelData.label" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item v-if="rightPanelData.value !== undefined" label="值">
          <el-input v-model="rightPanelData.value" placeholder="请输入值" />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.placeholder !== undefined"
          label="占位符"
        >
          <el-input v-model="rightPanelData.placeholder" placeholder="占位符" />
        </el-form-item>
        <el-form-item v-if="rightPanelData.disabled !== undefined" label="禁用">
          <el-switch
            v-model="rightPanelData.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.clearable !== undefined"
          label="清空"
        >
          <el-switch
            v-model="rightPanelData.clearable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.filterable !== undefined"
          label="搜索过滤"
        >
          <el-switch
            v-model="rightPanelData.filterable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item v-if="rightPanelData.multiple !== undefined" label="多选">
          <el-switch
            v-model="rightPanelData.multiple"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item v-if="rightPanelData.step !== undefined" label="步长">
          <el-input-number v-model="rightPanelData.step" placeholder="步数" />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.precision !== undefined"
          label="精度"
        >
          <el-input-number
            v-model="rightPanelData.precision"
            :min="0"
            placeholder="精度"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData['step-strictly'] !== undefined"
          label="严格步数"
        >
          <el-switch
            v-model="rightPanelData['step-strictly']"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData['controls-position'] !== undefined"
          label="加减按钮位置"
        >
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
        <el-form-item
          v-if="rightPanelData.isAutosize !== undefined"
          label="自适应文本"
        >
          <el-switch
            v-model="rightPanelData.isAutosize"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="
            rightPanelData.isAutosize && rightPanelData.minRows !== undefined
          "
          label="最小行数"
        >
          <el-input-number v-model="rightPanelData.minRows" :min="0" />
        </el-form-item>
        <el-form-item
          v-if="
            rightPanelData.isAutosize && rightPanelData.maxRows !== undefined
          "
          label="最大行数"
        >
          <el-input-number v-model="rightPanelData.maxRows" :min="0" />
        </el-form-item>

        <el-form-item
          v-if="rightPanelData['show-password'] !== undefined"
          label="密码框"
        >
          <el-switch
            v-model="rightPanelData['show-password']"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData['show-word-limit'] !== undefined"
          label="字数统计"
        >
          <el-switch
            v-model="rightPanelData['show-word-limit']"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="
            rightPanelData['show-word-limit'] &&
            rightPanelData.minlength !== undefined
          "
          label="最小输入长度"
        >
          <el-input-number v-model="rightPanelData.minlength" :min="0" />
        </el-form-item>
        <el-form-item
          v-if="
            rightPanelData['show-word-limit'] &&
            rightPanelData.maxlength !== undefined
          "
          label="最大输入长度"
        >
          <el-input-number v-model="rightPanelData.maxlength" :min="0" />
        </el-form-item>
        <el-form-item v-if="rightPanelData.type !== undefined" label="类型">
          <el-select v-model="rightPanelData.type" placeholder="请选择">
            <el-option
              v-for="item in [
                'primary',
                'success',
                'info',
                'warning',
                'danger',
              ]"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          v-if="rightPanelData.plain !== undefined"
          label="朴素按钮"
        >
          <el-switch
            v-model="rightPanelData.plain"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item> -->
        <!-- <el-form-item
          v-if="rightPanelData.round !== undefined"
          label="圆角按钮"
        >
          <el-switch
            v-model="rightPanelData.round"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.circle !== undefined"
          label="圆形按钮"
        >
          <el-switch
            v-model="rightPanelData.circle"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="rightPanelData.loading !== undefined"
          label="是否加载中"
        >
          <el-switch
            v-model="rightPanelData.loading"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item> -->
        <el-form-item
          v-if="
            rightPanelData['icon'] !== undefined &&
            rightPanelData.component === 'BaseButton'
          "
          label="按钮图标"
        >
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

        <el-form-item
          v-if="
            rightPanelData.width != undefined ||
            rightPanelData.height != undefined ||
            rightPanelData.magin != undefined
          "
          label="样式"
        >
          <el-row>
            <el-col :span="4">
              <span>宽度</span>
            </el-col>
            <el-col :span="7">
              <el-input
                v-model="width"
                @change="rightPanelData.width = 'width:' + width + 'px;'"
              />
            </el-col>
            <el-col :span="4">
              <span>高度</span>
            </el-col>
            <el-col :span="7">
              <el-input
                v-model="height"
                @change="rightPanelData.height = 'height:' + height + 'px;'"
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <span>向上</span>
            </el-col>
            <el-col :span="7">
              <el-input v-model="styleData.top" @change="styleCalculation()" />
            </el-col>
            <el-col :span="4">
              <span>向下</span>
            </el-col>
            <el-col :span="7">
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
            <el-col :span="7">
              <el-input v-model="styleData.left" @change="styleCalculation()" />
            </el-col>
            <el-col :span="4">
              <span>向右</span>
            </el-col>
            <el-col :span="7">
              <el-input
                v-model="styleData.right"
                @change="styleCalculation()"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- <el-form-item
          v-if="rightPanelData.isRequired !== undefined"
          label="必填"
        >
          <el-switch
            v-model="rightPanelData.isRequired"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item> -->
        <el-form-item v-if="rightPanelData.isRequired" label="必填提示信息">
          <el-input v-model="rightPanelData.requiredMsg" />
        </el-form-item>

        <!--  -->
        <el-form-item
          v-if="
            rightPanelData.float !== undefined &&
            rightPanelData.maxWidth != undefined
          "
          label="浮动"
        >
          <el-radio-group v-model="rightPanelData.float">
            <el-radio label="left">左</el-radio>
            <el-radio label="right">右</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--  -->

        <!-- 是否占据一行 -->
        <el-form-item
          label="占据一行"
          v-if="rightPanelData.maxWidth !== undefined"
        >
          <el-switch
            v-model="rightPanelData.maxWidth"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- 是否占据一行 -->

        <!-- 表格控制器 -->
        <el-form-item v-show="rightPanelData.name == 'table'" label="表头信息">
          <el-input
            type="textarea"
            v-model="rightPanelData.lablestr"
            placeholder="输入格式为:表头名称/英文名称,多个数据用英文','分割"
            @change="tableLableAnalysis()"
          />
        </el-form-item>
        <!-- 表格控制器 -->

        <!-- 时间控制器 -->
        <el-form-item
          v-show="rightPanelData.component == 'BaseDatePicker'"
          label="类型"
        >
          <el-select
            v-model="rightPanelData.type"
            placeholder="请选择"
            @change="dateSelct"
          >
            <el-option label="日期" value="date"></el-option>
            <el-option label="日期时间" value="datetime"></el-option>
            <el-option label="日期时间范围" value="datetimerange"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间控制器 -->

        <!-- tree控制器 -->
        <el-form-item
          v-show="rightPanelData.component == 'BaseTree'"
          label="添加列"
        >
          <el-input
            type="textarea"
            v-model="rightPanelData.additionalLableStr"
            placeholder="输入内容中有的字段,格式为:字段1,字段2"
            @change="additionalLableAnalysis()"
          />
        </el-form-item>
        <el-form-item
          v-show="rightPanelData.component == 'BaseTree'"
          label="可选择"
        >
          <el-switch
            v-model="rightPanelData.checkbox"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <!-- tree控制器 -->

        <!--下拉options-->
        <el-form-item
          v-if="rightPanelData.selectOptions !== undefined"
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
      console.log(this.rightPanelData.magin);
      console.log(this.rightPanelData.width);
      console.log(this.rightPanelData.height);
    },

    //树形结构额外列处理
    additionalLableAnalysis() {
      if (this.rightPanelData.additionalLableStr) {
        try {
          this.rightPanelData.additionalLable = this.rightPanelData.additionalLableStr.split(
            ","
          );
          return;
        } catch (er) {
          this.$message.success("格式有误");
        }
        this.$message.success("格式有误");
      }
    },

    //时间选择器类型选择后数据处理
    dateSelct() {
      if (this.rightPanelData.type == "datetimerange") {
        this.rightPanelData.value = [];
        return;
      }
      this.rightPanelData.value = "";
    },
    //table表头解析
    tableLableAnalysis() {
      let tableHaderList = [];
      if (this.rightPanelData.lablestr) {
        try {
          let haderList = this.rightPanelData.lablestr.split(",");
          console.log(haderList);
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
