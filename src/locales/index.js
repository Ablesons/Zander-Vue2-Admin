/**
 * @Description: i18n 国际化
 * @Author: Zander
 * @Date: 2022/5/8 21:50
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 21:50
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

// element-ui built-in locales
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

// User defined lang
import enLocale from './lang/en';
import zhLocale from './lang/zh-CN';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

export const getLocale = () => {
  // const cookieLanguage = 'getLanguage()';
  const cookieLanguage = 'zh';
  if (cookieLanguage) {
    return cookieLanguage;
  }

  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // Default language is english
  return 'en';
};

const i18n = new VueI18n({
  locale: getLocale(),
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

export default i18n;
