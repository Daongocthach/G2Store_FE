import axios from 'axios'

const orderApi = {
  getAllOrders() {
    const url = 'http://localhost:8080/api/v1/admin/orders'
    return axios.get(url)
  },
  getOrderById(orderId) {
    const url = `http://localhost:8080/api/v1/order/${orderId}`
    return axios.get(url)
  },
  getOrderByCustomerId(customerId) {
    const url = `http://localhost:8080/api/v1/orders-customer?customerId=${customerId}`
    return axios.get(url)
  },
  updateOrderStatus(id, orderStatus) {
    if (orderStatus > 4) {
      return
    }
    const url = 'http://localhost:8080/api/v1/update-order-status'
    return axios.put(url, { id, orderStatus })
  },
  deleteOrder(orderId) {
    const url = `http://localhost:8080/api/v1/delete-order/${orderId}`
    return axios.put(url)
  },
  exportOrders(orders, path1) {
    const path = 'C:/Users/PC/Downloads/orders.xlsx'
    const url = `http://localhost:8080/api/v1/order-export?path=${path}`
    return axios.post(url, orders)
  }
}

export default orderApi
