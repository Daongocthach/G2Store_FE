import axiosClient from './axiosClient'
const authenApi = {
    login(data) {
        const url = 'admins/login'
        return axiosClient.post(url, data)
    }
}

export default authenApi