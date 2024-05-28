import axiosClient from './axiosClient'
const sellerApi = {
    getSellers() {
        const url = 'admins/sellers'
        return axiosClient.get(url)
    }
}

export default sellerApi