import axiosClient from './axiosClient'

const orderApi = {
  addOrder(data) {
    const url = 'orders/me'
    return axiosClient.post(url, data)
  },
  getOrders() {
    const url = 'orders/me'
    return axiosClient.get(url)
  }
}

export default orderApi
