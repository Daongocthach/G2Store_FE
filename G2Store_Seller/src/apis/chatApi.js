import axiosClient from './axiosClient'
const chatApi = {
    getChatRooms() {
        const url = 'chat_rooms'
        return axiosClient.get(url)
    },
    getMessage(senderId, recipientId) {
        const url = `messages/${senderId}/${recipientId}`
        return axiosClient.get(url)
    }
}
export default chatApi