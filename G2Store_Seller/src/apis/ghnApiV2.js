import axiosClient from './axiosClient'
const ghnApiV2 = {
    printOrder(orderCode) {
        const url = `ghn/print-order?orderCode=${orderCode}`
        return axiosClient.get(url)
    }
}
export default ghnApiV2