<template>
  <div class="list-group" @drop="handleDrop" @dragover="handleDropOver">
    <!--activeIndex: {{ activeIndex }}-->
    <!--component: {{ componentList }}-->
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      style="position: relative"
    >
      <div
        class="list-group-item"
        v-for="(element, index) in componentList"
        :key="element.id"
        @contextmenu.prevent="handleContextMenu"
        @mousedown="handleWrapMouseDown(index, $event)"
        @click="handleItemClick(index)"
      >
        <div v-if="activeIndex === index">
          <div
            class="shape-point"
            v-for="(item, idx) in pointList"
            :key="idx"
            :style="getPointStyle(item)"
            @mousedown="handlePointMouseDown(item, idx)"
          ></div>
          <context-menu :isShow.sync="isShow" :anchorData="anchorData" />
        </div>
        <component :is="element.component" :propValues="element" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import leftComponentJson from "@/utils/leftComponentJson";
import { pointList, resizeMap } from "@/utils/constants";
import KeyControl from "@/utils/KeyControl";
import ContextMenu from "./ContextMenu";

export default {
  name: "CenterContainer",
  components: { ContextMenu },
  data() {
    return {
      leftComponentJson,
      pointList,
      resizeMap,
      form: {},
      defaultStyle: {},
      activeElement: null,
      copyStyle: null,
      keyControl: null,
      isShow: false, //是否显示右侧菜单,
      anchorData: null, //右键菜单锚点的位置（距离顶部、距离左边）
      rules: {},
    };
  },
  computed: {
    ...mapState({
      componentList: (state) => state.canvas.componentList,
      activeIndex: (state) => state.canvas.activeIndex,
      rightPanelData: (state) => state.canvas.rightPanelData,
    }),
  },
  watch: {
    rightPanelData: {
      handler(data) {
        const { field, requiredMsg } = data;
        if (data.isRequired) {
          this.$set(this.rules, field, [
            { required: true, message: requiredMsg, trigger: "change" },
          ]);
          this.$forceUpdate();
        } else {
          this.$delete(this.rules, field);
          this.$refs["form"].clearValidate();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.keyControl = new KeyControl();
    this.keyControl.initListen();
  },
  methods: {
    handleItemClick(index) {
      this.handleHighLightStyle(index);
      this.keyControl.initEle(this.activeElement);
    },
    handleHighLightStyle(index) {
      this.activeElement = document.getElementsByClassName(
        "list-group-item highLight"
      )[0];
      this.defaultStyle = {
        height: this.activeElement.clientHeight,
        width: this.activeElement.clientWidth,
        left: Number(this.activeElement.style.left.split("px")[0]),
        top: Number(this.activeElement.style.top.split("px")[0]),
      };
      this.$store.dispatch("changeActiveIndex", index);
      this.$store.dispatch("saveWrapStyle", {
        style: this.defaultStyle,
        index,
      });
    },
    handleWrapMouseDown(index, e) {
      // 元素移动
      e.stopPropagation();

      const wrap = document.getElementsByClassName("list-group-item");
      for (let i = 0; i < wrap.length; i++) {
        const item = wrap[i];
        i === index
          ? item.classList.add("highLight")
          : item.classList.remove("highLight");
      }
      this.$store.dispatch("setRightPanelData", this.componentList[index]);

      this.handleHighLightStyle(index);

      // 最开始点击的坐标X,Y
      const startX = e.clientX;
      const startY = e.clientY;

      //开始的top 、left
      const { top, left } = this.defaultStyle;

      const mouseMove = (event) => {
        const currX = event.clientX;
        const currY = event.clientY;
        const moveY = currY - startY + top;
        const moveX = currX - startX + left;

        this.activeElement.style.top = `${moveY}px`;
        this.activeElement.style.left = `${moveX}px`;
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      const index = Number(e.dataTransfer.getData("index"));
      const timeStamp = new Date().getTime();
      const componentData = {
        ...leftComponentJson[index],
        field: leftComponentJson[index].field + timeStamp,
        id: timeStamp,
      };
      this.$store.dispatch("addShapeData", componentData);
      this.$store.dispatch("changeActiveIndex", this.componentList.length - 1);

      this.handleCurrentHighLight(this.componentList.length - 1, e);
      this.$store.dispatch("setRightPanelData", componentData);
    },
    getPointStyle(item) {
      const { width, height } = this.defaultStyle;

      const curEleWidth = width;
      const curEleHeight = height;

      const hasT = /t/.test(item);
      const hasR = /r/.test(item);
      const hasB = /b/.test(item);
      const hasL = /l/.test(item);

      // x,y轴坐标默认为0
      let coordX = 0;
      let coordY = 0;

      // 为四个角的点
      if (item.length > 1) {
        coordX = hasL ? 0 : curEleWidth;
        coordY = hasT ? 0 : curEleHeight;
      } else {
        // 上下的中点
        if (hasT || hasB) {
          coordX = curEleWidth / 2;
          coordY = hasT ? 0 : curEleHeight;
        }

        // 左右的中点
        if (hasL || hasR) {
          coordX = hasL ? 0 : curEleWidth;
          coordY = curEleHeight / 2;
        }
      }

      const style = {
        marginLeft: hasR ? "-6px" : "-4px",
        marginTop: "-5px",
        left: `${coordX}px`,
        top: `${coordY}px`,
        cursor: this.resizeMap[item] + "-resize",
      };
      return style;
    },
    handlePointMouseDown(point) {
      const downEvent = window.event;
      downEvent.stopPropagation();
      downEvent.preventDefault();

      // 最开始点击的坐标X,Y
      const startX = downEvent.clientX;
      const startY = downEvent.clientY;

      const mouseMove = (event) => {
        const currX = event.clientX;
        const currY = event.clientY;
        const moveY = currY - startY;
        const moveX = currX - startX;

        //当前点击的组件的默认样式
        const currentEle = document.getElementsByClassName(
          "list-group-item highLight"
        )[0];
        const { width, height, top, left } = this.defaultStyle;

        const hasT = /t/.test(point);
        const hasR = /r/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const newHeight = height + (hasT ? -moveY : hasB ? moveY : 0);
        const newWidth = width + (hasL ? -moveX : hasR ? moveX : 0);

        // 小于原来元素宽度高度的40%，不允许再小了
        if (
          newWidth < this.copyStyle.width * 0.4 ||
          newHeight < this.copyStyle.height * 0.4
        ) {
          return;
        }

        this.defaultStyle = {
          height: newHeight > 0 ? newHeight : 0,
          width: newWidth > 0 ? newWidth : 0,
          left: left + (hasL ? moveX : 0),
          top: top + (hasT ? moveY : 0),
        };

        // console.log('new ===>', newWidth, this.copyStyle.width, newHeight,this.copyStyle.height)
        // console.log('distance ==>', moveX, moveY)

        currentEle.style.height = this.defaultStyle.height + "px";
        currentEle.style.width = this.defaultStyle.width + "px";
        currentEle.style.left = this.defaultStyle.left + "px";
        currentEle.style.top = this.defaultStyle.top + "px";
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    },
    handleContextMenu(e) {
      // 显示右键菜单
      const { offsetX, offsetY } = e;
      this.isShow = true;
      this.anchorData = { left: offsetX + "px", top: offsetY + "px" };
    },
    /*添加点击高亮的样式*/
    handleCurrentHighLight(index, e) {
      setTimeout(() => {
        const wrap = document.getElementsByClassName("list-group-item");
        for (let i = 0; i < wrap.length; i++) {
          const item = wrap[i];
          if (i === index) {
            item.classList.add("highLight");

            item.style.top = `${e.offsetY - 20}px`;
            item.style.left = `${e.offsetX - 60}px`;
            this.defaultStyle = {
              width: item.clientWidth,
              height: item.clientHeight,
              top: e.offsetY - 20,
              left: e.offsetX - 60,
            };

            this.$store.dispatch("saveWrapStyle", {
              style: this.defaultStyle,
              index,
            });
            this.copyStyle = JSON.parse(JSON.stringify(this.defaultStyle));
            this.keyControl.initEle(item);
          } else {
            item.classList.remove("highLight");
          }
        }
      }, 100);
    },
    handleDropOver(e) {
      e.preventDefault(); // 阻止默认行为
    },
  },
};
</script>

<style scoped>
.list-group {
  min-width: 55vw;
  min-height: 80vh;
  margin: 0 auto;
  border-left: 1px solid #cacaca;
  border-right: 1px solid #cacaca;
  position: relative;
}

.list-group-item {
  /*width: 250px;*/
  /*height: 0;*/
  padding: 10px;
  height: 40px;
  position: absolute;
}

.list-group-item:hover {
  background-color: #fff !important;
  cursor: move;
}

.shape-point {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  border: 1px solid #3a52ff;
}

.highLight {
  border: 2px dotted #c1d1f6;
}
</style>
