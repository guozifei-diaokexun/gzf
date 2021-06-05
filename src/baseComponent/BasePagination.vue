<template>
  <div
    class="pagination-main"
    :style="propsData.magin + 'float:' + propsData.float"
  >
    <el-pagination
      :style="propsData.style"
      :current-page="propsData.pageNum"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="propsData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="propsData.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
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
