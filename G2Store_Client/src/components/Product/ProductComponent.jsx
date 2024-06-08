import { Box, Typography, ToggleButton } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DeleteItem from '../../pages/Cart/DeleteItem/DeleteItem'
import { formatCurrency } from '../../utils/price'
import cartItemV2Api from '../../apis/cartItemApiV2'
import productApi from '../../apis/productApi'
import ProductVouchers from '../ProductVouchers/ProductVouchers'

{/**Component Product for Cart, Checkout */ }
function ProductComponent({ product, reRender, setReRender, setIsSoldOut, isCart, isCheckout }) {
    const navigate = useNavigate()
    const [changeQuantity, setChangeQuantity] = useState(product?.quantity)
    const [soldOut, setSoldOut] = useState(false)
    const handleIncrease = () => {
        const newQuantity = changeQuantity + 1
        setChangeQuantity(newQuantity)
        updateQuantity(newQuantity)
    }

    const handleDecrease = () => {
        if (changeQuantity > 1) {
            const newQuantity = changeQuantity - 1
            setChangeQuantity(newQuantity)
            updateQuantity(newQuantity)
        }
    }
    const updateQuantity = (newQuantity) => {
        cartItemV2Api.updateQuantity(product?.shop_item_id, newQuantity)
            .then(() => setReRender(!reRender))
            .catch(err => { console.log(err) })
    }
    useEffect(() => {
        productApi.getProduct(product?.product_id)
            .then((response) => {
                if (response?.stock_quantity < 1 && isCart) {
                    setSoldOut(true)
                    setIsSoldOut(true)
                }
                else {
                    setSoldOut(false)
                }
            })
    }, [])

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, cursor: 'pointer' }}>
                <img src={product?.image} alt='omachi' onClick={() => { navigate('/product-detail', { state: product?.product_id }) }}
                    style={{ objectFit: 'cover', height: 70, width: 70, borderRadius: 5, opacity: (soldOut && isCart) ? 0.5 : 1 }} />
                <Box ml={2} minWidth={'350px'}>
                    <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} maxWidth={'300px'}>{product?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant='body2' color={isCart ? '#cb1c22' : '#444444'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                        {(isCheckout) && <Typography variant='body2' color={'#444444'} >x{product?.quantity}</Typography>}
                    </Box>
                    {isCheckout && <Typography variant='subtitle1' color={'#cb1c22'} fontWeight={550} >{formatCurrency(product?.subtotal)}</Typography>}
                    {soldOut && isCart && <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'}>Hết hàng</Typography>}
                    {!soldOut && isCart && <Box sx={{ mt: 0.5 }}>
                        <ToggleButton value="left" key="left" sx={{ width: 30, height: 27, borderColor: 'white' }} size='small' onClick={handleDecrease}>
                            <Remove sx={{ fontSize: 15 }} />
                        </ToggleButton>
                        <input value={changeQuantity} type='number' onFocus={(e) => e.target.select()} onChange={(e) => setChangeQuantity(parseInt(e.target.value), 10)}
                            style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 50, height: 27, textAlign: 'center' }} />
                        <ToggleButton value="right" key="right" sx={{ width: 30, height: 27, borderColor: 'white' }} size='small' onClick={handleIncrease}>
                            <Add sx={{ fontSize: 15 }} />
                        </ToggleButton>
                    </Box>}
                </Box>
                {isCart && <Box >
                    <DeleteItem shopItemId={product?.shop_item_id} reRender={reRender} setReRender={setReRender} />
                </Box>}
            </Box>
            <ProductVouchers product={product} isCart={true} reRender={reRender} setReRender={setReRender} />
        </Box>
    )
}

export default ProductComponent