import axiosClient from './axiosClient'

const promotionApi = {
    getShopPromotions: (id) => {
        const url = `promotion/voucher/list?shopId=${id}`
        return axiosClient.get(url)
    },
    addPromotion: (promotionData) => {
        const url = 'vouchers'
        return axiosClient.post(url, promotionData)
    }
}

export default promotionApi
