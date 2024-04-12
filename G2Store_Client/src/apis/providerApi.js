import axios from 'axios'
const providerApi = {
    getAllEnabledProviders() {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}providers-enabled`
        return axios.get(url)
    },
    getProviderById(id) {
        const url = `${import.meta.env.VITE_PUBLIC_API_URL}provider/${id}`
        return axios.get(url)
    }
}
export default providerApi