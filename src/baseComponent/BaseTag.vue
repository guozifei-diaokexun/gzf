<template>
  <el-tag :type="propsData.type">{{ propsData.value }}</el-tag>
</template>

<script>
export default {
  name: "BaseTag",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>
