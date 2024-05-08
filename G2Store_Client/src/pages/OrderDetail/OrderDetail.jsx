import { Box, Typography, LinearProgress, Container, Breadcrumbs, Link, Divider, Input, Button } from '@mui/material'
import { LocalShipping, FiberManualRecord, Storefront, NavigateNext, Receipt } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { covertStringToDate } from '../../utils/date'
import OrderItem from '../Account/Order/OrderItem/OrderItem'
import { formatCurrency } from '../../utils/price'
import { mockData } from '../../apis/mockdata'

function OrderDetail() {
  const navigate = useNavigate()
  const location = useLocation()
    const order = location.state

    const [rerender, setRerender] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <Box sx={{ minHeight: '100%', paddingX: { xs: 0, sm: 10, md: 20, lg: 50 } }}>
            <Container fixed>
                <Breadcrumbs sx={{ mt: 2 }}>
                    <Link underline="hover" color="inherit" href="/" variant='subtitle2'>
                        Trang chủ
                    </Link>
                    <Link underline="hover" color="inherit" href="/profile" variant='subtitle2' >
                        Tài khoản
                    </Link>
                    <Link underline="hover" color="inherit" variant='subtitle2' >
                        Đơn hàng
                    </Link>
                    <Link underline="hover" color="inherit" variant='subtitle2' >
                        Chi tiết đơn hàng
                    </Link>
                </Breadcrumbs>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={useStyles.flexBox}>
                        <Box sx={useStyles.flexBox}>
                            <FiberManualRecord sx={{
                                fontSize: 15, color: order?.order_status == 'SUCCESS' ? 'green' :
                                    order?.order_status == 'ON_DELIVERY' ? 'orange' :
                                        order?.order_status == 'CONFIRMED' ? 'gold' : order?.order_status == 'PENDING' ? 'blue' : '#cd3333'
                            }} />
                            <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold' }}>Đơn hàng</Typography>
                            <Typography variant='subtitle2' color={'#444444'}>{covertStringToDate(order?.created_date, 'dd/MM/yyyy', '/')}</Typography>
                            <Typography variant='subtitle2' color={'#444444'}>#{order?.order_id}</Typography>
                        </Box>
                        <LocalShipping sx={{ color: '#444444' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h6' sx={{ color: '#444444' }}>Thông tin khách hàng</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, mb: 1 }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và tên</Typography>
                            <Input readOnly sx={useStyles.input} value={order?.address?.receiver_name} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, mb: 1 }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Số điện thoại</Typography>
                            <Input readOnly sx={useStyles.input} value={order?.address?.receiver_phone_no} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, mb: 1 }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Địa chỉ giao hàng</Typography>
                            <Input readOnly sx={useStyles.input} value={order?.address?.province ? (order?.address?.order_receive_address + ', ' + order?.address?.ward + ', ' + order?.address?.district + ', ' + order?.address?.province) : ''} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, mb: 1 }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Thanh toán</Typography>
                            <Input readOnly sx={useStyles.input} value={order?.payment_type} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h6' sx={{ color: '#444444' }}>Thông tin đơn hàng</Typography>
                        <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                            onClick={() => { navigate('/shop-page', { state: order?.shop_id }) }}>
                            <Storefront sx={{ fontSize: 25, color: '#444444' }} />
                            <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{order?.shop_name}</Typography>
                            <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
                        </Button>
                        <Box>
                            {order?.items.map((orderItem, index) =>
                                <OrderItem key={index} orderItem={orderItem} />)}
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h6' sx={{ color: '#444444' }}>Khuyến mãi sử dụng</Typography>
                        {mockData.promotions.map((promotion, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 1, gap: 2 }}>
                                <Receipt sx={{ fontSize: 25, color: '#444444' }} />
                                <Box >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant='subtitle2' color={'#444444'} >{promotion?.name}: </Typography>
                                        <Typography color={'#cb1c22'} variant='subtitle1' fontWeight={'bold'} >{promotion?.discount_type == 'PERCENTAGE' ? promotion?.reduce_percent + '%' : formatCurrency(promotion?.reduce_price)}</Typography>
                                    </Box>
                                    <Typography color={'#444444'} variant='subtitle2' sx={{}}>Đơn tối thiểu: {formatCurrency(promotion?.min_spend)}</Typography>
                                    <Typography >{promotion?.start_date} - {promotion?.end_date}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <Typography variant='h6' sx={{ color: '#444444' }}>Giá trị đơn hàng</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Tổng tiền:</Typography>
                            <Typography color={'#cd3333'} variant='h6' fontWeight={'bold'}>{formatCurrency(order?.total)}</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Phí vận chuyển:</Typography>
                            <Typography variant='subtitle1' color={'#2e7d32'} >{formatCurrency(order?.fee_ship)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá shop:</Typography>
                            <Typography variant='subtitle1' >{formatCurrency(order?.shop_voucher_price_reduce)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá toàn sàn:</Typography>
                            <Typography variant='subtitle1' >{formatCurrency(order?.g2_voucher_price_reduce)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá bằng điểm:</Typography>
                            <Typography variant='subtitle1' >{formatCurrency(order?.point_spent)}</Typography>
                        </Box>
                    </Box>
                    {loading && <LinearProgress color="secondary" sx={{ mt: 2 }} />}
                </Box>
            </Container>
        </Box>
    )
}

export default OrderDetail

const useStyles = {
    inputTitle: {
        minWidth: 180, color: '#444444'
    },
    input: {
        minWidth: { xs: 200, md: 500 },
        fontSize: 15,
        bgcolor: '#e8f0fe'
    },
    button: {
        color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2
    },
    flexBox: {
        display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between', flexWrap: 'wrap'
    }
}