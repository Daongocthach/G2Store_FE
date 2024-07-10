import axiosClient from './axiosClient'
const productApi = {
    getProducts(page, size, sort, startPrice, endPrice, districtId) {
        var seed = sessionStorage.getItem('seed')
        if (!seed) {
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
            seed = sessionStorage.getItem('seed')
        }
        const params = {}
        if (districtId) {
            params.districtId = districtId
        }
        if (sort) {
            params.sort = sort
        }
        if (startPrice == 0 || startPrice) {
            params.startPrice = parseInt(startPrice)
        }
        if (endPrice == 0 || endPrice) {
            params.endPrice = endPrice
        }
        const url = `products?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url, { params: params })
    },
    getProductsByCategoryId(categoryId, page, size, sort, startPrice, endPrice, districtId) {
        var seed = sessionStorage.getItem('seed')
        if (!seed) {
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
            seed = sessionStorage.getItem('seed')
        }
        const params = {}
        if (districtId) {
            params.districtId = districtId
        }
        if (sort) {
            params.sort = sort
        }
        if (startPrice == 0 || startPrice) {
            params.startPrice = parseInt(startPrice)
        }
        if (endPrice == 0 || endPrice) {
            params.endPrice = endPrice
        }
        const url = `products/category/${categoryId}?page=${page}&size=${size}&seed=${seed}`
        return axiosClient.get(url, { params: params })
    },
    searchProducts(name, page, size, sort, startPrice, endPrice, districtId) {
        var seed = sessionStorage.getItem('seed')
        if (!seed) {
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
            seed = sessionStorage.getItem('seed')
        }
        const params = {}
        if (districtId) {
            params.districtId = districtId
        }
        if (sort) {
            params.sort = sort
        }
        if (startPrice == 0 || startPrice) {
            params.startPrice = startPrice
        }
        if (endPrice == 0 || endPrice) {
            params.endPrice = endPrice
        }
        const url = `products/search?page=${page}&size=${size}&seed=${seed}&name=${name}`
        return axiosClient.get(url, { params: params })
    },
    getShopProducts(shop_id, page, size, sort, name, shop_cate_id, startPrice, endPrice) {
        var seed = sessionStorage.getItem('seed')
        if (!seed) {
            sessionStorage.setItem('seed', Math.floor((Math.random() * 100) + 1))
            seed = sessionStorage.getItem('seed')
        }
        const params = {}
        if (startPrice == 0 || startPrice) {
            params.startPrice = startPrice
        }
        if (endPrice == 0 || endPrice) {
            params.endPrice = endPrice
        }
        if (name) {
            params.name = name
        }
        if (shop_cate_id) {
            params.shopCateId = shop_cate_id
        }
        const url = `products/shop/${shop_id}?page=${page}&size=${size}&seed=${seed}&sort=${sort}`
        console.log(params)
        return axiosClient.get(url, { params: params })
    },
    getTop5ShopProducts(shop_id) {
        const url = `products/top-five/shop/${shop_id}`
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