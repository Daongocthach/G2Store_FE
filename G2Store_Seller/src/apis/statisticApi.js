import axiosClient from './axiosClient'


const statisticApi = {
  getShopStatistic(year) {
    const params = {}
    if (year) {
      params.year = year
    }
    const url = 'statistical'
    return axiosClient.get(url, { params: params })
  },
  getProductStatistic(product_id) {
    const url = `products/${product_id}/statistical`
    return axiosClient.get(url)
  },
}

export default statisticApi
