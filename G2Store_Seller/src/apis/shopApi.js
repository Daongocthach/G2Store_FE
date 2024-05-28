import axiosClient from './axiosClient'
const shopApi = {
    updateShop(data) {
        const url = 'shops'
        return axiosClient.put(url, data)
    },
    updateImageShop: (formData) => {
        const url = 'shops/upload-image'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.put(url, formData, headers)
    },
    getShopById(shop_id) {
        const url = `shops/${shop_id}`
        return axiosClient.get(url)
    }
}
export default shopApi