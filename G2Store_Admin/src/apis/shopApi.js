import axiosClient from './axiosClient'
const shopApi = {
    getShops() {
        const url = 'manage/shops'
        return axiosClient.get(url)
    }
}

export default shopApi