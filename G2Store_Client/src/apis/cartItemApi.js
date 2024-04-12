import axios from 'axios'

const cartItemApi = {
  getAllCartItems() {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}cartitems`
    return axios.get(url)
  },
  getCartItemById(customerId, productId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}cartitem?customerId=${customerId}&productId=${productId}`
    return axios.get(url)
  },
  addCartItem(cartItem) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}add-cartitems`
    return axios.post(url, cartItem)
  },
  updateCartItem(cartItem) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}update-cartitems`
    return axios.put(url, cartItem)
  },
  deleteCartItem(customerId, productId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}delete-cartitem?customerId=${customerId}&productId=${productId}`
    return axios.delete(url)
  },
  deleteAllCartItemByCustomerId(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}delete-cartitems-customer?customerId=${customerId}`
    return axios.delete(url)
  },
  getCartItemsByCustomerId(customerId) {
    const url = `${import.meta.env.VITE_PUBLIC_API_URL}cartitems-customer?customerId=${customerId}`
    return axios.get(url)
  }
}

export default cartItemApi
