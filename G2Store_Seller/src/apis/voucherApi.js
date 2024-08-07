import axiosClient from './axiosClient'
const voucherApi = {
    addVoucher: (data) => {
        const url = 'vouchers'
        return axiosClient.post(url, data)
    },
    getProductVouchers(product_id) {
        const url = `vouchers/product/${product_id}`
        return axiosClient.get(url)
    },
    getShopVouchers(page, size, status, name, voucherId) {
        const params = {}
        if (name) {
            params.name = name
        }
        if (status) {
            params.status = status
        }
        if (voucherId) {
            params.voucherId = voucherId
        }
        const url = `vouchers/shop?page=${page}&size=${size}`
        return axiosClient.get(url, { params: params })
    },
    addVoucherToProducts(voucher_id, data) {
        const url = `vouchers/${voucher_id}/add-to-products`
        return axiosClient.post(url, data)
    },
    getVoucherById(voucher_id) {
        const url = `vouchers/${voucher_id}`
        return axiosClient.get(url)
    },
    pauseVoucher(voucher_id, isPause) {
        const url = `vouchers/${voucher_id}/pause?isPaused=${isPause}`
        return axiosClient.put(url)
    }
}
export default voucherApi