/**
 * xlsx自身插件有bug，比如excel里17:00:00，从流获取会少了43s，跟时区有关，用下面2个暂时解决
 * @param {*} date
 * @returns
 */
function fixPrecisionLoss(date) {
  const importBugHotfixDiff = (() => {
    const basedate = new Date(1899, 11, 30, 0, 0, 0)
    const dnthreshAsIs = (new Date().getTimezoneOffset() - basedate.getTimezoneOffset()) * 60000 - 1000
    const dnthreshToBe = getTimezoneOffsetMS(new Date()) - getTimezoneOffsetMS(basedate)
    return dnthreshAsIs - dnthreshToBe
  })()

  return new Date(date.getTime() - importBugHotfixDiff)
}

function getTimezoneOffsetMS(date) {
  var time = date.getTime()
  var utcTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
  return time - utcTime
}
/**
 * 核心处理excel流，读取里面的数据
 * @param {*} file
 * @param {*} callback
 * @param {*} XLSX
 * @param {*} dayjs
 */
export function readExcelFile(file, callback, XLSX, dayjs) {
  const reader = new FileReader()
  reader.onload = (event) => {
    const data = event.target.result
    let workBook = XLSX.read(data, { type: 'array', cellDates: true })
    try {
      const worksheet = workBook.Sheets[workBook.SheetNames[0]]
      console.log('🚀 ~ readExcelFile ~ worksheet:', worksheet)
      const tableHeader = getHeaderRowA(worksheet, XLSX)
      console.log('🚀 ~ readExcelFile ~ tableHeader:', tableHeader)
      const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: '-' })
      excelData.forEach((obj) => {
        Object.keys(obj).forEach((v) => {
          if (obj[v] instanceof Date) {
            obj[v] = dayjs(fixPrecisionLoss(obj[v])).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      })
      callback(null, { tableHeader, excelData })
    } catch (error) {
      callback(error)
    }
  }
  reader.onerror = (event) => {
    callback(event.error)
  }
  reader.readAsArrayBuffer(file)
}
/**
 * 获取excel的表头数组
 * @param {*} sheet  工作簿 查看excel就知道有很多的sheet了一般读取[0]也就是第一个
 * @param {*} XLSX 工具包
 * @returns
 */

function getHeaderRowA(sheet, XLSX) {
  const headers = [] // 定义数组，用于存放解析好的数据
  const range = XLSX.utils.decode_range(sheet['!ref']) // 读取sheet的单元格数据
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers // 经过上方一波操作遍历，得到最终的第一行头数据
}
/**
 * 将excel的 Sun Feb 18 2024 11:53:44 GMT+0800日期格式化成这种格式YYYY-MM-DD HH:mm:ss
 * @param {} excelData
 * @returns
 */
export function formatExcelDataA(excelData, dayjs) {
  return excelData.map((obj) => {
    let newObj = {}
    Object.keys(obj).forEach((v) => {
      if (obj[v] instanceof Date) {
        newObj[v] = dayjs(fixPrecisionLoss(obj[v])).format('YYYY-MM-DD HH:mm:ss')
      } else {
        newObj[v] = obj[v]
      }
    })
    return newObj
  })
}

// 定义一个方法来转换表头数据格式，符合elementUi里的table
export function transformTableHeader(tableHeader) {
  return tableHeader.map((item, index) => ({
    label: item,
    prop: `propTable${index + 1}`,
  }))
}

// 定义一个方法来转换表格数据格式，符合elementUi里的data
export function transformTableData(tableHeader, excelData) {
  return excelData.map((item) => {
    let rowData = {}
    Object.keys(item).forEach((value) => {
      const propItem = tableHeader.find((p) => p.label === value)
      rowData[propItem.prop] = item[value]
    })
    return { ...rowData }
  })
}
// 定义一个方法来处理表头标签,因为上传的带有*的必填，去掉展示
export function processTableHeaderLabel(tableHeader) {
  return tableHeader.map((obj) => {
    const label = obj.label.startsWith('*') ? obj.label.slice(1) : obj.label
    return { ...obj, label }
  })
}

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
 * 超过5位数值转化为科学计数法
 * 
 * @param {Number|String} value 数值
 * @param {Number} limitBit 限制位数
 */
export function getScientificCounting(value, limitBit = 5) {

  const numberValue = Number(value);

  // 若值不为数值或限制位数小于等于0
  if (Number.isNaN(numberValue) || limitBit <= 0) {
    return value;
  }

  // 限制值
  const maxBit = Math.pow(10, limitBit + 1);

  const translateValue = (numberValue >= maxBit || numberValue <= -maxBit) ? numberValue.toExponential(2) : numberValue;

  return translateValue;
}
