<template>
  <el-dialog
    title="选择按钮"
    v-bind="$attrs"
    :modal-append-to-body="false"
    width="750px"
    >
    <div slot="title">
      选择图标
      <el-input
        v-model="searchKey"
        size="mini"
        :style="{width: '260px'}"
        placeholder="请输入图标名称"
        prefix-icon="el-icon-search"
        clearable
      />
    </div>
    <ul class="iconWrap">
      <li v-for="item in iconList" :key="item" @click="onSelect(item)">
        <i :class="item"></i>
        <div>{{ item }}</div>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
  import iconList from '@/utils/iconJson.js'
  const originList = iconList.map(name => `el-icon-${name}`);

  export default {
    name: 'IconsDialog',
    data() {
      return {
        iconList: originList,
        active: null,
        searchKey: ''
      }
    },
    watch: {
      searchKey(val) {
        if(val) {
          this.iconList = this.iconList.filter(item => item.includes(val));
        }else {
          this.iconList = originList;
        }
      }
    },
    methods: {
      onSelect(icon) {
        this.active = icon
        this.$emit('select', icon)
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style scoped>
 .iconWrap {
    display: flex;
    flex-wrap: wrap;
 }
 .iconWrap li {
   width: 100px;
   padding: 30px;
   list-style: none;
   font-size: 16px;
   cursor: pointer;
 }

  .iconWrap li:hover {
    background: #a2e8ff;
    color: #fff;
  }
</style>
