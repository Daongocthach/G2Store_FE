import { Chip } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'

function ShopFeeShip({ feeShips, shop_id }) {
    const feeShip = feeShips.find(feeShip => feeShip?.shop_id === shop_id)
    const fee = feeShip ? feeShip.fee : 0
    return (
        <Chip color='success' icon={<CheckCircleOutline sx={{ color: 'green' }} />} variant="outlined"
            label={'Phí vận chuyển: ' + formatCurrency(fee)} />
    )
}

export default ShopFeeShip