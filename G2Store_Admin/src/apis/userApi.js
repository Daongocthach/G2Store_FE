import axiosClient from './axiosClient'
const customerApi = {
    getCustomers() {
        const url = 'admins/customers'
        return axiosClient.get(url)
    }
}

export default customerApi