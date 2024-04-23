import axiosClient from './axiosClient'
const reviewApi = {
    getReviewByProductId(product_id) {
        const url = `reviews/product/${product_id}`
        return axiosClient.get(url)
    }
}
export default reviewApi