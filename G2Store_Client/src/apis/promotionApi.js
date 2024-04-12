import axios from 'axios'
const promotionApi = {
    checkPromotion(code) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}check-promotion?code=${code}`
        return axios.get(url)
    },
    getAllPromotions() {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}promotions`
        return axios.get(url)
    },
    usePromotion(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}use-promotion/${id}`
        return axios.put(url)
    }
}
export default promotionApi