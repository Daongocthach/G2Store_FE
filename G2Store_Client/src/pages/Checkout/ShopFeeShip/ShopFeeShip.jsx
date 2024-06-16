import { Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import ghnApiV2 from '../../../apis/ghnApiV2'

function ShopFeeShip({ address_id, cartItem, paymentType, totalFeeShip, setTotalFeeShip }) {
    const [feeShip, setFeeShip] = useState(0)
    useEffect(() => {
        ghnApiV2.getFeeShip(address_id, paymentType, cartItem?.cart_item_id)
            .then((response) => {
                const fee = response?.data?.total - cartItem?.shop_free_ship_reduce
                setFeeShip(fee)
                setTotalFeeShip(totalFeeShip + fee)
            })
            .catch((error) => console.error(error))
    }, [address_id, paymentType])
    return (
        <Chip color='success' icon={<CheckCircleOutline sx={{ color: 'green' }} />} variant="outlined"
            label={'Phí vận chuyển: ' + formatCurrency(feeShip || 0)} />
    )
}

export default ShopFeeShip