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
  updateQuantity(shopItemId, quantity) {
    const url = `shop-items/${shopItemId}?quantity=${quantity}`
    return axiosClient.put(url)
  },
  deleteCartItems(cartItemId) {
    const url = `cart-item-v2/${cartItemId}`
    return axiosClient.delete(url)
  },
  deleteShopItem(shopItemId) {
    const url = `shop-items/${shopItemId}`
    return axiosClient.delete(url)
  },
  applyCartVoucher(data) {
    const url = 'cart-item-v2'
    return axiosClient.put(url, data)
  },
}

export default cartItemV2Api
