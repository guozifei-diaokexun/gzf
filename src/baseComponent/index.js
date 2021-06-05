import Vue from 'vue';

const path = require('path');

// 获取所有以 .vue结尾的文件,注册全局组件
const fileArr = require.context('.', false, /\.vue$/);
fileArr.keys().forEach(key => {
  const name = path.basename(key, '.vue');
  const component = fileArr(key).default || fileArr(key);
  Vue.component(name,component);
})

