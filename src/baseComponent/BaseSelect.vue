<template>
  <div
    class="select-main"
    :style="propsData.magin + 'float:' + propsData.float"
  >
    <span v-if="propsData.label">{{ propsData.label }}</span>
    <el-select
      v-model="propsData.value"
      v-bind="propsData"
      placeholder="请选择"
      :prop="propsData.field"
      :style="propsData.width + propsData.height"
    >
      <el-option
        v-for="item in propsData.selectOptions"
        :key="item.index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.select-main {
  display: flex;
}
span {
  margin-top: 10px;
  width: 90px;
}
</style>
