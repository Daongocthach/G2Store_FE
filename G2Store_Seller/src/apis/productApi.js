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
    deleteImageProduct(imageId) {
        const url = `gcp-storage/product/object/${imageId}`
        return axiosClient.delete(url)
    },
    exportExcel(product_ids, is_all_products) {
        const url = 'products/export/excel'
        return axiosClient.post(url, { product_ids: product_ids, is_all_products: is_all_products })
    }
}

export default productApi