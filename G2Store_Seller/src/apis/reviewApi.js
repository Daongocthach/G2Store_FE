import axiosClient from './axiosClient'


const reviewApi = {
  shopFeedBack(reviewId, feedback) {
    const url = `reviews/${reviewId}/shop-feedback?feedBack=${feedback}'`
    return axiosClient.put(url)
  },
  getShopReviews() {
    const url = 'reviews/shop-reviews'
    return axiosClient.get(url)
  }
}

export default reviewApi
