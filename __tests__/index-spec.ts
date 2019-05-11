import {
  II18nOption,
  IStorable,
  FileSystemLoader,
  VueI18n,
  IVueI18nOption,
} from '../src/index';

import * as path from 'path';

test('Should have VueI18n available', () => {
  expect(VueI18n).toBeTruthy();
  expect(VueI18n.install).toBeTruthy();
  expect(typeof VueI18n.install).toBe('function');
});

test('Should have VueI18n available', async () => {
  const options: II18nOption = {
    current: 'en',
    loader: FileSystemLoader,
    url: path.resolve(__dirname, './locales/'),
  };
  const data: any = {
    en: {},
  };
  const storage: IStorable = {
    getItem: (key: string): string => {
      return data[key];
    },
    setItem: (key: string, value: string): void => {
      data[key] = value;
    },
  };
  const vueOptions: IVueI18nOption = {
    options,
    storage,
  };
  // tslint:disable-next-line: only-arrow-functions
  const v: any = function() {
    // tslint:disable-next-line: no-empty
  };
  v.filters = {};

  // tslint:disable-next-line: only-arrow-functions
  v.filter = function(
    name: string,
    // tslint:disable-next-line: ban-types
    func: Function
  ) {
    v.filters[name] = func;
  };
  VueI18n.install(v, vueOptions);
  expect(typeof v.getI18n).toBe('function');
  expect(typeof v.setLocale).toBe('function');
  expect(typeof v._).toBe('function');
  const i18n = v.getI18n();
  expect(i18n).toBeTruthy();
  await v.setLocale('en');
  const str = v._('b');
  expect(str).toBe('bbbb');
  await v.setLocale('zh-CN');

  const str1 = v._('c.d');
  expect(str1).toBe('1000');
});
