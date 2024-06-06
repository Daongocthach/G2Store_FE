import axiosClient from './axiosClient'
const voucherApi = {
    getProductVouchers(product_id) {
        const url = `vouchers/product/${product_id}`
        return axiosClient.get(url)
    },
    addVoucherToProduct(product_id) {
        const url = `vouchers/${product_id}/add-to-products`
        return axiosClient.post(url)
    },
    getVoucherById(voucher_id) {
        const url = `vouchers/${voucher_id}`
        return axiosClient.get(url)
    }
}
export default voucherApi