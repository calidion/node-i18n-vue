export * from 'node-i18n-core';

import { I18n, II18nOption, IStorable } from 'node-i18n-core';

export interface IVueI18nOption {
  options: II18nOption;
  storage?: IStorable;
}

export const VueI18n = {
  install(v: any, options: IVueI18nOption) {
    const i18n = new I18n(options.options, options.storage);

    Object.defineProperty(v.prototype, '$i18n', {
      value: i18n,
    });
    Object.defineProperty(v, 'getI18n', {
      value: () => {
        return i18n;
      },
    });

    Object.defineProperty(v, 'setLocale', {
      value: async (locale: string) => {
        return i18n.setLocale(locale);
      },
    });

    function getString(key: string) {
      return i18n._sync(key);
    }

    Object.defineProperty(v, '_', { value: getString });

    // Vue filter must not be an arrow function
    v.filter('_', getString);
  },
};
