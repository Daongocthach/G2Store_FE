import { Typography, Button, Box, Radio, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllCart } from '../../../redux/actions/cart'
import { formatCurrency } from '../../../utils/price'
import imgVNPAY from '../../../assets/img/imgVNPAY.png'
import imgVNPAY2 from '../../../assets/img/vnpay.png'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import orderApi from '../../../apis/orderApi'
import Loading from '../../../components/Loading/Loading'
import { IOSSwitch } from '../../../components/Switch/Switch'
import ghnApiV2 from '../../../apis/ghnApiV2'

function RightInformation({ cartItems, address, feeShips, setFeeShips }) {
    const triggerAlert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const point = useSelector(state => state.auth.point)
    const [is_point_spent, setIsPointSpent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentType, setPaymentType] = useState('COD')
    var totalProducts = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem?.shop_subtotal, 0)
    var totalFeeShip = feeShips.reduce((totalFeeShip, feeShip) => totalFeeShip + feeShip?.fee, 0)
    var totalFeeShipReduce = cartItems.reduce((totalFeeShipReduce, cartItem) => totalFeeShipReduce + cartItem?.shop_free_ship_reduce, 0)
    var totalShopVoucher = cartItems.reduce((totalShopVoucher, cartItem) => totalShopVoucher + cartItem?.shop_voucher_reduce, 0)
    var total = totalProducts + totalFeeShip - (is_point_spent ? point : 0)
    useEffect(() => {
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            let feeShipsTemp = []
            const fetchFeeShips = async () => {
                for (let cartItem of cartItems) {
                    try {
                        const response = await ghnApiV2.getFeeShip(address?.address_id, paymentType, cartItem?.cart_item_id)
                        const fee = response?.data?.total - cartItem?.shop_free_ship_reduce
                        feeShipsTemp.push({ shop_id: cartItem?.shop?.shop_id, fee })
                    } catch (error) {
                        console.log(error)
                    }
                }
                setFeeShips(feeShipsTemp)
            }
            fetchFeeShips()
        }
    }, [address])

    const convertDataToOrderFormat = (data) => {
        const address_id = address?.address_id
        const payment_type = paymentType
        const is_point_spent = false
        const orders = data.map(order => {
            return {
                items: order?.shop_items.map(item => {
                    return {
                        name: item?.name,
                        price: item?.price,
                        quantity: item?.quantity,
                        product_id: item?.product_id
                    }
                }),
                fee_ship: feeShips.find(feeShip => feeShip.shop_id === order?.shop?.shop_id)
            }
        })
        return { orders, address_id, payment_type, is_point_spent }
    }
    const handleClickOrder = async () => {
        if (address) {
            setLoading(true)
            const order = convertDataToOrderFormat(cartItems)
            orderApi.addOrder(order)
                .then((response) => {
                    triggerAlert('Đặt hàng thành công!', false, false)
                    dispatch(deleteAllCart())
                    if (paymentType === 'COD')
                        navigate('/thanks')
                    else if (response?.payment_url) {
                        location.assign(response?.payment_url)
                    }
                    else {
                        navigate('/order-fail')
                    }
                })
                .catch(() => {
                    triggerAlert('Thanh toán thất bại!', true, false)
                    navigate('/order-fail')
                })
                .finally(() => setLoading(false))
        } else {
            triggerAlert('Vui lòng chọn địa chỉ giao hàng!', false, true)
        }

    }
    return (
        <Box className='flex flex-col gap-3'>
            <Box className='flex items-center justify-between'>
                <Typography className='text-gray-600' fontSize={14}>Tiền hàng ({Array.isArray(cartItems) && cartItems.length}) </Typography>
                <Typography className='text-gray-600' fontSize={14}>{formatCurrency(totalProducts || 0)}</Typography>
            </Box>
            <Box className='flex items-center justify-between'>
                <Typography className='text-gray-600' fontSize={14}>Phí vận chuyển: </Typography>
                <Typography className='text-gray-600' fontSize={14}>{formatCurrency(totalFeeShip)}</Typography>
            </Box>
            <Box className='flex items-center justify-between'>
                <Typography className='text-gray-600' fontSize={14}>Giảm giá vận chuyển: </Typography>
                <Typography className='text-gray-600' fontSize={14}>{formatCurrency(totalFeeShipReduce)}</Typography>
            </Box>
            <Box className='flex items-center justify-between'>
                <Typography className='text-gray-600' fontSize={14}>Giảm giá của shop: </Typography>
                <Typography className='text-gray-600' fontSize={14}>{formatCurrency(totalShopVoucher)}</Typography>
            </Box>
            <Box className='flex items-center justify-between border-b border-gray-500 pb-1' >
                <Box className='flex flex-row items-center gap-2' >
                    <Typography className='text-gray-600' fontSize={14}>Sử dụng điểm tích lũy (-{formatCurrency(point || 0)})</Typography>
                    <IOSSwitch checked={is_point_spent} onChange={() => setIsPointSpent(!is_point_spent)} color="error" />
                </Box>
                <Typography className='text-gray-600' fontSize={13}>-{formatCurrency(is_point_spent ? (point || 0) : 0)}</Typography>
            </Box>
            <Box className="flex items-center justify-between gap-2 mt-2">
                <Typography fontSize={17} className="text-gray-700">Tổng cộng:</Typography>
                <Typography fontSize={17} fontWeight={'bold'} className="text-red-600">{formatCurrency(total)}</Typography>
            </Box>
            <Typography fontSize={13} className="text-gray-700 text-end ">Đã bao gồm vat (nếu có)</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box className='flex items-center justify-start gap-1 mt-1'>
                <Radio className='h-[30px] w-[30px]' checked={paymentType == 'COD'} onChange={() => setPaymentType('COD')} />
                <Typography sx={{ color: '#4F4F4F' }} variant='subtitle1'>Thanh toán khi nhận hàng</Typography>
            </Box>
            <Box className='flex items-center justify-start gap-1 mt-1 mb-1'>
                <Radio className='h-[30px] w-[30px]' checked={paymentType == 'VNPAY'} onChange={() => setPaymentType('VNPAY')} />
                <Typography className='text-gray-600' fontSize={14}>Thanh toán qua VNPAY</Typography>
                <img src={imgVNPAY} alt='thanh toan Vnpay' style={{ height: 50, width: 50 }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Button size='large' fullWidth color='error' variant='contained' sx={{ fontWeight: 'bold' }} onClick={handleClickOrder}> Đặt hàng </Button>
            <img src={imgVNPAY2} alt='sale' className='h-auto w-full rounded-lg' />
            {loading && <Loading />}
        </Box>
    )
}

export default RightInformation