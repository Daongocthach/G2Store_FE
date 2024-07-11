import axiosClient from './axiosClient'
const orderApi = {
    getOrdersRefunding(page, size) {
        const url = `orders/admin/refunding?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    getOrdersRefunded(page, size) {
        const url = `orders/admin/refunded?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    refundOrder(order_id) {
        const url = `orders/${order_id}/refund`
        return axiosClient.put(url)
    }
}

export default orderApi