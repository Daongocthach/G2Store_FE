import axiosClient from './axiosClient'
const authenApi = {
    login(data) {
        const url = 'sellers/login'
        return axiosClient.post(url, data)
    },
    register(data) {
        const url = 'sellers/register'
        return axiosClient.post(url, data)
    },
}

export default authenApi