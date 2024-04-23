import axiosClient from './axiosClient'

const categoryApi = {
    getCategories() {
        const url = 'categories'
        return axiosClient.get(url)
    },
    getShopCategories(shop_id) {
        const url = `shop-categories/shop/${shop_id}`
        return axiosClient.get(url)
    },
    addShopCategory(data) {
        const url = 'shop-categories'
        return axiosClient.post(url, data)
    },
    updateShopCategory(category_id, name) {
        const url = `shop-categories/${category_id}`
        return axiosClient.put(url, { name, parent_id: '' })
    },
    deleteShopCategory(category_id) {
        const url = `shop-categories/${category_id}`
        return axiosClient.delete(url)
    },
    getShopCategoryById(category_id) {
        const url = `shop-categories/${category_id}`
        return axiosClient.get(url)
    }
}
export default categoryApi