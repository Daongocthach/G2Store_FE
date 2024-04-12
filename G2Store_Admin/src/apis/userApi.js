import axios from 'axios'
const userApi = {
    getAllCustomers() {
        const url = 'http://localhost:8080/api/v1/admin/customers'
        return axios.get(url)
    },
    getCustomerById(id) {
        const url = `http://localhost:8080/api/v1/customer/${id}`
        return axios.get(url)
    },
    updateStatus(id, enabled) {
        const url = 'http://localhost:8080/api/v1/admin/update-status'
        return axios.put(url, { id, enabled } )
    }
}
export default userApi