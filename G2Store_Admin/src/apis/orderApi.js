import axiosClient from './axiosClient'
const orderApi = {
    getOrdersRefunding(page, size) {
        const url = `orders/admin/refunding?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    getOrdersRefunded(page, size) {
        const url = `orders/admin/refunded?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}

export default orderApi