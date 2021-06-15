<template>
  <el-pagination
    :style="'float:' + propsData.float"
    :current-page="propsData.pageNum"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="propsData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="propsData.total"
  ></el-pagination>
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
  line-height: 36px;
  width: 90px;
}
</style>
