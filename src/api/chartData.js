import request from '@/utils/request'

export function fetch(data) {
  return request({
    url: '/ChartData/GetByProdNo',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/ChartData/Update',
    method: 'post',
    data
  })
}
