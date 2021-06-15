<template>
  <el-button
    v-bind="propsData"
    :type="propsData.type ? propsData.type : 'primary'"
  >
    {{ propsData.value }}
  </el-button>
</template>

<script>
export default {
  name: "BaseButton",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>