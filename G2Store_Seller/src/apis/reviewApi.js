import axiosClient from './axiosClient'


const reviewApi = {
  shopFeedBack(reviewId, feedback) {
    const url = `reviews/${reviewId}/shop-feedback?feedBack=${feedback}'`
    return axiosClient.put(url)
  },
  getShopReviews(page, size, star) {
    const params = {}
    if (star) {
      params.star = star
    }
    const url = `reviews?page=${page}&size=${size}`
    return axiosClient.get(url, { params: params })
  }
}

export default reviewApi
