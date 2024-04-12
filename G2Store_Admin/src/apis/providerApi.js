import axios from 'axios'
const providerApi = {
    getAllProviders() {
        const url = 'http://localhost:8080/api/v1/admin/providers'
        return axios.get(url)
    },
    getProviderById(id) {
        const url = `http://localhost:8080/api/v1/provider/${id}`
        return axios.get(url)
    },
    addProvider(name, brand, phoneNo, address) {
        const url = 'http://localhost:8080/api/v1/admin/add-provider'
        return axios.post(url, { name, brand, phoneNo, address })
    },
    updateProvider(id, name, brand, phoneNo, address, enabled) {
        const url = 'http://localhost:8080/api/v1/admin/update-provider'
        return axios.put(url, { id, name, brand, phoneNo, address, enabled } )
    },
    deleteProvider(id) {
        const url = `http://localhost:8080/api/v1/admin/delete-provider/${id}`
        return axios.put(url)
    }
}
export default providerApi