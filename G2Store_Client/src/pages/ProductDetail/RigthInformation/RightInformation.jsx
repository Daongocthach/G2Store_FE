import { useState } from 'react'
import { Rating, Box, Typography, Button, IconButton, ToggleButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavigateNext, AddShoppingCart, Remove, Add } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import { addToCart } from '../../../redux/actions/cart'
import ProductVouchers from '../../../components/ProductVouchers/ProductVouchers'
import GoToShop from '../../../components/GoToShop/GoToShop'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

function RightInformation({ product, reviews }) {
    const triggerAlert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const user = useSelector(state => state.auth)
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
            triggerAlert('Bạn cần đăng nhập để thực hiện chức năng này!', true, false)
            navigate('/login')
        }
        else {
            cartItemV2Api.addToCart({ quantity: 1, product_id: product?.product_id })
                .then((response) => {
                    if (response?.quantity == 1) {
                        dispatch(addToCart(response))
                    }
                    triggerAlert('Thêm sản phẩm vào giỏ thành công!', false, false)
                })
                .catch((error) => {
                    console.log(error)
                    triggerAlert('Thêm sản phẩm vào giỏ thất bại!', true, false)
                })
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
                {product?.special_price && <Typography variant='h5' sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
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
                <Typography variant='subtitle1' minWidth={80} color={'#444444'}>Gian hàng:</Typography>
                <GoToShop shop_id={product?.shop?.shop_id} shop_name={product?.shop?.name} shop_image={product?.shop?.image} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={80} color={'#444444'} >Danh mục:</Typography>
                <IconButton sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
                    onClick={() => { navigate('/genre-detail', { state: { category: product?.category } }) }}>
                    <Typography variant='subtitle2' color={'#444444'}>{product?.category?.name}</Typography>
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={90} color={'#444444'}>Còn lại: </Typography>
                <Typography variant='subtitle1' color={'#444444'}>{product?.stock_quantity} sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' minWidth={90} color={'#444444'}>Đã bán: </Typography>
                <Typography variant='subtitle1' color={'#444444'}>{product?.sold_quantity} sản phẩm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' color={'#444444'}>Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    <ToggleButton value="left" key="left" sx={{ width: 40, height: 30 }} onClick={handleDecrease}>
                        <Remove sx={{ fontSize: 15 }} />
                    </ToggleButton>
                    <input value={quantity} type='number' min={0} max={1000} onFocus={(e) => e.target.select()} onChange={(e) => setQuantity(parseInt(e.target.value), 10)}
                        style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 40, height: 30, textAlign: 'center' }} />
                    <ToggleButton value="right" key="right" sx={{ width: 40, height: 30 }} onClick={handleIncrease}>
                        <Add sx={{ fontSize: 15 }} />
                    </ToggleButton>
                </Box>
            </Box>
            {/* Promotions*/}
            <ProductVouchers product={product} />
            {/* Quantity */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button variant='contained' fullWidth color='error' disabled={product?.stock_quantity < 1} onClick={() => { handleClickAddToCart() }}>Mua Ngay</Button>
                <Button variant='contained' color='info' fullWidth disabled={product?.stock_quantity < 1} startIcon={<AddShoppingCart />} onClick={handleClickAddToCart}>Thêm vào giỏ</Button>
            </Box>
        </Box>
    )
}

export default RightInformation