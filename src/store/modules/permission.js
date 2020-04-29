import { asyncRouterMap, constantRouterMap } from '@/router'
import { filterAsyncRouter, initRouterRoles, initRouterRedirect } from '@/utils/auth'
import { getRouterRoles } from '@/api/login'

const permission = {
  state: {
    adminCode: 'admin',
    // 用于传递给vue router的完整路由信息
    addRouters: [],
    menus: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 重新初始化
      state.menus = []
      // 先放置首页
      state.menus.push(JSON.parse(JSON.stringify(constantRouterMap[constantRouterMap.length - 1].children[0])))
      state.menus = state.menus.concat(JSON.parse(JSON.stringify(routers)))
      // TODO 构建操作页面路由，并设置为永远隐藏
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit, state }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters = null
        if (roles.includes(state.adminCode)) {
          accessedRouters = asyncRouterMap
          initRouterRedirect(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        } else {
          getRouterRoles().then(routerRoles => {
            const routerRolesMap = new Map()
            for(let routerId in routerRoles){
              routerRolesMap.set(routerId, routerRoles[routerId])
            }
            asyncRouterMap.forEach(module => {
              initRouterRoles(module, routerRolesMap)
            })
            accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            initRouterRedirect(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          })
        }
      })
    }
  }
}

export default permission
