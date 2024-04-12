import axios from 'axios'

const orderApi = {
  getOrderByCustomerId(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer?customerId=${customerId}`
    return axios.get(url)
  },
  getOrderByCustomerIdPending(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer-pending?customerId=${customerId}`
    return axios.get(url)
  },
  getOrderByCustomerIdConfirmed(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer-confirmed?customerId=${customerId}`
    return axios.get(url)
  },
  getOrderByCustomerIdOnDelivery(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer-on-delivery?customerId=${customerId}`
    return axios.get(url)
  },
  getOrderByCustomerIdCancel(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer-cancel?customerId=${customerId}`
    return axios.get(url)
  },
  getOrderByCustomerIdSuccess(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}orders-customer-success?customerId=${customerId}`
    return axios.get(url)
  },
  updateOrderStatus(id, orderStatus) {
    if (orderStatus > 4) {
      return
    }
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}update-order-status`
    return axios.put(url, { id, orderStatus })
  },
  addOrder(order) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}add-order`
    return axios.post(url, order)
  },
  deleteOrder(orderId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}delete-order/${orderId}`
    return axios.put(url)
  }
}

export default orderApi
