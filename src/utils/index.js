import { Message } from 'element-ui'

export function formatValueUnit(units, conversion) {
  if (!conversion || !Array.isArray(units)) {
    throw new Error('参数错误')
  }
  return (value) => {
    if (isNaN(+value)) return '--' + units[0]
    let unitIndex = 0
    while (value >= conversion && unitIndex < units.length - 1) {
      value /= conversion
      unitIndex++
    }
    return value.toFixed(2) + ' ' + units[unitIndex]
  }
}

export function formatFileSize(size) {
  if (isNaN(+size)) return size
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return size.toFixed(2) + ' ' + units[unitIndex]
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/*
  editBy: your song brother
  防抖函数
  import { mydebounce } from '@/utils/index'
  用法1：
  window.addEventListener('resize', mydebounce(() => {}, 500))
  
  用法2：
  需要移除事件情况下需要再封装一层
  this.resizeHandler = mydebounce(() => {}, 500)
  window.addEventListener('resize', this.resizeHandler)
  window.removeEventListener('resize', this.resizeHandler)
*/
export function mydebounce(fn, delay) {
  let time = null
  return function () {
    // 删除旧的
    if (time !== null) {
      clearTimeout(time)
    }
    // 创建新的
    time = setTimeout(() => {
      fn.call(this)
      // 利用call(),让this的指针从指向window 转成指向input
    }, delay)
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 下载文件
export function exportFile({ fileName, blob } = { fileName: '', blob: '' }) {
  if (!fileName) {
    Message.warning('文件名称有误')
    return
  }
  if (!blob) {
    Message.warning('未获取到文件')
    return
  }
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

// 处理时间
export function fmtTime(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) return
  const time = typeof date === 'string' ? new Date(date) : typeof date === 'number' ? new Date(date) : date
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'H+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'S+': time.getMilliseconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

/*
  获取当天24点 倒数n天的日期对象
  type: day 当天24时倒推   now: Date.now()倒推
 */
export function getwholeDay(n = 1, type = 'day') {
  const day = 1000 * 60 * 60 * 24
  let time0 = new Date().setHours(0, 0, 0, 0)
  let time24 = time0 + day
  if (type === 'now') {
    time0 = Date.now() - day
    time24 = Date.now()
  }
  if (n && n > 1) {
    time0 = time24 - day * Math.ceil(n)
  }
  return [new Date(time0), new Date(time24)]
}

/* Echarts图表尺寸自适应 */
export function fitChartSize(size, defalteWidth = 1920) {
  const clientWidth = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth
  if (!clientWidth) return size
  const scale = (clientWidth / defalteWidth)
  return Number((size * scale).toFixed(3))
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/* 处理字符串为目标长度，不足添加空字符串，中文为2，其余为1 */
export function setStrLen(str, len, suffix = ' ') {
  if (str === null) return str
  let res = ''
  let index = 0
  const reg = /[^x00-xff]/
  for (const s of str) {
    let l = 1
    if (reg.test(s)) {
      l = 2
    }
    if (index + l <= len) {
      index += l
      res += s
    } else {
      res += suffix
      break
    }
  }
  // if (index < len) {
  //   for (let i = 0; i < len - index; i++) {
  //     res += suffix
  //   }
  // }
  return res
}

/**
 * @param {*} obj: Object
 * @returns Array
 */
export function objToArr(obj) {
  const arr = []
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      arr.push({
        name: key,
        value: obj[key]
      })
    }
  }
  return arr
}


function transfeRgbHex(hexcolor) {
  // 10进制的 rgb 值数组
  const rgbDecimalismArray = []
  // 两位一组转换为 10 进制
  for (let index = 1; index < 7; index += 2) {
    const hexVal = hexcolor.slice(index, index + 2)
    const decimalismVal = parseInt(hexVal, 16)
    if (index < 7) {
      rgbDecimalismArray.push(decimalismVal)
    }
  }
  return rgbDecimalismArray
}

/**
 * 获取渐变色任意位置颜色
 * @param {*} startColor 渐变色起点
 * @param {*} endColor 渐变色终点
 * @param {*} proportion 比例 0-1
 * @returns 对应百分比的颜色
 */
export function gradientColor(startColor, endColor, proportion = 1.0) {
  // 此处调用了 自定义的 16 进制转换 10 进制的函数
  const startColorDecimalisArray = transfeRgbHex(startColor)
  const endColorDecimalisArray = transfeRgbHex(endColor)
  // 两个颜色的差值数组
  const rgbDifferenceArray = []
  // endColor 的 rgb 值 分别减掉 startColor 的 rgb 值并分别记录
  for (let index = 0; index < startColorDecimalisArray.length; index++) {
    rgbDifferenceArray.push(endColorDecimalisArray[index] - startColorDecimalisArray[index])
  }
  // startColor 的 rgb 值 分别加上对应比例的 rgb 差值 得到 结果色值的 rgb 数组
  const resultRgbHexArray = rgbDifferenceArray.map((item, index) => {
    const resultVal = Math.round(startColorDecimalisArray[index] + item * proportion)
    // 将 10 进制的 值转换为 16 进制
    return resultVal.toString(16)
  })
  // 将 16 进制的 rgb 数组转换为 16进制表示法 hexColor 字符串
  const resultHexColor = `#${resultRgbHexArray.join('')}`
  return resultHexColor
}

/**
 * 文件预览
 * @param {*} obj 渐变色起点
 * @returns 预览地址
 */
// import { Base64 } from 'js-base64'
// import fileManager from '@/api/basic/fileManager'

export async function previewFile(type, url) {
  const fileType = type.toLowerCase()
  const fileList = ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'xls', 'xlsx', 'png', 'txt', 'ppt', 'pptx']
  if (!fileList.includes(fileType)) {
    Message.error('暂不支持预览该类型的文件，仅支持预览word、ppt、excel、png、jpg、txt')
    return
  }
  try {
    // const res = await fileManager.viewUrl()
    // console.log('预览res: ', res)
    // const previewUrl = res.success ? res.data : ''
    // if (!previewUrl) {
    //   Message.error('该文件暂不支持预览')
    //   return
    // }
    // window.open(`${previewUrl}/onlinePreview?url=${Base64.encode(url)}`)
  } catch (error) {
    console.log('error: ', error)
    Message.error('该文件暂不支持预览')
  }
}

export function getScientificCounting(value) {
  if (value > 99999) {
    return value.toExponential(2)
  } else if (value < -99999) {
    return value.toExponential(2)
  } else {
    return value
  }
}
