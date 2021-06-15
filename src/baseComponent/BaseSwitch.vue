<template>
  <el-switch
    v-model="propsData.value"
    :active-text="propsData.activeText"
    :inactive-text="propsData.inactiveText"
  ></el-switch>
</template>

<script>
export default {
  name: "BaseSwitch",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>