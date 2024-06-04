import axios from 'axios'
const roomApi = {
    createRoom(receiverName, senderName) {
        const url = 'http://localhost:8080/api/v1/create-room'
        return axios.post(url, { receiverName, senderName })
    },
    getRoomsBySenderName(senderName) {
        const url = `http://localhost:8080/api/v1/rooms?senderName=${senderName}`
        return axios.get(url)
    },
    getRoomById(id) {
        const url = `http://localhost:8080/api/v1/room/${id}`
        return axios.get(url)
    }
}

export default roomApi