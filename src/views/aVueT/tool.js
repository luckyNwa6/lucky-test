export const editTree2 = (nodes = [], id = '', obj = {}, params = {}) => {
  if (!Array.isArray(nodes)) return
  if (!id) return
  let isRepeat = false
  const { key = 'id', type = 'edit', primaryKey = '' } = params

  const childEditTree = (nodes = [], id = '', obj = {}) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i][key] === id) {
        if (type === 'edit') {
          nodes.splice(i, 1, { ...obj })
        }
        if (type === 'del') {
          nodes.splice(i, 1)
        }
        if (type === 'add') {
          if (!(nodes[i].children && nodes[i].children.length)) {
            nodes[i].children = []
          }

          nodes[i].children.push({ ...obj })
        }
        if (type === 'beforeAdd') {
          nodes.splice(i, 0, { ...obj })
        }
        if (type === 'afterAdd') {
          nodes.splice(i + 1, 0, { ...obj })
        }
        break
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        childEditTree(nodes[i].children, id, obj)
      }
    }
  }

  childEditTree(nodes, id, obj)
  return { nodes, isRepeat }
}

export const editTree = (nodes = [], id = '', obj = {}, params = {}) => {
  if (!Array.isArray(nodes)) return
  if (!id) return

  const { key = 'id', type = 'edit' } = params

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i][key] === id) {
      if (type === 'edit') {
        nodes.splice(i, 1, { ...obj })
      }
      if (type === 'del') {
        nodes.splice(i, 1)
      }
      break
    }
  }
  if (nodes[i].children && nodes[i].children.length > 0) {
    editTree(nodes[i].children, id, obj, params)
  }
}

export const findNodes = (tree, predicate) => {
  const result = []
  ;(function traverse(nodes) {
    if (Array.isArray(nodes)) {
      nodes.forEach((node) => {
        if (predicate(node)) {
          result.push(node)
        }
        if (node.children) {
          traverse(node.children)
        }
      })
    }
  })(tree)
  return result
}
export const editRow = (nodes = [], id, key = 'id', fn = (item) => item) => {
  if (!Array.isArray(nodes)) return

  for (let i = 0; i < nodes.length; i++) {
    fn(nodes[i])
    if (nodes[i].children && nodes[i].children.length > 0) {
      editRow(nodes[i].children, id, (key = 'id'), fn)
    }
  }
}

export const findRepeatFields = (nodes = [], sameField = 'structName') => {
  if (!Array.isArray(nodes)) return
  let repeatObj = { repeatArr: [], repeatNum: 0 }
  const childFindRepeat = (nodes = [], sameField = 'structName') => {
    for (let i = 0; i < nodes.length; i++) {
      repeatObj.repeatArr = arrHasRepeatObj(nodes, sameField)
      if (repeatObj.repeatArr.length > 0) break
      if (nodes[i].children && nodes[i].children.length > 0) {
        childFindRepeat(nodes[i].children, sameField)
      }
    }
  }
}

const arrHasRepeatObj = (arr, key = 'id') => {
  let duplicates = [] //存重复名称对象
  let tempNames = [] //已遍历对象
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i]
    if (tempNames.includes(obj[key])) {
      duplicates.push(obj)
    } else {
      if (obj[key] != '') tempNames.push(obj[key])
    }
  }
  return duplicates
}

export const moveNode = (nodes = [], id = '', dir = 'up', key = 'id') => {
  if (!Array.isArray(nodes)) return
  if (!id) return
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i][key] === id) {
      // 找到节点，根据方向移动
      if (dir === 'up') {
        if (i === 0) {
          Message.warning('当前已经是第一个节点啦')
          return
        }
        nodes.splice(i - 1, 2, nodes[i], nodes[i - 1])
      } else if (dir === 'down') {
        if (i === nodes.length - 1) {
          Message.warning('当前已经是最后一个节点啦')
          return
        }
        nodes.splice(i, 2, nodes[i + 1], nodes[i])
      }
      break
    }
  }
  if (nodes[i].children && nodes[i].children.length > 0) {
    moveNode(nodes[i].children, id, dir)
  }
}

export const copyJsonTree = (source, target, extraInfo = {}) => {
  source.map((node) => {
    const newNode = { ...node, children: [], ...extraInfo }
    target.push(newNode)
    if (node.children && node.children.length > 0) {
      copyJsonTree(node.children, newNode.children, extraInfo)
    }
  })
}
export const requestAndRespDeal = (node, type) => {
  node.forEach((item) => {
    if (type === 'request') {
      if (item.xpath.includes('/request/')) {
        item.disabled = true
      }
      if (item.xpath.includes('/response/')) {
        item.disabled = false
      }
    } else if (type === 'response') {
      if (item.xpath.includes('/response/')) {
        item.disabled = true
      }
      if (item.xpath.includes('/request/')) {
        item.disabled = false
      }
    }

    if ('children' in item && item.children.length === 0) {
      delete item.children
    } else if ('children' in item && item.children.length) {
      requestAndRespDeal(item.children, type)
    }
  })
  return node
}

export const removeEmptyChildrenLucky = (node) => {
  node.forEach((item) => {
    if (item.structName == 'root') {
      item.disabled = true
    }
    if (item.structName == 'request') {
      item.disabled = true
    }
    if (item.structName == 'response') {
      item.disabled = true
    }

    if ('children' in item && item.children.length === 0) {
      delete item.children
    } else if ('children' in item && item.children.length) {
      removeEmptyChildrenLucky(item.children)
    }
  })
  return node
}

export const LuckyGetValueByLabel = (arr = [], label = 'id', value, targetProp) => {
  if (!Array.isArray(arr)) return
  const item = arr.find((i) => i[label] === value)
  return item ? item[targetProp] : '未找到对应字典数据label'
}

// 传入树节点 | key对应的v值 | 数组{默认key是id可以改} | 回溯返回查找到的树节点
export const LuckyEditTree = (nodes = [], id = '', params = {}, callback) => {
  if (!Array.isArray(nodes)) return
  if (!id) return
  const { key = 'id' } = params
  const childEditTree = (nodes = [], id = '') => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i][key] === id) {
        callback(nodes[i])
        break
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        childEditTree(nodes[i].children, id)
      }
    }
  }
  childEditTree(nodes, id)
  return { nodes }
}

export const luckyGetLastString = (str, part = ',') => {
  const lastIndex = str.lastIndexOf(part)
  return lastIndex != -1 ? str.substring(lastIndex + 1).trim() : str
}
