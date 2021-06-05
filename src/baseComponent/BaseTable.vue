<template>
  <div class="table-main" :style="propsData.magin + 'float:' + propsData.float">
    <el-table
      :data="propsData.tableData"
      border
      height="100%"
      :style="propsData.style"
    >
      <el-table-column
        :prop="item.value"
        :label="item.label"
        v-for="(item, i) in propsData.lableList"
        :key="i"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tableComponent",
  computed: {
    propsData() {
      console.log(this.$attrs.propValues);
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.table-main {
  display: flex;
  width: 100%;
}
span {
  width: 90px;
}
</style>
