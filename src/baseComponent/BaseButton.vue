<template>
  <el-button
    :style="propsData.magin + 'float:' + propsData.float"
    v-bind="propsData"
    :type="propsData.type ? propsData.type : 'primary'"
  >
    {{ propsData.value }}
  </el-button>
</template>

<script>
export default {
  name: "BaseButton.vue",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
</style>
