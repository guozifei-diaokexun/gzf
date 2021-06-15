<template>
  <div class="input-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-input v-bind="propsData" v-model="propsData.value" />
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
  width: 90px;
  line-height: 36px;
}
</style>
