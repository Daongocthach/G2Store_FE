import axiosClient from './axiosClient'


const statisticApi = {
  getShopStatistic() {
    const url = 'statistical'
    return axiosClient.get(url)
  }
}

export default statisticApi
