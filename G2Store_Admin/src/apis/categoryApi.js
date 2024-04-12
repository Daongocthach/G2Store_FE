import axiosClient from './axiosClient'

const categoryApi = {
    getCategories() {
        const url = 'categories'
        return axiosClient.get(url)
    },
    addCategory(data) {
        const url = 'categories'
        return axiosClient.post(url, data)
    },
    updateCategory(category_id, name) {
        const url = `categories/${category_id}`
        return axiosClient.put(url, { name, parent_id: '' })
    },
    deleteCategory(category_id) {
        const url = `categories/${category_id}`
        return axiosClient.put(url)
    },
    getCategoryById(category_id) {
        const url = `categories/${category_id}`
        return axiosClient.get(url)
    }
}
export default categoryApi