import axios from 'axios'
const promotionApi = {
    getAllPromotions() {
        const url = 'http://localhost:8080/api/v1/promotions'
        return axios.get(url)
    },
    getPromotionById(id) {
        const url = `http://localhost:8080/api/v1/promotion/${id}`
        return axios.get(url)
    },
    addPromotion(startDate, endDate, code, value, quantity) {
        const url = 'http://localhost:8080/api/v1/admin/add-promotion'
        return axios.post(url, { startDate, endDate, code, value, quantity })
    },
    updatePromotion(id, startDate, endDate, code, value, quantity) {
        const url = 'http://localhost:8080/api/v1/admin/update-promotion'
        return axios.put(url, { id, startDate, endDate, code, value, quantity } )
    },
    deletePromotion(id) {
        const url = `http://localhost:8080/api/v1/admin/delete-promotion/${id}`
        return axios.delete(url)
    }
}
export default promotionApi