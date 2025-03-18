/**
 * 检查元素是否具有指定的类。
 *
 * @param {HTMLElement} ele - 要检查的元素。
 * @param {string} cls - 要检查的类名。
 * @returns {boolean} - 如果元素具有指定类，返回 true，否则返回 false.
 * @author ShowPenZ
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 向元素添加类。
 *
 * @param {HTMLElement} ele - 要添加类的元素。
 * @param {string} cls - 要添加的类名.
 * @author ShowPenZ
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素中移除类。
 *
 * @param {HTMLElement} ele - 要移除类的元素.
 * @param {string} cls - 要移除的类名.
 * @author ShowPenZ
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 检查路径是否为外部链接.
 *
 * @param {string} path - 要检查的路径.
 * @returns {Boolean} - 如果路径为外部链接，返回 true，否则返回 false.
 * @author ShowPenZ
 */
export function isExternal(path) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}
// 深拷贝对象
// add by fourfaith源码 https://github.com/JakHuang/form-generator/blob/dev/src/utils/index.js#L107
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
    if (obj.global) {
      flags.push('g')
    }
    if (obj.multiline) {
      flags.push('m')
    }
    if (obj.ignoreCase) {
      flags.push('i')
    }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  let lang = 'zh'
  let res = []
  let temp = {}
  for (let i = 0; i < data.length; i++) {
    if (lang === 'zh') {
      temp[data[i][id]] = data[i]
    } else {
      data[i].name = data[i].otherLanguage == undefined ? data[i].name : data[i].otherLanguage
      temp[data[i][id]] = data[i]
    }
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
