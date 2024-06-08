import axiosClient from './axiosClient'
const shopApi = {
    getShops() {
        const url = 'shops?page=0&size=123'
        return axiosClient.get(url)
    },
    lockedShop(shop_id) {
        const url = `shops/${shop_id}/locked`
        return axiosClient.put(url)
    }
}

export default shopApi