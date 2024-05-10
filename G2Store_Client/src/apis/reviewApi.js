import axiosClient from './axiosClient'
const reviewApi = {
    getReviewByProductId(product_id, page, size) {
        const url = `reviews/product/${product_id}?pageNum=${page}&pageSize=${size}`
        return axiosClient.get(url)
    },
    addReview(data, files) {
        const url = 'reviews/me'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.post(url, data, files, headers)
    }
}
export default reviewApi