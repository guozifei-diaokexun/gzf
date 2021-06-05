<template>
  <el-aside width="200px" class="wrap">
    <div class="component-list">
      <div
        v-for="(ele, index) in leftList"
        :key="ele.id"
        draggable
        @dragstart="handleDragStart"
        class="item"
        :data-index="index"
      >
        <div class="components-body">
          <i :class="ele.componentIcon"></i>
          <div class="text-style">{{ ele.componentName }}</div>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script>
import leftList from "../utils/leftComponentJson";

export default {
  name: "LeftAside",
  data: function () {
    return {
      leftList,
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 80vh;
  padding: 0 20px;
}

.text-style {
  padding-left: 4px;
  margin-top: -4px;
}

.components-body {
  display: flex;
  justify-content: center;
  padding: 12px;
  border-radius: 4px;
  border: 1px dashed;
  margin: 14px 0;
}
</style>
