import { Box, Typography, ToggleButton } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DeleteItem from '../DeleteItem/DeleteItem'
import { formatCurrency } from '../../../utils/price'
import cartItemApi from '../../../apis/cartItemApi'

function Product({ product, reRender, setReRender }) {
    const navigate = useNavigate()
    const [changeQuantity, setChangeQuantity] = useState(product?.quantity)
    const handleIncrease = () => {
        setChangeQuantity(changeQuantity + 1)
    }

    const handleDecrease = () => {
        if (changeQuantity > 1) {
            setChangeQuantity(changeQuantity - 1)
        }
    }
    useEffect(() => {
        cartItemApi.updateQuantity({ quantity: changeQuantity, product_id: product?.product_id })
            .then(() => setReRender(!reRender))
            .catch(err => { console.log(err) })
    }, [changeQuantity])
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}
            onClick={() => { () => { navigate('/product-detail', { state: product }) } }}>
            <img src={product?.images} alt='omachi' style={{ objectFit: 'cover', height: '100px', width: '100px', borderRadius: 5 }} />
            <Box ml={2} minWidth={'300px'}>
                <Typography variant='h6' fontWeight={'bold'} color={'#444444'} maxWidth={'280px'}>{product?.name}</Typography>
                <Typography variant='h6' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                <ToggleButton value="left" key="left" sx={{ width: 30, height: 30 }} size='small' onClick={handleDecrease}>
                    <Remove sx={{ fontSize: 15 }}/>
                </ToggleButton>
                <input value={changeQuantity} onFocus={(e) => e.target.select()} onChange={(e) => setChangeQuantity(parseInt(e.target.value), 10)}
                    style={{ border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2, width: 50, height: 30, textAlign: 'center' }} />
                <ToggleButton value="right" key="right" sx={{ width: 30, height: 30 }} size='small' onClick={handleIncrease}>
                    <Add sx={{ fontSize: 15 }}/>
                </ToggleButton>
            </Box>
            <Box >
                <DeleteItem productId={product?.product_id} reRender={reRender} setReRender={setReRender} />
            </Box>
        </Box>
    )
}

export default Product