import { Box, Typography, ToggleButton } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DeleteItem from '../DeleteItem/DeleteItem'
import { formatCurrency } from '../../../utils/price'
import cartItemApi from '../../../apis/cartItemApi'
import productApi from '../../../apis/productApi'

function Product({ product, reRender, setReRender, setIsSoldOut }) {
    const navigate = useNavigate()
    const [changeQuantity, setChangeQuantity] = useState(product?.quantity)
    const [productCart, setProductCart] = useState()
    const [soldOut, setSoldOut] = useState(false)
    const handleIncrease = () => {
        setChangeQuantity(changeQuantity + 1)
    }

    const handleDecrease = () => {
        if (changeQuantity > 1) {
            setChangeQuantity(changeQuantity - 1)
        }
    }
    useEffect(() => {
        productApi.getProduct(product?.product_id)
            .then((response) => {
                setProductCart(response)
                if (response?.stock_quantity < 1) {
                    setSoldOut(true)
                    setIsSoldOut(true)
                }
            })
    }, [])
    useEffect(() => {
        cartItemApi.updateQuantity({ quantity: changeQuantity, product_id: product?.product_id })
            .then(() => setReRender(!reRender))
            .catch(err => { console.log(err) })
    }, [changeQuantity])
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, cursor: 'pointer' }}>
            <img src={product?.images} alt='omachi' onClick={() => { navigate('/product-detail', { state: productCart }) }}
                style={{ objectFit: 'cover', height: 90, width: 90, borderRadius: 5, opacity: soldOut ? 0.5 : 1 }} />
            <Box ml={2} minWidth={'300px'}>
                <Typography variant='h6' color={'#444444'} maxWidth={'280px'}>{product?.name}</Typography>
                <Typography variant='subtitle1' color={'#cb1c22'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                {soldOut && <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'}>Hết hàng</Typography>}
                {!soldOut && <Box>
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
            <Box >
                <DeleteItem productId={product?.product_id} reRender={reRender} setReRender={setReRender} />
            </Box>
        </Box>
    )
}

export default Product