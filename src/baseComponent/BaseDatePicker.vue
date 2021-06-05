<template>
  <div
    class="date-picker-main"
    :style="propsData.magin + 'float:' + propsData.float"
  >
    <span v-if="propsData.label">
      {{ propsData.label }}
    </span>
    <el-date-picker
      :style="propsData.width + propsData.height"
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
  margin-top: 10px;
  width: 90px;
}
</style>
