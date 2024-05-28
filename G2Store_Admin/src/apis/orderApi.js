import axiosClient from './axiosClient'
const orderApi = {
    getOrders() {
        const url = 'admins/orders'
        return axiosClient.get(url)
    }
}

export default orderApi