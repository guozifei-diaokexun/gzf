/**
 * 将props转化为text
 * @param props
 */
export const propsToText = (props) => {
  let stringList = [];

  for(let key in props) {
    const value = props[key];

    // 属性值是字符串，直接变为 形如 label="xxx"的格式
    if(typeof value === 'string') {
      stringList.push(`${key}='${value}'`);
      continue;
    }

    // 布尔值
    if(typeof value === 'boolean') {
      if(value) { // 为真 支持布尔的简写形式，比如clearable
        stringList.push(key);
      }else {
        stringList.push(`:${key}='${value}'`);
      }
      continue;
    }

    // 数字
    if(typeof  value === 'number') {
      stringList.push(`:${key}='${value}'`);
      continue;
    }

    // 是对象,比如 :style='{ color: 'red' }'
    if(isObject(value)) {
      stringList.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }

    //是数组
    if(Array.isArray(value)) {
      stringList.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }
  }
  return stringList.join(' ');
}

//判断是否为对象
function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

