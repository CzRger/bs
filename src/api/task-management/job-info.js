import request from '@/utils/request'
import * as Commons from './commons'

const base_url = Commons.moduleName + 'task-log/jobinfo/'

export function pageList(data) {
  return request({
    url: base_url + 'pageList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: base_url + 'add',
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
export function start(data) {
  return request({
    url: base_url + 'start',
    method: 'post',
    data
  })
}
export function stop(data) {
  return request({
    url: base_url + 'stop',
    method: 'post',
    data
  })
}
export function trigger(data) {
  return request({
    url: base_url + 'trigger',
    method: 'post',
    data
  })
}
