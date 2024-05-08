import axiosClient from './axiosClient'


const orderApi = {
  getShopOrders(orderStatus, page, size) {
    const url = `orders/shop?orderStatus=${orderStatus}&page=${page}&size=${size}`
    return axiosClient.get(url)
  },
  updateOrder(order_id, orderStatus) {
    const url = `orders/${order_id}/shop?orderStatus=${orderStatus}`
    return axiosClient.put(url)
  }
}

export default orderApi
