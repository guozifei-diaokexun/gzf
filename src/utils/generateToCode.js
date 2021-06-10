
var i = 0; 
var returnList = []
var dialogStr = ''

/**
 * 分别执行对应的组件，渲染成字符串形式
 * @param data
 * @returns {string} 组件字符串形式
 */
const transferToComponentString = (data) => {
   const { name } = data;
   let funcName = `${name}ToString`;
   return window[funcName](data);
};

//将 拖动的代码变成字符串模板
const generateTemplateToString = (list) => {
  returnList = []
  let outerText =  `<template>
    <div>`;
  for(let i = 0; i < list.length; i++) {
    const item = list[i];
    outerText += `\n<div style='float:left;${item.magin}${item.maxWidth ? 'width:100%;' : ''}display: flex;'>`+ transferToComponentString(item)+`</div>\n`;
  }
    outerText += `
      ${dialogStr}
    </div>
</template>`;
  return outerText;
};
// 转化tree
window['treeToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  let additionalLable = 'additionalLable'+(i++);
  returnList.push(`\n${name}:[]`)
  returnList.push(`\n${additionalLable}:[]`)
  return `\n    <el-tree
            :data="${name}"
            :show-checkbox="${data.checkbox}"
            style="float:${data.float}"
            ref="tree">
            <div class="tree-node" slot-scope="{ node, data }">
              <span v-for="(item, index) in ${additionalLable}" :key="index">
                {{ data[item] }}
              </span>
            </div>
          </el-tree>`
};

// 转化分页
window['paginationToString'] = function inputNumberToString(data) {
  let pageNum = 'pageNum'+(i++);
  let pageSize = 'pageSize'+(i++);
  let total = 'total'+(i++);
  returnList.push(`\n${pageNum}:${data.pageNum}`)
  returnList.push(`\n${pageSize}:${data.pageSize}`)
  returnList.push(`\n${total}:${data.total}`)
  return `\n   <el-pagination
              style="float:${data.float}"
              :current-page="${pageNum}"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="${pageSize}"
              layout="total, sizes, prev, pager, next, jumper"
              :total="${total}"
              ></el-pagination>`
};

// 转化table
window['tableToString'] = function inputNumberToString(data) {
    const name = data.field+(i++);
    let tableLableList = 'tableLableList'+(i++);
    returnList.push(`\n${name}:[]`)
    returnList.push(`\n${tableLableList}:[]`) 
    return `\n<el-table
              :data="${name}"
              border
              height="100%"
              >
              <el-table-column
                :prop="item.value"
                :label="item.label"
                v-for="(item, i) in ${tableLableList}"
                :key="i"
              ></el-table-column>
              </el-table>`
};

// 转化时间日期选择器
window['datePickerToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  if(data.dateType != 'datetimerange'){
    returnList.push(`\n${name}:new Date()`)
  }else{
    returnList.push(`\n${name}:[new Date(),new Date()]`)
  }
  return `\n<span style='width:${data.labelWidth ? data.labelWidth : 90}px;line-height: 36px;'>${data.label}</span>
      <el-date-picker :style="${data.width+data.heigth}" v-model="${name}" type="${data.dateType}" placeholder="${data.placeholder ? data.placeholder:''}"  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>`
};

// 转化select
window['selectToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  let selectOptions = 'selectOptions'+(i++);
  returnList.push(`\n${name}:''`)
  returnList.push(`\n${selectOptions}:[]`)
  return `\n<span style='width:${data.labelWidth ? data.labelWidth : 90}px;line-height: 36px;'>${data.label}</span>
      <el-select v-model="${name}" ${data.disabled ? "disabled='disabled'":''} :style="${data.width+data.heigth}" placeholder="${data.placeholder}">
        <el-option
          v-for="(item,index) in ${selectOptions}"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>`;
};
// 转化按钮
window['buttonToString'] = function buttonToString(data) {
  return `\n<el-button class='${data.icon}' type="${data.type ? data.type :'primary'}" ${data.disabled ? 'disabled=disabled':''}>${data.value}</el-button>`;
};

// 转化inputNumber
window['inputNumberToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span style='width:${data.labelWidth ? data.labelWidth : 90}px;line-height: 36px;'>${data.label}</span>
  <el-input-number v-model="${name}" :style="${data.width+data.heigth}" :min="${data.min}" :max="${data.max}" :step="${data.step}" :precision="${data.precision}" controls-position="${data['controls-position']}"/>`;
};

// 转化多行文本
window['textAreaToString'] = function textAreaToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span style='width:${data.labelWidth ? data.labelWidth : 90}px;line-height: 36px;'>${data.label}</span>
  <el-input v-model='${name}' type='textarea' placeholder="${data.placeholder}" :style="${data.width+data.heigth}" />`;
};

//转化input
window['inputToString'] = function inputToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span style='width:${data.labelWidth ? data.labelWidth : 90}px;line-height: 36px;'>${data.label}</span>
  <el-input v-model='${name}' placeholder="${data.placeholder}" :style="${data.width+data.heigth}" />`;
};

const renderScriptString = () => {
  return `
 <script>
  export default {
   name: "ListPage",
   data() {
    return {
            ${returnList.toString()}
        }
      },
   methods: {
      
    },
   }
 </script>
  `
};

export const finalRenderToCode = (list) => {
  const templateString = generateTemplateToString(list);
  const scriptString = renderScriptString(list);
  return templateString + '\n' + scriptString;
};
