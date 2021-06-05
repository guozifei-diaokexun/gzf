<template>
  <div
    class="number-main"
    :style="propsData.magin + 'float:' + propsData.float"
  >
    <span :style="propsData.style" v-if="propsData.label">
      {{ propsData.label }}
    </span>
    <el-input-number
      :style="propsData.width + propsData.height"
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
  margin-top: 10px;
  width: 90px;
}
</style>
