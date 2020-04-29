import Vue from 'vue'
import lodash from 'lodash'
import VTooltip from 'v-tooltip'

import 'normalize.css/normalize.css'
import animated from 'animate.css'

import Element from 'element-ui'
import './theme/element/index.css' // please run: cnpm run theme

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import './icons'
import './permission'

import components from './views/common'
import * as filters from './filters'

Vue.prototype._ = lodash

Vue.use(VTooltip, {
  defaultClass: 'el-tooltip__popper is-dark',
  defaultTemplate: '<div role="tooltip"><div class="tooltip__inner"></div><div class="popper__arrow" style="left: 50%;"></div></div>',
})

Vue.use(Element, {
  size: 'small'
})
Vue.use(animated)

// 全局注册组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

// 全局注册指令
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
