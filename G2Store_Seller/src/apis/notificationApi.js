import axiosClient from './axiosClient'
const notificationApi = {
    getNotifications(page, size) {
        const url = `notifications/seller/me?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}

export default notificationApi