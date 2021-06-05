<template>
  <div
    class="textarea-main"
    :style="propsData.magin + 'float:' + propsData.float"
  >
    <span v-if="propsData.label" :style="propsData.style">
      {{ propsData.label }}
    </span>
    <el-input
      type="textarea"
      :style="propsData.width + propsData.height"
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
  margin-top: 10px;
  width: 90px;
}
</style>
