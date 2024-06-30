import axiosClient from './axiosClient'
const customerApi = {
    getCustomers(page, size) {
        const url = `customers?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}

export default customerApi