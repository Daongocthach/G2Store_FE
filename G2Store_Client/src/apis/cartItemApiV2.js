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
  deleteAllCart() {
    const url = 'cart-item-v2/my-cart'
    return axiosClient.delete(url)
  },
  applyCartVoucher(cartItemId, voucherId) {
    const url = `cart-item-v2/${cartItemId}/vouchers/${voucherId}`
    return axiosClient.put(url)
  }
}

export default cartItemV2Api
