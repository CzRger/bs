import Cookies from 'js-cookie'

const TokenKey = 'USER_TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles 用户的角色列表
 * @param meta meta中规定了有权限操作的所有角色，只要用户具有其中一个即可
 */
export function hasPermission(roles, { meta }) {
  if (roles.indexOf('admin') >= 0) return true
  if (meta && meta.roles) {
    return roles.some(role => meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(router => {
    const temp = { ...router } // 继承一个router对象,非深度复制
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRouter(temp.children, roles)
      }
      res.push(temp)
    }
  })

  return res
}

/**
 * 路由具有层级关系，通常只有叶子路由属于实际的业务逻辑
 * 当用户手动修改url hash值为一个非叶子路由时，redirect将起重要作用，确保进入实际的业务页面
 * 默认redirect构建为子路由第一个不为hidden的路由
 * @param routes
 */
export function initRouterRedirect(routes) {
  routes.forEach(router => {
    // 存在children时，该router为一个布局模板
    if (router.children) {
      for (let i = 0; i < router.children.length; i++) {
        if (!router.children[i].hidden) {
          router.redirect = {
            name: router.children[i].name,
            query: router.children[i].query,
            params: router.children[i].params
          }
          break
        }
      }
      initRouterRedirect(router.children)
    }
  })
}

export function initRouterRoles(router, routerRolesMap) {
  if (!router.meta) {
    router.meta = { }
  }
  if (routerRolesMap.get(router.name)) {
    router.meta.roles = routerRolesMap.get(router.name)
  } else {
    router.meta.roles = []
  }
  if (router.children) {
    router.children.forEach(children => {
      initRouterRoles(children, routerRolesMap)
    })
  }
}
