<template>
  <div class="number-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-input-number
      v-model="propsData.value"
      v-bind="propsData"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.number-main {
  display: flex;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
