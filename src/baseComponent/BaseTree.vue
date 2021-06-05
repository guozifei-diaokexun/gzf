<template>
  <div class="tree-main" :style="propsData.magin + 'float:' + propsData.float">
    <el-tree
      :data="propsData.treeDate"
      :show-checkbox="propsData.checkbox"
      :style="propsData.style"
      ref="tree"
    >
      <div class="tree-node" slot-scope="{ node, data }">
        <span v-for="(item, index) in propsData.additionalLable" :key="index">
          {{ data[item] }}
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "BaseTree",
  computed: {
    propsData() {
      return this.$attrs.propValues;
    },
  },
};
</script>

<style scoped>
.tree-main {
  display: flex;
}
span {
  margin-right: 80px;
  width: 50px;
}
</style>
