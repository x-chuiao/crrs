import request from '@/utils/request'

export function getWorks(params) {
  return request({
    url: '/works/list',
    method: 'get',
    params
  })
}
