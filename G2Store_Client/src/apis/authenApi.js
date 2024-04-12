import axiosClient from './axiosClient'
const authenApi = {
    login(data) {
        const url = 'customers/login'
        return axiosClient.post(url, data)
    },
    register(data) {
        const url = 'customers/register'
        return axiosClient.post(url, data)
    },
}

export default authenApi