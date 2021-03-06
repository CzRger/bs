import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条组件
import 'nprogress/nprogress.css'// 进度条样式
import { getToken, hasPermission } from '@/utils/auth' // 从cookie中获取用户信息

NProgress.configure({ showSpinner: false })// NProgress Configuration

function getDefaultParams( name, routers = []) {
  for (let i = 0; i < routers.length; i++) {
    if (routers[i].name == name) {
      return routers[i]
    }
    if ( routers[i].children && routers[i].children.length >= 0 ) {
      const result = getDefaultParams( name, routers[i].children )
      if (result) {
        return result
      }
    }
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  if (getToken()) { // 判断是否已存在token信息
    if (to.path.indexOf('/login') === 0) {
      next({ path: '/' })
      NProgress.done() // 部分页面可能不会触发路由afterEach钩子
    } else {
      if (store.getters.user === null) { // 判断当前用户是否已拉取完用户信息
        store.dispatch('GetUserInfo').then(data => { // 拉取用户信息
          const roles = data.roles // 必须是数组结构
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // 将未知路由归置到404页面
            router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
            const match = router.matcher.match({path: to.path})
            let matchedRoute = null
            if (match && match.matched && match.matched.length > 0) {
              matchedRoute = getDefaultParams(match.matched[match.matched.length - 1].name, store.getters.addRouters)
            }
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            if (matchedRoute) {
              // 确保query、params携带成功
              next({ ...matchedRoute, replace: true })
            } else {
              next({ ...to, replace: true })
            }
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '登录失败')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断
        if (hasPermission(store.getters.roles, to)) {
          next()
        } else {
          next({ path: '/401', replace: true})
        }
      }
    }
  } else {
    if (to.path.indexOf('/login') === 0) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // 防止当前页面与to相同，导致afterEach钩子未触发
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
