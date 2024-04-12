import axios from 'axios'
const subCategoryApi = {
    getAllSubCategories() {
        const url = 'http://localhost:8080/api/v1/admin/sub-categories'
        return axios.get(url)
    },
    getSubCategoryById(id) {
        const url = `http://localhost:8080/api/v1/sub-category/${id}`
        return axios.get(url)
    },
    getSubCategoriesByCateId(id) {
        const url = `http://localhost:8080/api/v1/sub-categories/${id}`
        return axios.get(url)
    },
    addSubCategory(name, cateId) {
        const url = 'http://localhost:8080/api/v1/admin/add-sub-category'
        return axios.post(url, { name, category: { id: cateId } })
    },
    updateSubCategory(id, name, cateId, enabled ) {
        const url = 'http://localhost:8080/api/v1/admin/update-sub-category'
        return axios.put(url, { id, name, category: { id: cateId, enabled } })
    },
    deleteSubCategory(id) {
        const url = `http://localhost:8080/api/v1/admin/del-sub-category/${id}`
        return axios.put(url)
    }
}

export default subCategoryApi