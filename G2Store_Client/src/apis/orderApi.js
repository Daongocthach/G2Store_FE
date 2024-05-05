import axiosClient from './axiosClient'

const orderApi = {
  addOrder(data) {
    const url = 'orders/create-orders'
    return axiosClient.post(url, data)
  },
  getOrders(orderStatus, page, size) {
    const url = `orders/me?orderStatus=${orderStatus}&page=${page}&size=${size}`
    return axiosClient.get(url)
  }
}

export default orderApi
