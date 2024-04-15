import axiosClient from './axiosClient'
const addressApi = {
    getAddresses() {
        const url = 'addresses/me'
        return axiosClient.get(url)
    },
    addAddress(data) {
        const url = 'addresses/me'
        return axiosClient.post(url, data)
    },
    updateAddress(addressId, data) {
        const url = `addresses/me/${addressId}`
        return axiosClient.put(url, data)
    },
    deleteAddress(addressId) {
        const url = `addresses/me/${addressId}`
        return axiosClient.delete(url)
    }
}

export default addressApi