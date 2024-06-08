import { useState } from 'react'
import { Rating, Box, Typography, Button, ToggleButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { NavigateNext, AddShoppingCart, Remove, Add } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import { addToCart } from '../../../redux/actions/cart'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import ProductVouchers from '../../../components/ProductVouchers/ProductVouchers'
import Shop from '../../../components/Shop/Shop'

function RightInformation({ product, reviews }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const user = useSelector(state => state.auth)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    function handleClickAddToCart() {
        if (!user?.keep_login) {
            toast.error('Bạn cần đăng nhập để thực hiện chức năng này!', { autoClose: 2000 })
            navigate('/login')
        }
        else {
            cartItemV2Api.addToCart({ quantity: 1, product_id: product?.product_id })
                .then((response) => {
                    if (response?.quantity == 1) {
                        dispatch(addToCart(response))
                    }
                    setShowAlert(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowAlertFail(true)
                })
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
                {product?.special_price && <Typography variant='h5' fontWeight={'bold'} sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
                <Typography variant={product?.special_price ? 'h6' : 'h5'} fontWeight={product?.special_price ? 500 : 600}
                    sx={{ color: product?.special_price ? ' #444444' : '#cb1c22', textDecoration: product?.special_price ? 'line-through' : 'none' }}>
                    {formatCurrency(product?.price)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating name="size-medium" size='large' value={reviews?.avg_rate || 0} precision={0.1} readOnly />
                <Typography variant='subtitle2' color={'#016afa'}>{(reviews?.total_rate_count || 0) + ' Đánh giá'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={80} fontWeight={'bold'} color={'#444444'}>Gian hàng:</Typography>
                <Shop shop_id={product?.shop?.shop_id} shop_name={product?.shop?.name} shop_image={product?.shop?.image} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={80} fontWeight={'bold'} color={'#444444'} >Danh mục:</Typography>
                <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                    onClick={() => { navigate('/genre-detail', { state: { category: product?.category } }) }}>
                    <Typography variant='subtitle1' color={'#444444'}>{product?.category?.name}</Typography>
                    <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={90} fontWeight={'bold'} color={'#444444'}>Còn lại: </Typography>
                <Typography variant='subtitle1' color={'#444444'}>{product?.stock_quantity} sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={90} fontWeight={'bold'} color={'#444444'}>Đã bán: </Typography>
                <Typography variant='subtitle1' color={'#444444'}>{product?.sold_quantity} sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'}>Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    <ToggleButton value="left" key="left" sx={{ width: 50, height: 40 }} onClick={handleDecrease}>
                        <Remove sx={{ fontSize: 15 }} />
                    </ToggleButton>
                    <input value={quantity} type='number' min={0} max={1000} onFocus={(e) => e.target.select()} onChange={(e) => setQuantity(parseInt(e.target.value), 10)}
                        style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 60, height: 40, textAlign: 'center' }} />
                    <ToggleButton value="right" key="right" sx={{ width: 50, height: 40 }} onClick={handleIncrease}>
                        <Add sx={{ fontSize: 15 }} />
                    </ToggleButton>
                </Box>
            </Box>
            {/* Promotions*/}
            <ProductVouchers productId={product?.product_id} />
            {/* Quantity */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button variant='contained' fullWidth color='error' disabled={product?.stock_quantity < 1} onClick={() => { handleClickAddToCart() }}>Mua Ngay</Button>
                <Button variant='contained' color='info' fullWidth disabled={product?.stock_quantity < 1} startIcon={<AddShoppingCart />} onClick={handleClickAddToCart}>Thêm vào giỏ</Button>
            </Box>
            <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Thêm sản phẩm vào giỏ thành công'} />
            <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Thêm sản phẩm vào giỏ thất bại'} isFail={true} />
        </Box>
    )
}

export default RightInformation