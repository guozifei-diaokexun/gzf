<template>
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
    <el-table-column label="操作" align="center" width="190" fixed="right">
      <template slot-scope="scope">
        <el-button icon="el-icon-edit" type="primary" size="mini">
          编辑
        </el-button>
        <el-button icon="el-icon-delete" type="danger" size="mini">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "tableComponent",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>
