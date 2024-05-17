import axiosClient from './axiosClient'


const reviewApi = {
  getShopreview(reviewId, feedback) {
    const url = `reviews/${reviewId}/shop-feedback`
    return axiosClient.put(url, { feedback })
  }
}

export default reviewApi
