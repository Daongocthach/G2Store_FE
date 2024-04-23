import axiosClient from './axiosClient'
const authenApi = {
    login(data) {
        const url = 'admins/login'
        return axiosClient.post(url, data)
    },
    logout() {
        const url = 'logout'
        return axiosClient.get(url)
    },
    refeshToken() {
        const url = 'admins/refresh-token'
        const rtk = localStorage.getItem('rtk')
        return axiosClient.post(url, { refresh_token: rtk })
    }
}

export default authenApi