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
    // updateStatus(id, enabled) {
    //     const url = 'http://localhost:8080/api/v1/admin/update-status'
    //     return axios.put(url, { id, enabled } )
    // }
}
export default sellerApi