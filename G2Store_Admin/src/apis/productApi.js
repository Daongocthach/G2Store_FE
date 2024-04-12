import axios from 'axios'
const productApi = {
    getAllProducts() {
        const url = 'http://localhost:8080/api/v1/admin/products'
        return axios.get(url)
    },
    getProductById(id) {
        const url = `http://localhost:8080/api/v1/product/${id}`
        return axios.get(url)
    },
    addProduct(name, price, description, discount, subCategoryId, providerId, image) {
        const url = 'http://localhost:8080/api/v1/admin/add-product'
        return axios.post(url,
            { name, price, description, discount, subCategory: { id: subCategoryId }, provider: { id: providerId }, image })
    },
    updateProduct(id, name, price, description, discount, subCategoryId, providerId, image, enabled) {
        const url = 'http://localhost:8080/api/v1/admin/update-product'
        return axios.put(url,
            { id, name, price, description, discount, subCategory: { id: subCategoryId }, provider: { id: providerId }, image, enabled })
    },
    deleteProduct(id) {
        const url = `http://localhost:8080/api/v1/admin/del-product/${id}`
        return axios.put(url)
    }
}

export default productApi