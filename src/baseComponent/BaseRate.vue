<template>
  <div class="rate-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-rate v-model="propsData.value"></el-rate>
  </div>
</template>

<script>
export default {
  name: "BaseRate",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.rate-main {
  display: flex;
  width: 100%;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
