<template>
  <div class="select-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-select
      v-model="propsData.value"
      :filterable="propsData.filterable"
      :clearable="propsData.clearable"
      :multiple="propsData.multiple"
      :multiple-limit="propsData['multiple-limit']"
      placeholder="请选择"
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
  line-height: 36px;
  width: 90px;
}
</style>
