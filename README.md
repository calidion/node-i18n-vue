[![Build Status](https://travis-ci.org/calidion/node-i18n-vue.svg?branch=master)](https://travis-ci.org/calidion/node-i18n-vue)
[![Coverage Status](https://coveralls.io/repos/github/calidion/node-i18n-vue/badge.svg?branch=master)](https://coveralls.io/github/calidion/node-i18n-vue?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# I18n plugin for vue

1. Import

```js
import {
  VueI18n,
  HTTPLoader
} from "node-i18n-vue";
```

2. Prepare data:

```js
const options = {
  current: 'en',
  url: "http://localhost:8080/locales/",
  loader: HTTPLoader
};
```

3. Use plugin

```
Vue.use(VueI18n, {
  options,
});
```
or if you want the localed to be saved.
```
Vue.use(VueI18n, {
  options,
  storage: window.localStorage
});
```

4. Init data

```js
let i18n = Vue.getI18n();

i18n.init().then(() => {
  // Init your Vue here
  // new Vue({
  //   render: h => h(App),
  // }).$mount('#app')
});

// or

await i18n.init();
/// your Vue mount code
...

```

5. Listen and update on locale change

```js
i18n.listen(() => {
  // Put you update code here

  // Currently Vue global update seems not available, use page reloading
  // This is an example on update i18n for Vue
  window.location.reload();
});
```
