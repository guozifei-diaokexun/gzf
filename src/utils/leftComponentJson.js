export default [
  {
    name: 'input',
    component: 'BaseInput', // 左边对应渲染的组件
    componentName: '单行文本', //左边拖拽的文本显示
    componentIcon: 'el-icon-edit',// 左侧显示的图标
    value: '',
    field: 'text1',
    label: '单行文本',
    labelWidth:90,
    placeholder: '我是单行文本',
    clearable: false,
    magin:'',
    span:10,
    isRequired: false, //是否必填，
    isFrom:true,
    from_type_list:['from_field','from_lable','from_required','from_lable_width','from_clearable','from_magin','from_placeholder']
  },
  {
    name: 'inputNumber',
    component: 'BaseInputNumber',
    componentName: '计数器',
    componentIcon: 'el-icon-edit',
    value: '',
    field: 'inputNumber1',
    label: '计数器',
    labelWidth:90,
    span:11,
    magin:'',
    min: -Infinity,
    max: Infinity,
    step: 0,
    precision: 0, // 精度,
    'controls-position': '', //按钮位置,
    isRequired: false, //是否必填，
    isFrom:true,
    from_type_list:['from_field','from_lable','from_required','from_lable_width','from_step','from_magin','from_precision','from_controls_position']
  },
  {
    name: 'textArea',
    component: 'BaseTextArea',
    componentName: '多行文本',
    componentIcon: 'el-icon-monitor',
    value: '',
    field: 'textarea1',
    label: '多行文本',
    labelWidth:90,
    span:11,
    placeholder: '我是多行文本',
    magin:'',
    minRows: 2,
    maxRows: 5,
    isRequired: false, //是否必填
    requiredMsg: '必填项', // 必填的提示信息
    isFrom:true,
    from_type_list:['from_field','from_lable','from_lable_width','from_required','from_clearable','from_magin','from_text_rows','from_text_isAutosize']
  },
  {
    name: 'button',
    component: 'BaseButton',
    componentName: '默认按钮',
    componentIcon: 'el-icon-monitor',
    value: '按钮',
    field: 'button1',
    disabled: false,
    float:"left",
    isFrom:false,
    dialogKey:'',
    magin:'',
    type: 'primary', //按钮类型
    loading: false,
    icon: '',
    type_list:['primary','success','info','warning','danger'],
    from_type_list:['from_value','from_magin','from_binding_dialog','from_icon','from_type','from_disabled']
  },
  {
    name: 'select',
    component: 'BaseSelect',
    componentName: '下拉选择',
    componentIcon: 'el-icon-monitor',
    value: '',
    field: 'select1',
    label: '下拉选择',
    labelWidth:90,
    span:10,
    magin:'',
    isFrom:false,
    multiple: false, //是否为多选
    clearable: false, // 是否可清空
    'multiple-limit': 0, // 多选时用户最多可以选择的项目数
    autocomplete: 'off',
    placeholder: '请选择',
    filterable: false, // 可过滤
    isRequired: false,
    selectOptions: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
    ],
    isFrom:true,
    from_type_list:['from_field','from_lable','from_lable_width','from_placeholder','from_magin','from_clearable','from_filterable','from_multiple','from_tree_options']
  },
  {
    component: 'BaseDatePicker',
    name: 'datePicker',
    type: 'date',
    value:'',
    field: 'datePicker1',
    componentName: '日期选择',
    componentIcon: 'el-icon-date',
    span:11,
    magin:'',
    placeholder: '请选择',
    label: '日期',
    labelWidth:90,
    isFrom:true,
    isRequired: false, //是否必填，
    type_list:['date','datetime','datetimerange'],
    from_type_list:['from_field','from_lable','from_type','from_magin','from_lable_width','from_placeholder','from_clearable','from_required']
  },
  {
    component: 'BaseRadio',
    name: 'radio',
    value:'',
    selectOptions: [
      { label: '选项1', value: 1 }
    ],
    float:"left",
    field: 'radio1',
    componentName: '单选框',
    componentIcon: 'el-icon-date',
    span:11,
    label: '单选框',
    isFrom:false,
    magin:'',
    labelWidth:90,
    from_type_list:['from_field',,'from_lable','from_magin','from_tree_options']
  },
  {
    component: 'BaseCheckbox',
    name: 'checkbox',
    value:[],
    selectOptions: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ],
    field: 'checkbox1',
    componentName: '多选框',
    componentIcon: 'el-icon-date',
    span:11,
    label: '多选框',
    isFrom:false,
    float:"left",
    magin:'',
    from_type_list:['from_field','from_lable','from_magin','from_tree_options']
  },
  {
    component: 'BaseSwitch',
    name: 'switch',
    value:false,
    field: 'switch1',
    activeText:'关闭文字',
    inactiveText:'开启文字',
    componentName: '开关',
    componentIcon: 'el-icon-date',
    span:6,
    isFrom:false,
    float:"left",
    magin:'',
    from_type_list:['from_field','from_magin','from_swith_text']
  },
  {
    component: 'BaseSlider',
    name: 'slider',
    value:0,
    minValue:0,
    maxValue:10,
    maxWidth:true,
    field: 'slider1',
    componentName: '滑块',
    componentIcon: 'el-icon-date',
    span:11,
    isFrom:false,
    float:"left",
    label:'滑块',
    magin:'',
    from_type_list:['from_field','from_lable','from_magin','from_range']
  },
  {
    component: 'BaseRate',
    name: 'rate',
    value:0,
    field: 'rate1',
    componentName: '评分',
    componentIcon: 'el-icon-date',
    span:11,
    float:"left",
    isFrom:false,
    label:'评分',
    magin:'',
    from_type_list:['from_field','from_magin','from_lable','from_lable_width']
  },
  {
    component: 'BaseColorPicker',
    name: 'colorPicker',
    value:`#067FFC`,
    field: 'colorPicker1',
    componentName: '颜色选择器',
    componentIcon: 'el-icon-date',
    span:3,
    float:"left",
    label:'颜色',
    magin:'',
    isFrom:true,
    isRequired: false, //是否必填，
    from_type_list:['from_field','from_required','from_magin','from_lable','from_lable_width']
  },
  {
    component: 'BaseTag',
    name: 'tag',
    value:'标签',
    field: 'tag1',
    componentName: '标签',
    componentIcon: 'el-icon-date',
    span:2,
    float:"left",
    magin:'',
    type:'primary',
    isFrom:false,
    type_list:['primary','success','info','warning','danger'],
    from_type_list:['from_value','from_magin','from_type']
  },
  {
    component: 'BaseProgress',
    name: 'progress',
    value:50,
    field: 'progress1',
    componentName: '进度条',
    componentIcon: 'el-icon-date',
    span:24,
    maxWidth:true,
    float:"left",
    label:'进度条',
    magin:'',
    isFrom:false,
    from_type_list:['from_field','from_magin','from_value','from_lable','from_lable_width']
  },
  {
    component: 'BaseCascader',
    name: 'cascader',
    radioNumber:1,
    value:[],
    label:'级联',
    field: 'cascader1',
    componentName: '级联选择器',
    componentIcon: 'el-icon-date',
    span:10,
    width:'',
    height:'',
    magin:'',
    isFrom:true,
    isRequired: false, //是否必填，
    from_type_list:['from_field','from_lable','from_required','from_lable','from_clearable','from_table_header','from_magin'],
    cascaderData:[{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }]
      }]
  },
  {
    component: 'BaseTable',
    name: 'table',
    maxWidth:true,
    componentName: '表格',
    componentIcon: 'table',
    isFrom:false,
    span:24,
    lablestr:'日期/date,姓名/name,地址/address',
    lableList: [{
      label:'日期',
      value:'date'
    },{
      label:'姓名',
      value:'name'
    },{
      label:'地址',
      value:'address'
    }],
    field: 'table1',
    float:"left",
    magin:'',
    from_type_list:['from_table_header','from_magin'],
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
    maxWidth:true,
    pageSize:10,
    isFrom:false,
    span:24,
    pageNum:1,
    total:1,
    field: 'pagination1',
    float:"left",
    magin:'',
    from_type_list:['from_float','from_magin'],
  },
  {
    component: 'BaseTree',
    name: 'tree',
    componentName: '树形',
    componentIcon: 'el-icon-c-scale-to-original',
    checkbox:true,
    maxWidth:true,
    span:24,
    isFrom:false,
    additionalLableStr:'label,additional1,additional2',
    additionalLable:['label','additional1','additional2'],
    treeDate:[{
      label: '一级 2',
      additional1:'外加列1',
      additional2:'外加列2',
      children: [{
        label: '二级 2-1',
        additional1:'外加列1',
      additional2:'外加列2',
        children: [{
          label: '三级 2-1-1',
          additional1:'外加列1',
      additional2:'外加列2',
        }]
      }, {
        label: '二级 2-2',
        additional1:'外加列1',
    additional2:'外加列2',
        children: [{
          label: '三级 2-2-1',
          additional1:'外加列1',
      additional2:'外加列2',
        }]
      }]
    }, {
      label: '一级 3',
      additional1:'外加列1',
  additional1:'外加列2',
      children: [{
        label: '二级 3-1',
        additional1:'外加列1',
      additional2:'外加列2',
        children: [{
          label: '三级 3-1-1',
          additional1:'外加列1',
      additional1:'外加列2',
        }]
      }, {
        label: '二级 3-2',
        additional1:'外加列1',
    additional1:'外加列2',
        children: [{
          label: '三级 3-2-1',
          additional1:'外加列1',
      additional1:'外加列2',
        }]
      }]
    }],
    field: 'tree1',
    float:"left",
    magin:'',
    from_type_list:['from_float','from_tree_column','from_magin','from_tree_checkbox'],
  }
]
