import axiosClient from './axiosClient'
const paymentApi = {
    orderRefund(vnp_CreateBy, vnp_TransactionDate, vnp_TxnRef, vnp_TransactionType, reqAmount) {
        const url = `payments/refund?vnp_CreateBy=${vnp_CreateBy}&vnp_TransactionDate=${vnp_TransactionDate}&vnp_TxnRef=${vnp_TxnRef}&vnp_TransactionType=${vnp_TransactionType}&reqAmount=${reqAmount}`
        return axiosClient.get(url)
    },
    queryTransaction(order_id, trans_date) {
        const url = `payments/query-transaction-from-vnpay?order_id=${order_id}&trans_date=${trans_date}`
        return axiosClient.get(url)
    }
}

export default paymentApi