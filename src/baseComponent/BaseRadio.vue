<template>
  <div class="radio-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-radio
      v-model="propsData.value"
      :label="item.value"
      v-for="(item, index) in propsData.selectOptions"
      :key="index"
    >
      {{ item.label }}
    </el-radio>
  </div>
</template>

<script>
export default {
  name: "BaseRadio",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.radio-main {
  display: flex;
  line-height: 30px;
}
</style>
