<template>
  <div class="date-picker-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-date-picker
      v-model="propsData.value"
      :type="propsData.type"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "BaseDatePicker",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.date-picker-main {
  display: flex;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
