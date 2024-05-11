import axiosClient from './axiosClient'
const reviewApi = {
    getReviewByProductId(product_id, page, size, sortType) {
        const params = {}
        if (sortType) {
            params.sortType = sortType
        }
        const url = `reviews/product/${product_id}?pageNum=${page}&pageSize=${size}`
        return axiosClient.get(url, { params: params })
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