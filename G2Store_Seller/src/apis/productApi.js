import axiosClient from './axiosClient'
const productApi = {
    getShopProducts(id) {
        const url = `product/list/${id}`
        return axiosClient.get(url)
    },
    addProduct: (productData) => {
        const url = '/product/publish'
        return axiosClient.post(url, productData)
    }
}

export default productApi