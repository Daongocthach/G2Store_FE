import axiosClient from './axiosClient'
const sellerApi = {
    getShopSellers() {
        const url = 'sellers/my-shop'
        return axiosClient.get(url)
    },
    addShopSeller(email, password, role_id) {
        const url = 'sellers/my-shop'
        return axiosClient.post(url, { email, password, role_id })
    },
    updateSellerRole(seller_id, role_id) {
        const url = `sellers/${seller_id}/role/${role_id}`
        return axiosClient.put(url)
    },
    updateSellerStatus(seller_id, is_enable) {
        const url = `sellers/${seller_id}/enable?isEnable=${is_enable}`
        return axiosClient.put(url)
    }
}
export default sellerApi