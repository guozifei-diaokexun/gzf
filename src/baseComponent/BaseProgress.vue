<template>
  <div class="progress-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-progress
      style="width: 100%"
      :percentage="propsData.value"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name: "BaseProgress",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.progress-main {
  display: flex;
  width: 100%;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
