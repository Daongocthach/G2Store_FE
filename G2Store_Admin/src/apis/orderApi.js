import axiosClient from './axiosClient'
const orderApi = {
    getOrdersRefund(page, size) {
        const url = `orders/admin/refunding?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}

export default orderApi