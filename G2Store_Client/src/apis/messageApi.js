import axios from 'axios'
const messageApi = {
    getMessagesByRoomId(id) {
        const url = `http://localhost:8080/api/v1/messages-room/${id}`
        return axios.get(url)
    }
}

export default messageApi