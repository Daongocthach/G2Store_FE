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
    getMethodShip(shopDistrictId, userDistrictId) {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
        const requestData = {
            shop_id: 190509,
            from_district: shopDistrictId,
            to_district: userDistrictId
        }
        return axios.get(url, {
            params: requestData,
            headers: {
                'token': token
            }
        })
    },
    calculateFeeShip( service_id, shopDistrictId, userDistrictId, height, length, weight, width ) {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee'
        const requestData = {
            service_id: service_id,
            from_district_id: shopDistrictId,
            to_district_id: userDistrictId,
            height: height,
            length: length,
            weight: weight,
            width: width
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