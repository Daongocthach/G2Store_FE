import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../../utils/price'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import imgSale from '../../../assets/img/sale.jpg'
import imgPayment from '../../../assets/img/payment.png'

function RightInformation({ cartItems, isSoldOut }) {
    const navigate = useNavigate()
    const cartQuantity = useSelector(state => state.cart.cartItems)
    const triggerAlert = useAlert()
    var total = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem?.shop_subtotal, 0)
    const handleClickCheckout = () => {
        if (cartItems.length < 1)
            triggerAlert('Bạn chưa có sản phẩm nào trong giỏ!', false, true)
        else if (isSoldOut) {
            triggerAlert('Vui lòng bỏ các sản phẩm hết hàng khỏi giỏ hàng!', false, true)
        }
        else {
            const data = {
                total, cartItems
            }
            navigate('/checkout', { state: data })
        }
    }
    return (
        <Box className='flex flex-col gap-2'>
            <img src={imgPayment} alt='payment' className='h-30 w-full rounded-lg' />
            <Typography fontSize={20} fontWeight={'bold'} className="text-gray-700">Thông tin đơn hàng</Typography>
            <Box className="flex items-center justify-between gap-2 mt-4">
                <Typography fontSize={15} className="text-gray-700">Tiền hàng ({cartQuantity && cartQuantity.length}):</Typography>
                <Typography fontSize={15} fontWeight={'bold'} className="text-gray-600">{formatCurrency(total)}</Typography>
            </Box>
            <Box className="flex items-center justify-between gap-2 mt-4">
                <Typography fontSize={17} className="text-gray-700">Tổng cộng:</Typography>
                <Typography fontSize={17} fontWeight={'bold'} className="text-red-600">{formatCurrency(total)}</Typography>
            </Box>
            <Typography fontSize={13} className="text-gray-700 text-end">Đã bao gồm vat (nếu có)</Typography>
            <Button fullWidth onClick={handleClickCheckout} variant='contained' color='warning'>Thanh toán</Button>
            <img src={imgSale} alt='sale' className='h-30 w-full rounded-lg' />
        </Box>
    )
}

export default RightInformation