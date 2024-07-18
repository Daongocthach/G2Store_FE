import axiosClient from './axiosClient'
const statisticApi = {
  getAdminStatistical() {
    const url = 'statistical/admin'
    return axiosClient.get(url)
  }
}

export default statisticApi
