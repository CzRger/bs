import request from '@/utils/request'
import * as Commons from './commons'

const base_url = Commons.moduleName + 'task-log/joblog/'

export function pageList(data) {
  return request({
    url: base_url + 'pageList',
    method: 'post',
    data
  })
}
export function logDetailCat(data) {
  return request({
    url: base_url + 'logDetailCat',
    method: 'post',
    data
  })
}
