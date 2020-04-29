import request from '@/utils/request'
import * as Commons from './commons'

const base_url = Commons.moduleName + 'task-log/jobcode/'

export function jobcode(data) {
  return request({
    url: base_url + 'findById',
    method: 'post',
    data
  })
}
export function save(data) {
  return request({
    url: base_url + 'save',
    method: 'post',
    data
  })
}
