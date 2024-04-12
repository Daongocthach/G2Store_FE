import axios from 'axios'
const token = 'da8bac8e-9519-11ee-8bfa-8a2dda8ec551'
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
    getMethodShip() {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
        const requestData = {
            shop_id: 190509,
            from_district: 1542,
            to_district: 1442
        }
        return axios.get(url, {
            params: requestData,
            headers: {
                'token': token
            }
        })
    },

    calculateFeeShip( districtId ) {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee'
        const requestData = {
            service_id: 53320,
            from_district_id: 3695,
            to_district_id: districtId,
            height: 10,
            length: 10,
            weight: 500,
            width: 10
        }
        return axios.get(url, {
            params: requestData,
            headers: {
                'token': token
            }
        })
    }
}

export default ghnApi