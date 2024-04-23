import axiosClient from './axiosClient'

const cartItemApi = {
  getCartItems() {
    const url = 'cart-items/me'
    return axiosClient.get(url)
  },
  getCartItemsIntended() {
    const url = 'intended-cart/me'
    return axiosClient.get(url)
  },
  addToCart(data) {
    const url = 'cart-items/me'
    return axiosClient.post(url, data)
  },
  updateQuantity(data) {
    const url = 'cart-items/me'
    return axiosClient.put(url, data)
  },
  deleteCartItem(productId) {
    const url = `cart-items/me/${productId}`
    return axiosClient.delete(url)
  }
}

export default cartItemApi
