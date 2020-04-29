const getters = {
  sidebar: state => state.app.sidebar,

  visitedViews: state => state.tagsView.visitedViews,

  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.roles,

  adminCode: state => state.permission.adminCode,
  menus: state => state.permission.menus,
  addRouters: state => state.permission.addRouters,

  dictionaries: state => state.dictionaries
}
export default getters
