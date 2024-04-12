import axiosClient from './axiosClient'
const sellerApi = {
    getSellers(shopId) {
        const url = `setting/sellers/list?shopId=${shopId}`
        return axiosClient.get(url)
    },
    addSeller(email, password, roleId, shopId) {
        const url = 'setting/seller/create'
        return axiosClient.post(url, { email, password, roleId, shopId })
    },
    // updateStatus(id, enabled) {
    //     const url = 'http://localhost:8080/api/v1/admin/update-status'
    //     return axios.put(url, { id, enabled } )
    // }
}
export default sellerApi