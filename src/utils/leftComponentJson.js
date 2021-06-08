export default [
  {
    name: 'input',
    component: 'BaseInput', // 左边对应渲染的组件
    componentName: '单行文本', //左边拖拽的文本显示
    componentIcon: 'el-icon-edit',// 左侧显示的图标
    value: '',
    field: 'text1',
    label: '单行文本',
    placeholder: '我是单行文本',
    disabled: false,
    clearable: false,
    float: "left",
    width: '24',
    labelwidth: '3',
    height: '',
    magin: '',
    'show-word-limit': false,
    'show-password': false, // 是否显示密码切换
    minlength: 0,
    maxlength: '',
    isRequired: false, //是否必填，
    requiredMsg: '必填项', // 必填的提示信息
  },
  {
    name: 'inputNumber',
    component: 'BaseInputNumber',
    componentName: '计数器',
    componentIcon: 'el-icon-edit',
    value: '',
    field: 'inputNumber1',
    label: '计数器',
    placeholder: '我是计数器',
    disabled: false,
    float: "left",
    width: '8',
    height: '',
    magin: '',
    min: -Infinity,
    max: Infinity,
    step: 0,
    'step-strictly': false, //严格步数
    precision: 0, // 精度,
    'controls-position': '', //按钮位置,
    isRequired: false, //是否必填
    requiredMsg: '必填项', // 必填的提示信息
  },
  {
    name: 'textArea',
    component: 'BaseTextArea',
    componentName: '多行文本',
    componentIcon: 'el-icon-monitor',
    value: '',
    field: 'textarea1',
    label: '多行文本',
    placeholder: '我是多行文本',
    disabled: false,
    width: '24',
    height: '',
    magin: '',
    isAutosize: true,
    minRows: 2,
    maxRows: 5,
    isRequired: false, //是否必填
    requiredMsg: '必填项', // 必填的提示信息
  },
  {
    name: 'button',
    component: 'BaseButton',
    componentName: '默认按钮',
    componentIcon: 'el-icon-monitor',
    value: '按钮',
    field: 'button1',
    disabled: false,
    label: '',
    float: "left",
    width: '6',
    height: '',
    magin: '',
    type: '', //按钮类型
    plain: false, // 是否为朴素按钮
    round: false, // 是否为圆角按钮
    circle: false, // 是否为圆形按钮
    loading: false,
    icon: '',
  },
  {
    name: 'select',
    component: 'BaseSelect',
    componentName: '下拉选择',
    componentIcon: 'el-icon-monitor',
    value: '',
    field: 'select1',
    label: '下拉选择',
    float: "left",
    width: '6',
    height: '',
    magin: '',
    disabled: false, // 是否禁用
    multiple: false, //是否为多选
    clearable: false, // 是否可清空
    'multiple-limit': 0, // 多选时用户最多可以选择的项目数
    autocomplete: 'off',
    placeholder: '请选择',
    filterable: false, // 可过滤
    selectOptions: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
    ],
    size: '',
    icon: '',
  },
  {
    component: 'BaseDatePicker',
    name: 'datePicker',
    type: 'date',
    value: '',
    field: 'datePicker1',
    componentName: '日期选择',
    componentIcon: 'el-icon-date',
    float: "left",
    width: '6',
    height: '',
    magin: '',
    label: '日期',
  },
  {
    component: 'BaseTable',
    name: 'table',
    componentName: '表格',
    componentIcon: 'table',
    lablestr: '日期/date,姓名/name,地址/address',
    lableList: [{
      label: '日期',
      value: 'date'
    }, {
      label: '姓名',
      value: 'name'
    }, {
      label: '地址',
      value: 'address'
    }],
    field: 'table1',
    label: '',
    float: "left",
    width: '',
    height: '',
    magin: '',
    tableData: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }],
  },
  {
    component: 'BasePagination',
    name: 'pagination',
    type: 'pagination',
    componentName: '分页',
    componentIcon: 'table',
    maxWidth: true,
    pageSize: 10,
    pageNum: 1,
    total: 1,
    field: 'pagination1',
    label: '',
    float: "left",
    width: '',
    height: '',
    magin: '',
  },
  {
    component: 'BaseTree',
    name: 'tree',
    componentName: '树形',
    componentIcon: 'el-icon-c-scale-to-original',
    checkbox: true,
    maxWidth: true,
    additionalLableStr: 'label,additional1,additional2',
    additionalLable: ['label', 'additional1', 'additional2'],
    treeDate: [{
      label: '一级 2',
      additional1: '外加列1',
      additional2: '外加列2',
      children: [{
        label: '二级 2-1',
        additional1: '外加列1',
        additional2: '外加列2',
        children: [{
          label: '三级 2-1-1',
          additional1: '外加列1',
          additional2: '外加列2',
        }]
      }, {
        label: '二级 2-2',
        additional1: '外加列1',
        additional2: '外加列2',
        children: [{
          label: '三级 2-2-1',
          additional1: '外加列1',
          additional2: '外加列2',
        }]
      }]
    }, {
      label: '一级 3',
      additional1: '外加列1',
      additional1: '外加列2',
      children: [{
        label: '二级 3-1',
        additional1: '外加列1',
        additional2: '外加列2',
        children: [{
          label: '三级 3-1-1',
          additional1: '外加列1',
          additional1: '外加列2',
        }]
      }, {
        label: '二级 3-2',
        additional1: '外加列1',
        additional1: '外加列2',
        children: [{
          label: '三级 3-2-1',
          additional1: '外加列1',
          additional1: '外加列2',
        }]
      }]
    }],
    field: 'tree1',
    label: '',
    float: "left",
    width: '',
    height: '',
    magin: '',
  }
]
