import axios from 'axios'
const token = 'da8bac8e-9519-11ee-8bfa-8a2dda8ec551'
const shop_id = 190509
const ghnApi = {
    getProvices() {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province'
        return axios.get(url, {
            headers: {
                'token': token
            }
        })
    },
    getDistricts(code) {
        const url = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${code}`
        return axios.get(url, {
            headers: {
                'token': token
            }
        })
    },
    getWards(code) {
        const url = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${code}`
        return axios.get(url, {
            headers: {
                'token': token
            }
        })
    },

    createOrder(data) {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create'
        return axios.post(url, data, {
            headers: {
                'token': token,
                'shop_id': shop_id
            }
        })
    },
    printOrder(order_codes) {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token'
        return axios.post(url, {
            order_codes: order_codes
        }, {
            headers: {
                'token': token
            }
        })
    },
    getPickShips() {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shift/date'
        return axios.get(url, {
            headers: {
                'token': token
            }
        })
    }
}

export default ghnApi