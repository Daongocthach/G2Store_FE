import { Box, Typography, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DeleteItem from '../DeleteItem/DeleteItem'
import { formatCurrency } from '../../../utils/price'
import cartItemApi from '../../../apis/cartItemApi'
import { updateQuantity } from '../../../redux/actions/cart'

function Product({ product, quantity, customerId }) {
    const dispatch = useDispatch()
    const [changeQuantity, setChangeQuantity] = useState(quantity)
    useEffect(() => {
        const cartItem = {
            'id': {
                'customerId': customerId,
                'productId': product.id
            },
            'quantity': changeQuantity
        }

        cartItemApi.updateCartItem(cartItem)
            .then(response => [
                dispatch(updateQuantity(response.data))
            ])
            .catch(err => {
                console.log(err)
            })
    }, [changeQuantity])
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <img src={product?.image} alt='omachi' style={{ objectFit: 'cover', height: '150px', width: '150px', borderRadius: 5 }} />
            <Box ml={2} minWidth={'300px'}>
                <Typography variant='h6' fontWeight={'bold'} maxWidth={'280px'}>{product?.name}</Typography>
                <Typography variant='h6' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    <Typography variant='body1' fontWeight={'bold'} color={'gray'} >Số lượng</Typography>
                    <TextField type='number' size='small' InputProps={{ inputProps: { min: 1, max: 50 } }}
                        value={changeQuantity} onChange={(e) => setChangeQuantity(parseInt(e.target.value), 10)} />
                </Box>
            </Box>
            <Box >
                <DeleteItem customerId={customerId} productId={product?.id} />
            </Box>
        </Box>
    )
}

export default Product