import axiosClient from './axiosClient'
const productApi = {
    getProducts(page, size) {
        let seed = localStorage.getItem('seed')
        if (!seed)
            seed = 123
        const url = `products?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url)
    },
    getShopProducts(shop_id, page, size) {
        let seed = localStorage.getItem('seed')
        if (!seed)
            seed = 123
        const url = `products/shop/${shop_id}?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url)
    },
    getProduct(productId) {
        const url = `products/${productId}`
        return axiosClient.get(url)
    },
}

export default productApi