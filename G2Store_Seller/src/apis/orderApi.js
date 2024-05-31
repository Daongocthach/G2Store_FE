import axiosClient from './axiosClient'


const orderApi = {
  getShopOrders(orderStatus, page, size) {
    const params = {}
    if (orderStatus) {
      params.orderStatus = orderStatus
    }
    const url = `orders/shop?page=${page}&size=${size}`
    return axiosClient.get(url, { params: params })
  },
  getOrder(order_id) {
    const url = `orders/${order_id}`
    return axiosClient.get(url)
},
  updateOrder(order_id, orderStatus) {
    const url = `orders/${order_id}/shop?orderStatus=${orderStatus}`
    return axiosClient.put(url)
  }
}

export default orderApi
