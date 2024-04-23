import axiosClient from './axiosClient'
const shopApi = {
    updateShop(data) {
        const url = 'shops'
        return axiosClient.put(url, data)
    }
}
export default shopApi