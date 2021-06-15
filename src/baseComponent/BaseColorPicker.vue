<template>
  <div class="color-picker-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-color-picker v-model="propsData.value"></el-color-picker>
  </div>
</template>

<script>
export default {
  name: "BaseColorPicker",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.color-picker-main {
  display: flex;
  width: 100%;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
