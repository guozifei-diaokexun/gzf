// import { propsToText } from '@/utils';

// const formData = {};
// const rules = {}; //是否必填的
var i = 0; 
const returnList = []

/**
 * 分别执行对应的组件，渲染成字符串形式
 * @param data
 * @returns {string} 组件字符串形式
 */
// const transferToComponentString = (data) => {
//    const { name } = data;
//    let funcName = `${name}ToString`;
//    console.log(funcName)
//    return window[funcName](data);
// };

/**
 * 获取最终组件所需要渲染的属性值 对象集合，值为空的属性键名也不要
 * @param data
 */
// const getFinalNeededAttr = (data) => {
//   const cloneData = JSON.parse(JSON.stringify(data));
//   const { component, name, componentName, componentIcon, label, id,  ...otherData } = cloneData;
//   for(let key in otherData) {
//     const val = otherData[key];
//     if(val === "" || val === undefined) {
//       delete otherData[key];
//     }
//   }
//   return otherData;
// };

// //转化input
// window['inputToString'] = function inputToString(data) {
//   const resultData = getFinalNeededAttr(data);
//   const { field, value, isRequired, requiredMsg } = resultData;
//   if(value) { // 将value值赋值到formData中
//     formData[field] = value;
//     delete resultData.value;
//   }
//   if(isRequired) {
//     rules[field] = [{ required: true, message: requiredMsg, trigger: 'change' }];
//   }
//   delete resultData.field;
//   return `<el-input ${propsToText(resultData)} />`;
// };

// // 转化inputNumber
// window['inputNumberToString'] = function inputNumberToString(data) {
//   const resultData = getFinalNeededAttr(data);
//   const { field, value, isRequired, requiredMsg } = resultData;
//   if(value) { // 将value值赋值到formData中
//     formData[field] = value;
//     delete resultData.value;
//   }
//   if(isRequired) {
//     rules[field] = [{ required: true, message: requiredMsg, trigger: 'change' }];
//   }
//   delete resultData.field
//   return `<el-input-number ${propsToText(resultData)} />`;
// };

// // 转化按钮
// window['buttonToString'] = function buttonToString(data) {
//   const resultData = getFinalNeededAttr(data);
//   delete resultData.field;
//   delete resultData['v-model'];
//   let textValue = resultData.value;
//   delete resultData.value;
//   return `<el-button ${propsToText(resultData)} >${textValue}</el-button>`;
// };

//转化多行文本
// window['textAreaToString'] = function textAreaToString(data) {
//   const resultData = getFinalNeededAttr(data);
//   const { field, value, isRequired, requiredMsg } = resultData;
//   if(value) { // 将value值赋值到formData中
//     formData[field] = value;
//     delete resultData.value;
//   }
//   if(isRequired) {
//     rules[field] = [{ required: true, message: requiredMsg, trigger: 'change' }];
//   }
//   delete resultData.field
//   delete resultData['isAutosize'];
//   resultData['autosize'] = { minRows: data.minRows, maxRows: data.maxRows };
//   return `<el-input type='textarea' ${propsToText(resultData)} />`;
// };

// 剔除对象中的某个属性
const objectWithoutKey = (object, key) => {
  if(!object) { return {}; }
  if(!key) { return object; }
  const { [key]: removedKey, ...otherObject } = object;
  return otherObject;
}

//将 拖动的代码变成字符串模板
// const generateFormToString = (list) => {
//   let outerText =  `<template>
//     <el-form ref="form" :model="formData" label-width="120px" :rules="rules" style="position: relative">`;

//   let componentString,wrapStyle;

//   for(let i = 0; i < list.length; i++) {
//     const item = list[i];
//     const propsData = {label: item.label, prop: item.field};
//     wrapStyle = {style: {...item.wrapStyle, position: 'absolute'}};

//     // 剔除最外层包裹的属性style,
//     const formItemAttr = objectWithoutKey(item, 'wrapStyle');
//     formItemAttr['v-model'] = `formData.${item.field}`;

//     componentString = transferToComponentString(formItemAttr);
//     const itemString = formItemAttr.name.includes('button') ? `${componentString}`
//       : `<el-form-item ${propsToText(propsData)}>
//          ${componentString}
//        </el-form-item>`
//     // console.log(222,formItemAttr)
//     const formItemString = `
//       <div class="list-group-item" ${propsToText(wrapStyle)}>
//        ${itemString}
//       </div>`;
//     outerText += formItemString;
//   }
//     outerText += `
//     </el-form>
//  </template>`;
//   return outerText;
// };
//将 拖动的代码变成字符串模板
const generateTemplateToString = (list) => {
  let outerText =  `<template>
    <div>`;
  for(let i = 0; i < list.length; i++) {
    const item = list[i];
    outerText += `\n<div style='float:left;${item.magin}${item.maxWidth ? 'width:100%;' : ''}'>`+ transferToComponentString(item)+`</div>\n`;
  }
    outerText += `
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
            :style="float:${data.float}"
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
              :style="float:${data.float}"
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
  if(data.type != 'datetimerange'){
    returnList.push(`\n${name}:''`)
  }else{
    returnList.push(`\n${name}:[]`)
  }
  return `\n<span>{{${data.label}}}<span/>
      <el-date-picker :style="${data.width+data.heigth}" v-model="${name}" type="${data.type}" placeholder="${data.placeholder}  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>`
};

// 转化select
window['selectToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  let selectOptions = 'selectOptions'+(i++);
  returnList.push(`\n${name}:''`)
  returnList.push(`\n${selectOptions}:[]`)
  return `\n<span>{{${data.label}}}<span/>
      <el-select v-model="${name}" disabled="${data.disabled}" :style="${data.width+data.heigth}" placeholder="${data.placeholder}">
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
  return `\n<el-button class='${data.icon}' type="${data.type ? data.type :'primary'}" disabled="${data.disabled}">{{${data.value}}}</el-button>`;
};

// 转化inputNumber
window['inputNumberToString'] = function inputNumberToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span>{{${data.label}}}<span/>
  <el-input-number v-model="${name}" :style="${data.width+data.heigth}" :min="${data.min}" :max="${data.max}" :step="${data.step}" :precision="${data.precision}" controls-position="${data['controls-position']}"/>`;
};

// 转化多行文本
window['textAreaToString'] = function textAreaToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span>{{${data.label}}}<span/>
  <el-input v-model='${name}' type='textarea' placeholder="${data.placeholder}" :style="${data.width+data.heigth}" />`;
};

//转化input
window['inputToString'] = function inputToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:''`)
  return `\n<span>{{${data.label}}}<span/>
  <el-input v-model='${name}' placeholder="${data.placeholder}" :style="${data.width+data.heigth}" />`;
};

const renderScriptString = () => {
  return `
 <script>
  import request from "@/utils/index";
      
  export default {
   name: "ListPage",
   data() {
    return {
            ${returnList.toString()}
        }
      }
   methods: {
      
    },
   }
 </script>
  `
};

export const finalRenderToCode = (list) => {
  // const formString = generateFormToString(list);
  const templateString = generateTemplateToString(list);
  const scriptString = renderScriptString(list);
  return templateString + '\n' + scriptString;
};
