import { useState } from 'react'
import { Rating, Box, Typography, Button, IconButton, ToggleButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AddShoppingCart, Remove, Add } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import { addToCart } from '../../../redux/actions/cart'
import ProductVouchers from '../../../components/ProductVouchers/ProductVouchers'
import GoToShop from '../../../components/GoToShop/GoToShop'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'

function RightInformation({ product, reviews }) {
    const triggerAlert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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
    const setChangeQuantity = (quantity) => {
        if (quantity && quantity != 0)
            setQuantity(quantity)
        else {
            setQuantity(1)
        }
    }
    function handleClickAddToCart() {
        if (!user?.keep_login) {
            triggerAlert('Bạn cần đăng nhập để thực hiện chức năng này!', false, true)
            navigate('/login')
        } else if (!product?.product_id) {
            triggerAlert('Vui lòng chờ tải sản phẩm!', false, true)
        }
        else {
            setLoading(true)
            cartItemV2Api.addToCart({ quantity: quantity || 1, product_id: product?.product_id })
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
                .finally(() => { setLoading(false) })
        }
    }
    return (
        <Box className="flex flex-col gap-3">
            <Typography variant={'h5'} className={'text-red-600'} fontWeight={'bold'}>
                {formatCurrency(product?.price)} {product?.stock_quantity < 1 && ' - Hết hàng'}
            </Typography>
            <Box className="flex items-center gap-1">
                <Rating name="size-medium" size="large" value={reviews?.avg_rate || 0} precision={0.1} readOnly />
                <Typography variant="subtitle2" className="text-blue-600">
                    {(reviews?.total_rate_count || 0) + ' Đánh giá'}
                </Typography>
            </Box>
            <Box className="flex items-center gap-1">
                <Typography variant="subtitle1" className="min-w-20 text-gray-700">
                    Gian hàng:
                </Typography>
                <GoToShop shop_id={product?.shop?.shop_id} shop_name={product?.shop?.name} shop_image={product?.shop?.image} />
            </Box>
            <Box className="flex items-center gap-1">
                <Typography variant="subtitle1" className="min-w-20 text-gray-700">
                    Danh mục:
                </Typography>
                <IconButton className="bg-transparent hover:bg-transparent gap-2"
                    onClick={() => navigate('/genre-detail', { state: { category: product?.category } })}>
                    <Typography variant="subtitle2" className="text-gray-700">
                        {product?.category?.name}
                    </Typography>
                </IconButton>
            </Box>
            <Box className="flex items-center gap-1">
                <Typography variant="subtitle1" className="min-w-24 text-gray-700">
                    Còn lại:
                </Typography>
                <Typography variant="subtitle1" className="text-gray-700">
                    {product?.stock_quantity} sản phẩm
                </Typography>
            </Box>
            <Box className="flex items-center gap-1">
                <Typography variant="subtitle1" className="min-w-24 text-gray-700">
                    Đã bán:
                </Typography>
                <Typography variant="subtitle1" className="text-gray-700">
                    {product?.sold_quantity} sản phẩm
                </Typography>
            </Box>
            < Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle1' color={'#444444'}>Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    <ToggleButton value="left" key="left" sx={{ width: 40, height: 30, borderColor: 'white' }} onClick={handleDecrease}>
                        <Remove sx={{ fontSize: 15 }} />
                    </ToggleButton>
                    <input value={quantity} type='number' min={0} max={1000} onFocus={(e) => e.target.select()}
                        onChange={(e) => setChangeQuantity(parseInt(e.target.value))}
                        style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 40, height: 30, textAlign: 'center' }} />
                    <ToggleButton value="right" key="right" sx={{ width: 40, height: 30, borderColor: 'white' }} onClick={handleIncrease}>
                        <Add sx={{ fontSize: 15 }} />
                    </ToggleButton>
                </Box>
            </Box >
            {/* Promotions*/}
            <ProductVouchers product={product} />
            {/* Quantity */}
            <Box className="flex items-center gap-1">
                <Button variant="contained" fullWidth color="error" disabled={product?.stock_quantity < 1}
                    onClick={handleClickAddToCart}>
                    Mua Ngay
                </Button>
                <Button variant="contained" color="info" fullWidth disabled={product?.stock_quantity < 1} startIcon={<AddShoppingCart />}
                    onClick={handleClickAddToCart} >
                    Thêm vào giỏ
                </Button>
            </Box>
            {loading && <Loading />}
        </Box>
    )
}

export default RightInformation

