<template>
  <div class="input-main" :style="propsData.magin">
    <div class="i-label el-col" :class="'el-col-' + propsData.labelwidth">
      <span v-if="propsData.label" :title="propsData.label">
        {{ propsData.label }}
      </span>
    </div>
    <div class="el-col" :class="'el-col-' + propsData.width">
      <el-input v-bind="propsData" v-model="propsData.value" />
    </div>
  </div>
</template>

<script>
// 单行文本框组件
export default {
  name: "BaseInput",
  computed: {
    propsData() {
      console.log(this.$attrs.propValues);
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.input-main {
  display: flex;
  width: 100%;
}
.i-label {
  padding: 0.5em 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
