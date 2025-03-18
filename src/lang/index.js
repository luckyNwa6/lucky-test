import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入国际化插件包
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui 英文包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui 中文包
import customEN from './en.js' // 自定义英语包
import customZH from './zh.js' // 自定义中文包

Vue.use(VueI18n) // 全局注册国际化包

const messages = {
  en: {
    ...customEN,
    ...elementEnLocale,
  },
  zh: {
    ...customZH,
    ...elementZhLocale,
  },
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // 如果没有选择语言
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en' // 默认语言
}
const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
})

export default i18n
