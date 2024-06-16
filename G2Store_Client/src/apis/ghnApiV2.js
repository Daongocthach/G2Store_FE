import axiosClient from './axiosClient'
const ghnApiV2 = {
    getFeeShip(addressId, payment, cartItemId) {
        const url = `ghn/calculate-fee-ship?addressId=${addressId}&payment=${payment}&cartItemId=${cartItemId}`
        return axiosClient.get(url)
    }
}
export default ghnApiV2