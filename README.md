# Vue3 项目

## 🐑 分支

main------------>vue2 的各种包和组件测试

testVue3-------->vue3 的各种包和组件测试

## 🐶 开发环境

node 20

包管理采用 pnpm

```shell
npm install -g pnpm
pnpm install
```

## 🐯 代码提交规范

husky 是一个 Git Hook 工具，可以让你在 Git 提交过程中自动运行脚本。

当 commit 的时候会执行脚本，脚本会校验 commit message 是否符合规范。

严格按照如下规范:

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能                   |
| fix      | 修补 bug                 |
| docs     | 文档                     |
| style    | 格式方面的优化           |
| refactor | 重构                     |
| test     | 测试                     |
| chore    | 构建过程或辅助工具的变动 |

比如修复一个 bug 必须是

fix: 修复 bug

中间有:后面有空格

## ⭐️ 开发工具

推荐 VS Code 开发，配合插件如下：

| 插件名                        | 功能                                             |
| ----------------------------- | ------------------------------------------------ |
| TypeScript Vue Plugin (Volar) | 用于 TypeScript 的 Vue 插件                      |
| Vue Language Features (Volar) | Vue3.0 语法支持                                  |
| WindiCSS IntelliSense         | 自动完成、语法突出显示、代码折叠和构建等高级功能 |
| Iconify IntelliSense          | Iconify 预览和搜索                               |
| i18n Ally                     | 国际化智能提示                                   |
| Stylelint                     | Css 格式化                                       |
| Prettier                      | 代码格式化                                       |
| ESLint                        | 脚本代码检查                                     |
| DotENV                        | env 文件高亮                                     |

## 🚀 优势

1、自动按需引入组件，自动按需引入 Vue 相关 API，自动引入 ep 图标

2、在 vscode 提交时候走 husky 流程，先走格式化代码和修复，以及提交必须走提交规范,代码有错误则不能提交

## 🐷 其他

启动项目后另启一个终端输入

npx localtunnel --port 8000

选 y,点击链接跳转，点网站里的链接获取密码，复制粘贴提交，可公网访问，

启动突然发现报错

```shell
esbuild.exe ENOENT  这个exe文件没有，去下载模块下看看，关闭火绒可能被拦截下载
pnpm i esbuild@0.11.3
手动去生成它，再启动即可
node ./node_modules/esbuild/install.js

```
