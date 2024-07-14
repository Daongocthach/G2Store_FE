import axiosClient from './axiosClient'
const customerApi = {
    getCustomers(page, size) {
        const url = `customers?page=${page}&size=${size}`
        return axiosClient.get(url)
    },
    lockCustomer(customer_id, isLock) {
        const url = `customers/${customer_id}/locked?isLocked=${isLock}`
        return axiosClient.put(url)
    },
    updateCustomerStatus(customer_id, is_enable) {
        const url = `customers/${customer_id}/locked?isLocked=${is_enable}`
        return axiosClient.put(url)
    }
}

export default customerApi