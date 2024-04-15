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
    logout() {
        const url = 'logout'
        return axiosClient.get(url)
    },
    me() {
        const url = 'customers/me'
        return axiosClient.get(url)
    },
    updateProfile(data) {
        const url = 'customers/me'
        return axiosClient.put(url, data)
    },
    updateEmail(data) {
        const url = 'customers/me/email'
        return axiosClient.put(url, data)
    },
    updatePhone(data) {
        const url = 'customers/me/phone-no'
        return axiosClient.put(url, data)
    },
    updatePassword(data) {
        const url = 'customers/me/password'
        return axiosClient.put(url, data)
    },
}

export default authenApi