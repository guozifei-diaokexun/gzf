<template>
  <div class="slider-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-slider
      style="width: 100%"
      v-model="propsData.value"
      :min="propsData.minValue"
      :max="propsData.maxValue"
    ></el-slider>
  </div>
</template>

<script>
export default {
  name: "BaseSlider",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.slider-main {
  display: flex;
  width: 100%;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
