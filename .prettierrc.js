module.exports = {
  extends: ['airbnb', 'prettier'], //使用了 Airbnb 的代码规范和 Prettier 的代码格式化规则
  singleQuote: true, // 使用单引号
  printWidth: 140, // 超过最大值换行
  htmlWhitespaceSensitivity: 'ignore', //处理 HTML 文件时忽略空格敏感度
  semi: false, // 结尾不用分号
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
}
