import axiosClient from './axiosClient'

const orderApi = {
  addOrder(data) {
    const url = 'orders/me'
    return axiosClient.post(url, data)
  },
  getOrders(orderStatus, page, size) {
    const url = `orders/me?orderStatus=${orderStatus}&page=${page}&size=${size}`
    return axiosClient.get(url)
  },
  goodsReceived(order_id) {
    const url = `orders/${order_id}/me?orderStatus=RECEIVED`
    return axiosClient.put(url)
  }
}

export default orderApi
