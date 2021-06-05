<template>
  <div class="input-main" :style="propsData.magin + 'float:' + propsData.float">
    <span v-if="propsData.label">
      {{ propsData.label }}
    </span>
    <el-input
      :style="propsData.width + propsData.height"
      v-bind="propsData"
      v-model="propsData.value"
    />
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
.input-main {
  display: flex;
}
span {
  margin-top: 10px;
  width: 90px;
}
</style>
