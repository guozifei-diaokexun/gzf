<template>
  <div class="textarea-main">
    <span
      v-if="propsData.label"
      :style="'width:' + propsData.labelWidth + 'px'"
    >
      {{ propsData.label }}
    </span>
    <el-input
      type="textarea"
      v-bind="propsData"
      v-model="propsData.value"
      :autosize="{ minRows: propsData.minRows, maxRows: propsData.maxRows }"
    />
  </div>
</template>

<script>
export default {
  name: "BaseTextArea",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.textarea-main {
  display: flex;
}
span {
  line-height: 36px;
  width: 90px;
}
</style>
