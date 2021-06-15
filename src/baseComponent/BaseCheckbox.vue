<template>
  <div class="checkbox-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-checkbox-group v-model="propsData.value">
      <el-checkbox
        :label="item.value"
        v-for="(item, index) in propsData.selectOptions"
        :key="index"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>
<style scoped>
.checkbox-main {
  display: flex;
  line-height: 30px;
}
span {
  width: 90px;
}
</style>