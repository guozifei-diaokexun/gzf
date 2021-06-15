<template>
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