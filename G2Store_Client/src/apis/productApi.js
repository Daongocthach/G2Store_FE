import axios from 'axios'
const productApi = {
    getAllEnabledProducts(page, size) {
        if (!page)
            page = 0
        if (!size)
            size = 8
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}products-enabled?page=${page}`
        return axios.get(url)
    },
    getProductById(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}product/${id}`
        return axios.get(url)
    },
    getProductsByProviderId(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}products-provider/${id}`
        return axios.get(url)
    },
    getProductsBySubCategoryId(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}products-subcategory/${id}`
        return axios.get(url)
    },
    getProductsByCategoryId(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}products-category/${id}`
        return axios.get(url)
    },
    searchProductsByName(keyword) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}products-search?keyword=${keyword}`
        return axios.get(url)
    }
}

export default productApi