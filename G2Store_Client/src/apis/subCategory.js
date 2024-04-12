import axios from 'axios'
const subCategoryApi = {
    getAllEnabledSubCategories() {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}sub-categories-enabled`
        return axios.get(url)
    },
    getSubCategoryById(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}sub-category/${id}`
        return axios.get(url)
    },
    getSubCategoriesByCateId(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}sub-categories/${id}`
        return axios.get(url)
    },
}

export default subCategoryApi