import request from '@/utils/request'

const base_url = '/taiji-system-admin-server/admin/auth/'

export function captcha() {
  return request({
    url: base_url + 'captcha',
    method: 'get'
  })
}

export function loginByLoginName(data) {
  data.password = lock(data.show_password, data.captcha.split('').reverse().join(''))
  return request({
    url: base_url + 'login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: base_url + 'user-authorities',
    method: 'get',
    data: { token }
  })
}

export function getRouterRoles(token) {
  return request({
    url: base_url + 'system-authorities',
    method: 'get',
    data: { token }
  })
}

export function logout(token) {
  return request({
    url: base_url + 'logout',
    method: 'get',
    data: { token }
  })
}

function lock(pw, captcha) {
  let str = pw
  captcha.split('').forEach(c => {
    str = str.replace(/[!-~]/g, function(v) {
      const code = v.charCodeAt()
      let index = code + c.charCodeAt()
      if(index > 126) {
        index = 32 + (index - 126)
        if(index > 126) {
          index = 32 + (index - 126)
        }
      }
      return String.fromCharCode(index)
    })
  })
  return str
}
