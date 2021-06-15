var i = 0; 
var returnList = []
var storage = window.localStorage;
var dialogFromStr = ''
var isFrom= false
var formData = {}

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

//将拖动的代码变成字符串模板
const generateTemplateToString = (list) => {
  let outerText =  `<template>
    <div style='display: flex;flex-wrap: wrap;'>`;
  for(let i = 0; i < list.length; i++) {
    const item = list[i];
      let span = item.label ? `<span style='width:${item.labelWidth ? item.labelWidth : 90}px;line-height: 36px;'>${item.label}</span>` : ``
      outerText += `\n<div class='el-col el-col-${item.span}' style='${item.magin}${item.maxWidth ? ``:`display: flex;0`}'>
             ${span}`+
              transferToComponentString(item)+`
            </div>`;
  }

    outerText += `${dialogFromStr}
    </div>
</template>`;
  return outerText;
};
const generateTemplateDialogToString = (key,dialogVisible) => {
  let outerText =  `<el-dialog
  title="提示"
  :visible.sync="${dialogVisible}"
  :append-to-body="true"
  :close-on-click-modal='false'>`;

  isFrom = false
  let data = JSON.parse(storage.getItem(key))
  let list = data.value;
  isFrom = data.isFrom
  
  for(let i = 0; i < list.length; i++) {
    const item = list[i];
    if(!isFrom){
    const item = list[i];
      let span = item.span ? `\n<span style='width:${item.labelWidth ? item.labelWidth : 90}px;line-height: 36px;'>${item.label}</span>` : ``
      outerText += `<div class='el-col el-col-${item.span}' style='${item.magin}display: flex;'>
             \n${span}`+transferToComponentString(item)+`
      </div>\n`;
    }else{
      //弹框布局,获取数据判断是否使用from表单
      let click = `@click='${dialogVisible} = true'`
      let rulesStr = ''
      if(item.isRequired){
        rulesStr = `:rules="[
          { required: true, message: '请输入', trigger: 'blur' }
        ]"`
      }
      outerText +=`\n<el-row :gutter="0">
          <el-form
            ref="elForm"
            :model="formData"
            size="medium"
            label-width="${item.labelWidth}px"
            label-position="left">
            <el-col :sapn='${item.span}'>
        <el-form-item label="${item.label}" prop="${item.field}"
        ${rulesStr}>`
            +transferToComponentString(item)+
            `</el-form-item>
            </el-col>
          </el-form>
        </el-row>`
    }
    
  }
  if(isFrom){
    returnList.push(`\nformData:${JSON.stringify(formData)}`)
    formData={}
  }
  
    outerText += `<div slot="footer">
    <el-button ${click}>取消</el-button>
    <el-button ${click} type="primary" >确定</el-button>
   </div>
  </el-dialog>`;
  return outerText;
}

// 转化tree
window['treeToString'] = function treeToString(data) {
  let additionalLable = 'additionalLable'+(i++);
  returnList.push(`\n${data.field}:[]`)
  returnList.push(`\n${additionalLable}:[]`)
  return `\n    <el-tree
            :data="${data.field}"
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
window['paginationToString'] = function paginationToString(data) {
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
window['tableToString'] = function tableToString(data) {
    let tableLableList = 'tableLableList'+(i++);
    returnList.push(`\n${data.field}:[]`)
    returnList.push(`\n${tableLableList}:[]`) 
    return `\n<el-table
              :data="${data.field}"
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
window['datePickerToString'] = function datePickerToString(data) {
  if(data.dateType != 'datetimerange'){
    isFrom ? formData[data.field]=`new Date()` : returnList.push(`\n${data.field}:new Date()`)
  }else{
    isFrom ? formData[data.field]=`[new Date(),new Date()]` : returnList.push(`\n${data.field}:[new Date(),new Date()]`)
  }
  return `\n<el-date-picker v-model="${isFrom ? 'formData.':``}${data.field}" type="${data.type}" placeholder="${data.placeholder ? data.placeholder:''}"  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>`
};

// 转化select
window['selectToString'] = function selectToString(data) {

  let selectOptions = 'selectOptions'+(i++);
  isFrom ? formData[data.field]="" : returnList.push(`\n${data.field}:""`)
  returnList.push(`\n${selectOptions}:[]`)
  return `\n<el-select v-model="${isFrom ? 'formData.':``}${data.field}" ${data.clearable ? 'clearable' : ``} ${data.multiple ? 'multiple' : ``} :multiple-limit='${data[`multiple-limit`] ? data[`multiple-limit`] : 0}' ${data.filterable ? 'filterable' : ``} placeholder="${data.placeholder}">
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
  //判断是否绑定弹框
  let click = ''
  if(data.dialogKey){
  let dialogVisible='dialogVisible'+i++
  returnList.push(`\n${dialogVisible}:false`)
  click = `@click='${dialogVisible} = true'`
  dialogFromStr += generateTemplateDialogToString(data.dialogKey,dialogVisible)
  }
  return `\n<el-button class='${data.icon}' ${click} type="${data.type ? data.type :'primary'}" ${data.disabled ? 'disabled=disabled':''}>${data.value}</el-button>`;
};

// 转化inputNumber
window['inputNumberToString'] = function inputNumberToString(data) {
  isFrom ? formData[data.field]="" : returnList.push(`\n${data.field}:0`)
  return `\n<el-input-number v-model="${isFrom ? 'formData.':``}${data.field}" :min="${data.min}" :max="${data.max}" :step="${data.step}" :precision="${data.precision}" controls-position="${data['controls-position']}"/>`;
};

// 转化多行文本
window['textAreaToString'] = function textAreaToString(data) {
  isFrom ? formData[data.field]="" : returnList.push(`\n${data.field}:""`)
  return `<el-input v-model='${isFrom ? 'formData.':``}${data.field}' type='textarea' placeholder="${data.placeholder}" :autosize="{minRows:${data.minRows},maxRows:${data.maxRows}}"/>`;
};

//转化input
window['inputToString'] = function inputToString(data) {
  isFrom ? formData[data.field]="" : returnList.push(`\n${data.field}:""`)
  return `\n<el-input v-model='${isFrom ? 'formData.':``}${data.field}' placeholder="${data.placeholder}"/>`;
};

//转化radio
window['radioToString'] = function radioToString(data) {
  const name = data.field+(i++);
  let radioList = 'radioList'+(i++);
  returnList.push(`\n${name}:""`)
  returnList.push(`\n${radioList}:${JSON.stringify(data.selectOptions)}`)
  return `\n<el-radio
          v-model="${name}"
          :label="item.value"
          v-for="(item, index) in ${radioList}"
          :key="index">
          {{ item.label }}
        </el-radio>`;
};

//转化checkbox
window['checkboxToString'] = function checkboxToString(data) {
  const name = data.field+(i++);
  let checkboxList = 'checkboxList'+(i++);
  returnList.push(`\n${name}:${JSON.stringify(data.value)}`)
  returnList.push(`\n${checkboxList}:${JSON.stringify(data.selectOptions)}`)
  return `\n<el-checkbox-group v-model="${name}">
              <el-checkbox
                :label="item.value"
                v-for="(item, index) in ${checkboxList}"
                :key="index">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>`
};

//转化switch
window['switchToString'] = function switchToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:${data.value}`)
  return `\n<el-switch
              v-model="${name}"
              active-text="${data.activeText}"
              inactive-text="${data.inactiveText}">
            </el-switch>`
};

//转化slider
window['sliderToString'] = function sliderToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:${data.value}`)
  return `\n<el-slider
              style="width: 100%"
              v-model="${name}"
              :min="${data.minValue}"
              :max="${data.maxValue}"
            ></el-slider>`
};

//转化rate评分
window['rateToString'] = function rateToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:${data.value}`)
  return `\n<el-rate v-model="${name}"></el-rate>`
};

//转化color选择器
window['colorPickerToString'] = function colorPickerToString(data) {
  isFrom ? formData[data.field]=`${data.value}` : returnList.push(`\n${data.field}:"${data.value}"`)
  return `\n<el-color-picker v-model="${isFrom ? 'formData.':``}${data.field}"></el-color-picker>`
};

//转化tag标签
window['tagToString'] = function tagToString(data) {
  return `<el-tag type="${data.type}">${data.value}</el-tag>`
};

//转化progress进度条
window['progressToString'] = function progressToString(data) {
  const name = data.field+(i++);
  returnList.push(`\n${name}:${data.value ? data.value :''}`)
  return `\n<el-progress
            style="width: 100%"
            :percentage="${name}">
          </el-progress>`
};

//转化cascader级联选择器
window['cascaderToString'] = function cascaderToString(data) {
  isFrom ? formData[data.field]=`\n${JSON.stringify(data.value)}` : returnList.push(`\n${data.field}:${JSON.stringify(data.value)}`)
  let cascaderData = 'cascaderData'+(i++);
  returnList.push(`\n${cascaderData}:${JSON.stringify(data.cascaderData)}`)
  return `\n<el-cascader
            v-model="${isFrom ? 'formData.':``}${data.field}"
            :show-all-levels="false"
            :options="${cascaderData}"
            :props="{ expandTrigger: 'hover' }">
          </el-cascader>`
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
  returnList = []
  dialogFromStr=''
  const templateString = generateTemplateToString(list);
  const scriptString = renderScriptString(list);
  return templateString + '\n' + scriptString;
};
