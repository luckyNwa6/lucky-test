import _ from 'lodash-es'
/**
 * 自定义 Hook 用于管理弹窗对话框的状态和行为。
 *
 * @param {Ref} formRef - 表单引用对象，用于重置表单校验。
 * @param {Object} options - 配置选项。
 * @param {string} options.emitName - 是否触发 EventBus 事件。
 * @param {Function} options.initFormData - 用于初始化表单数据的函数。
 * @returns {Object} 返回包含弹窗管理相关属性和方法的对象。
 * @property {Ref<boolean>} dialogVisible - 弹窗是否可见的响应式 Ref。
 * @property {Ref<string>} dialogModel - 弹窗模式的响应式 Ref。
 * @property {Ref<boolean>} submitLoading - 提交加载状态的响应式 Ref。
 * @property {Ref<Object>} formData - 弹窗表单数据的响应式 Ref。
 * @property {Function} dialogCancel - 取消弹窗的方法。
 * @property {Function} dialogClose - 关闭弹窗的方法。
 * @property {Function} dialogOpen - 打开弹窗的方法。
 * @property {Function} _handleOpen - 处理打开弹窗时的逻辑的方法。
 * @throws {Error} 当传递的参数不符合要求时抛出异常。
 * @author ShowPenZ
 */
export default function useDialog(formRef, options = {}) {
  // 传入的emitName 用于控制是否触发bus Emit事件
  const defaultOptions = {
    initFormData: () => ({}),
    emitName: '',
  }

  // 使用传入的 options 对象覆盖默认的 options 对象
  const mergedOptions = Object.assign({}, defaultOptions, options)

  // 表单数据
  const formData = ref(mergedOptions.initFormData())

  // 弹窗是否可见
  const dialogVisible = ref(false)

  // 弹窗模式
  const dialogModel = ref('create')

  // 提交加载状态
  const submitLoading = ref(false)

  // 取消弹窗
  function dialogCancel(done) {
    submitLoading.value = false
    // dialogModel.value = '';

    if (mergedOptions.emitName) {
      window.bus.emit('dialogCancel', { emitName: mergedOptions.emitName })
    }

    // 重置表单数据
    if (!_.isEmpty(mergedOptions.initFormData())) {
      formData.value = mergedOptions.initFormData()
    }

    // 重置表单
    if (formRef && _.isObject(formRef) && !_.isNull(formRef.value)) {
      formRef.value.resetFields()
    }

    // 触发 done 回调
    if (done && _.isFunction(done)) {
      done()
    } else {
      dialogVisible.value = false
    }
  }

  // 关闭弹窗
  function dialogClose(data) {
    lucky.star('关闭弹窗')
    // 触发 beforeClose 事件
    if (mergedOptions.emitName) {
      lucky.star('关闭弹窗1')
      window.bus.emit('dialogBeforeClose', {
        emitData: data,
        emitName: mergedOptions.emitName,
      })
    }

    dialogCancel()
  }

  // 打开弹窗
  function dialogOpen() {
    lucky.star('打开弹窗')
    dialogVisible.value = true

    // 强制清除表单校验
    if (formRef && _.isObject(formRef) && !_.isNull(formRef.value)) {
      setTimeout(() => {
        formRef.value.clearValidate()
      }, 50)
    }
  }

  // 用于处理打开弹窗时的逻辑
  async function _handleOpen(fn) {
    if (_.isNull(fn) || !_.isFunction(fn)) {
      throw new Error('需要传递一个函数对象！示例：_handleOpen(initFormData, fn)')
    }

    fn()
  }

  return {
    dialogVisible,
    dialogModel,
    submitLoading,
    formData,
    dialogCancel,
    dialogClose,
    dialogOpen,
    _handleOpen,
  }
}
