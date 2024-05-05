import axiosClient from './axiosClient'


const orderApi = {
  getOrders(orderStatus, page, size) {
    const url = `orders/me?orderStatus=${orderStatus}&page=${page}&size=${size}`
    return axiosClient.get(url)
  }
}

export default orderApi
