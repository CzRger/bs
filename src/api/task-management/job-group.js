import request from '@/utils/request'
import * as Commons from './commons'

const base_url = Commons.moduleName + 'task-log/jobgroup/'

export function pageList(data) {
  return request({
    url: base_url + 'pageList',
    method: 'post',
    data
  })
}
export function findAll(data) {
  return request({
    url: base_url + 'findAll',
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
export function update(data) {
  return request({
    url: base_url + 'update',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: base_url + 'remove',
    method: 'post',
    data
  })
}
export function loadById(data) {
  return request({
    url: base_url + 'loadById',
    method: 'post',
    data
  })
}

