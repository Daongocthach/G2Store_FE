import axiosClient from './axiosClient'


const statisticApi = {
  getShopStatistic(year) {
    const params = {}
    if (year) {
      params.year = year
    }
    const url = 'statistical'
    return axiosClient.get(url, { params: params })
  }
}

export default statisticApi
