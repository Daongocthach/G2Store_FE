import axiosClient from './axiosClient'
const productApi = {
    getShopProducts(shopId, page, size) {
        if (!page) {
            page = 0
        }
        if (!size) {
            size = 8
        }
        const url = `products/shop/${shopId}?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    addProduct: (productData) => {
        const url = 'products'
        return axiosClient.post(url, productData)
    },
    updateProduct(productId, productData) {
        const url = `products/${productId}`
        return axiosClient.put(url, productData)
    },
    deleteProduct(productId) {
        const url = `products/${productId}`
        return axiosClient.delete(url)
    }
}

export default productApi