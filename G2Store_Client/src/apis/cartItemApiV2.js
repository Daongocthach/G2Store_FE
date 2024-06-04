import axiosClient from './axiosClient'

const cartItemV2Api = {
  getCartItems() {
    const url = 'cart-item-v2/list'
    return axiosClient.get(url)
  },
  addToCart(data) {
    const url = 'cart-item-v2'
    return axiosClient.post(url, data)
  },
  updateQuantity(data) {
    const url = 'cart-item-v2'
    return axiosClient.put(url, data)
  },
  deleteCartItem(cartItemId) {
    const url = `cart-item-v2/${cartItemId}`
    return axiosClient.delete(url)
  }
}

export default cartItemV2Api
