<template>
  <div class="cascader-main">
    <span
      v-if="!isDialog && propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-cascader
      v-model="propsData.value"
      :show-all-levels="false"
      :options="propsData.cascaderData"
      :props="{ expandTrigger: 'hover' }"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "BaseCascader",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
    isDialog() {
      return this.$attrs.isDialog;
    },
  },
};
</script>

<style scoped>
.cascader-main {
  display: flex;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
