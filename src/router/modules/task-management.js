/** When your routing table is too long, you can split it into small modules**/

import defaultLayout from '@/views/layout/menu-split-sidebar/index'
import MenuGroup from '@/views/layout/menu-group/index'

// name值即为后端ID，请使用http://www.uuid.online/ 在前端生成，后端只允许做同步操作

const asyncRouter = {
  path: '/task',
  component: defaultLayout,
  hidden: false,
  alwaysShow: true,
  name: 'b8eef12716e84dab8c9c5772ede8f9d3',
  meta: {
    sortNum: 1,
    roles: [],
    title: '任务调度',
    icon: 'setting'
  },
  children: [
    {
      path: 'actuator',
      component: () => import('@/views/job/actuator-management/main'),
      hidden: false,
      alwaysShow: true,
      name: 'b9162aea0f164e32af6865ac28d3ceda',
      meta: {
        sortNum: 1,
        roles: [],
        title: '执行器管理',
        icon: 'dept'
      }
    },
    {
      path: 'task',
      component: () => import('@/views/job/task-management/main'),
      hidden: false,
      alwaysShow: true,
      name: '2069b78457b54d5db754e693ae197792',
      meta: {
        sortNum: 1,
        roles: [],
        title: '任务管理',
        icon: 'user-setting'
      },
    },
    {
      path: 'log',
      component: () => import('@/views/job/task-log/main'),
      hidden: false,
      alwaysShow: true,
      name: '94d3fd397673477085946c2b8a3b9051',
      meta: {
        sortNum: 1,
        roles: [],
        title: '任务日志',
        icon: 'menu-setting'
      },
    }
  ]
}

export default asyncRouter
