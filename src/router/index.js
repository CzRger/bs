import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Layout，建议在一级路由中应用不同的布局
 */
import defaultLayout from '@/views/layout/menu-split-sidebar/index'
import topMenuLayout from '@/views/layout/top-menu-first/index'

/* 模块化路由 */
import systemManagementRouter from './modules/system-management'
import jobManagementRouter from './modules/task-management'

/**
 * 静态路由定义，无需权限的全局路由
 * @type {*[]}
 */
export const constantRouterMap = [
  {
    path: '/redirect', // 通常用于刷新当前路由，可参见tagsView中的案例
    component: defaultLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/components/Redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: '8a9fcbf71ce7402186b5f961b4cf25df',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/components/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/components/ErrorPage/401'),
    hidden: true
  },
  {
    path: '/myself',
    component: topMenuLayout,
    hidden: true,
    name: '9ef88a11772941dfa0c6e73429659c15',
    meta: { title: '个人设置', icon: 'user' },
    children: [
      {
        path: 'modify',
        component: () => import('@/views/system-management/user/myself/modify'),
        name: 'myself-modify',
        meta: { title: '个人信息编辑', icon: 'user' }
      }
    ]
  },
  {
    path: '',
    component: topMenuLayout,
    hidden: false,
    redirect: 'index',
    name: '3a59b9ec31344737a7c07510b4d60310',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/index'),
        name: '3a59b9ec31344737a7c07510b4d60310',
        meta: { title: '运行报表', icon: 'index' }
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

/**
 * 聚合子模块路由对象，登录后异步匹配路由结构，动态添加路由
 * 建议，该动态路由表由前端控制
 * asyncRouterMap动态够钱过程中，请在最后末尾处加上路由 ： { path: '*', redirect: '/404', hidden: true }，将未知路由归置到404页面, 详见src/store/modules/permission.js
 */
export const asyncRouterMap = [
  jobManagementRouter,
  systemManagementRouter,
]

export const asyncMenuMap = JSON.parse(JSON.stringify(asyncRouterMap))