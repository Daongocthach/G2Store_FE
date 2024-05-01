import axiosClient from './axiosClient'
const productApi = {
    getProducts(page, size) {
        const seed = sessionStorage.getItem('seed')
        if (!seed)
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
        const url = `products?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url)
    },
    getProductsByCategoryId(categoryId, page, size, sort, startPrice, endPrice, districtId) {
        const seed = sessionStorage.getItem('seed')
        if (!seed)
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
        const params = {}
        if (districtId) {
            params.districtId = districtId
        }
        if (sort) {
            params.sort = sort
        }
        if (startPrice) {
            params.startPrice = startPrice
        }
        if (startPrice) {
            params.endPrice = endPrice
        }
        const url = `products/category/${categoryId}?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url, { params: params })
    },
    searchProducts(name, page, size, sort, startPrice, endPrice, districtId) {
        const seed = sessionStorage.getItem('seed')
        if (!seed)
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
        const params = {}
        if (districtId) {
            params.districtId = districtId
        }
        if (sort) {
            params.sort = sort
        }
        if (startPrice) {
            params.startPrice = startPrice
        }
        if (startPrice) {
            params.endPrice = endPrice
        }
        const url = `products/search?page=${page}&size=${size}&seed=${seed}&name=${name}`
        return axiosClient.get(url, { params: params })
    },
    getShopProducts(shop_id, page, size) {
        const seed = sessionStorage.getItem('seed')
        if (!seed)
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
        const url = `products/shop/${shop_id}?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url)
    },
    getProductsByShopCategoryId(categoryId, page, size) {
        const url = `products/shop-category/${categoryId}?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    getProduct(productId) {
        const url = `products/${productId}`
        return axiosClient.get(url)
    },
}

export default productApi