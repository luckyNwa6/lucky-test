<template>
  <div style="padding: 100px">
    <div>哈哈哈</div>
    <avue-form v-model="form" :option="option">
      <!-- 自定义输入框内容 -->
      <template slot-scope="{ disabled, size }" slot="text">
        <el-input
          :disabled="disabled"
          :size="size"
          v-model="form.text"
          placeholder="这里是自定的表单"
          @focus="showTooltip = true"
          @blur="showTooltip = false"
        >
          <template slot="suffix">
            <i class="el-icon-warning"></i>
          </template>
        </el-input>
        <!-- 提示信息 -->
        <transition name="fade">
          <div v-if="showTooltip" class="tooltip-container">
            <span class="tooltip-text">这是输入框的提示信息</span>
          </div>
        </transition>
      </template>
    </avue-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        text: '',
      },
      showTooltip: false,
      option: {
        labelWidth: 120,
        column: [
          {
            label: '姓名',
            prop: 'text',
            labelslot: true,
            rules: [
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
    }
  },
  mounted() {
    let obj = {
      name: 'LUCKY',
      age: 19,
      title: '标题辣',
      demoKey: '这是一个示例键',
      v: '这是 v 的值',
      key1: '示例值1',
      key2: 100,
      key3: true,
      key4: ['苹果', '香蕉', '橙子'],
      key5: { color: '红色', size: '大' },
      key6: '更多示例内容',
      key7: 200.5,
      key8: false,
      key9: ['猫', '狗', '兔子'],
      key10: { type: '书籍', pages: 300 },
      key11: '另一个示例',
      key12: {
        name: 'NWA',
        V: {
          name: 'ZZZ',
        },
      },
      key13: true,
      key14: ['音乐', '电影', '游戏'],
      key15: { brand: '品牌名', model: '型号X' },
    }
    console.table(obj)
  },
}
</script>

<style scoped>
/* 定义提示信息容器 */
.tooltip-container {
  position: absolute;
  top: -40px; /* 根据需要调整距离 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

/* 设置提示信息样式 */
.tooltip-text {
  background-color: black;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
