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
    logout() {
        const url = 'logout'
        return axiosClient.get(url)
    },
    me() {
        const url = 'sellers/me'
        return axiosClient.get(url)
    },
    updateProfile(data) {
        const url = 'sellers/me'
        return axiosClient.put(url, data)
    },
    updateAvatar: (formData) => {
        const url = 'sellers/upload-avatar'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.put(url, formData, headers)
    }
}

export default authenApi