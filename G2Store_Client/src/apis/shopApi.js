import axiosClient from './axiosClient'
const shopApi = {
    getShopById(shop_id) {
        const url = `shops/${shop_id}`
        return axiosClient.get(url)
    },
    getShopCategories(shop_id) {
        const url = `shop-categories/shop/${shop_id}`
        return axiosClient.get(url)
    },
    getShopCategoryById(category_id) {
        const url = `shop-categories/${category_id}`
        return axiosClient.get(url)
    }
}
export default shopApi