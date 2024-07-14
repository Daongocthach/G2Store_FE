import axiosClient from './axiosClient'
const productApi = {
    getShopProducts(page, size, sort) {
        if (!page) {
            page = 0
        }
        if (!size) {
            size = 8
        }
        const params = {}
        if (sort) {
            params.shopProductSortType = sort
        }
        const url = `products/shop/me?page=${page}&size=${size}`
        return axiosClient.get(url, { params: params })
    },
    getProduct(product_id) {
        const url = `products/${product_id}`
        return axiosClient.get(url)
    },
    getShopCateProducts(shop_cate_id, page, size) {
        if (!page) {
            page = 0
        }
        if (!size) {
            size = 8
        }
        const url = `products/shop-category/${shop_cate_id}?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    addProduct: (formData) => {
        const url = 'products'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.post(url, formData, headers)
    },
    addProductShopCategory(shop_id, data) {
        const url = `products/shop-category/${shop_id}`
        return axiosClient.put(url, data)
    },
    updateProduct(productId, productData) {
        const url = `products/${productId}`
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.put(url, productData, headers)
    },
    deleteProduct(productId) {
        const url = `products/${productId}`
        return axiosClient.delete(url)
    },
    deleteImageProduct(productId, imageId) {
        const url = `products/${productId}/del-image?fileId=${imageId}`
        return axiosClient.put(url)
    },
    exportExcel(product_ids, is_all_products) {
        const url = 'products/export/excel'
        return axiosClient.post(url, { product_ids: product_ids, is_all_products: is_all_products }, { responseType: 'blob' })
    },
    importExcel: (formData) => {
        const url = 'products/update-batch'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.put(url, formData, headers)
    },
    updateStatusProduct(product_id, status) {
        const url = `products/${product_id}/enable?isAvailable=${status}`
        return axiosClient.put(url)
    }
}

export default productApi