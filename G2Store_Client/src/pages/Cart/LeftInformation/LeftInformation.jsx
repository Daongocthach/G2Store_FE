import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, ToggleButton, Typography } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteItem from './../DeleteItem/DeleteItem'
import GoToShop from '../../../components/GoToShop/GoToShop'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import { formatCurrency } from '../../../utils/price'
import OrderItem from '../../../components/Product/OrderItem'

function LeftInformation({ cartItems, reRender, setReRender }) {
    const navigate = useNavigate()
    const cartQuantity = useSelector(state => state.cart.cartItems)
    const handleIncrease = (shop_item_id, quantity) => {
        updateQuantity(shop_item_id, quantity + 1)
    }
    const handleDecrease = (shop_item_id, quantity) => {
        if (quantity > 1) {
            updateQuantity(shop_item_id, quantity - 1)
        }
    }
    const setChangeQuantity = (shop_item_id, quantity) => {
        if (quantity && quantity != 0)
            updateQuantity(shop_item_id, quantity)
        else {
            updateQuantity(shop_item_id, 1)
        }
    }
    const updateQuantity = (shop_item_id, quantity) => {
        cartItemV2Api.updateQuantity(shop_item_id, quantity)
            .then(() => setReRender(!reRender))
            .catch(err => { console.log(err) })
    }
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='w-72'>
                                <Typography className='font-bold text-gray-600'>Tất cả ({cartQuantity && cartQuantity.length}) sản phẩm</Typography>
                            </TableCell>
                            <TableCell className='w-36'><Typography className='font-bold text-gray-600 text ml-2'>Số lượng</Typography> </TableCell>
                            <TableCell className='w-36'><Typography className='font-bold text-gray-600'>Thành tiền</Typography> </TableCell>
                            <TableCell className='w-5'>
                                <DeleteItem isDeleteAll={true} reRender={reRender} setReRender={setReRender} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table >
                {cartItems.map((cartItem, index) => (
                    <Box key={index} className="mt-4">
                        <Box className="flex items-center">
                            <GoToShop shop_id={cartItem?.shop?.shop_id} shop_name={cartItem?.shop?.name} shop_image={cartItem?.shop?.image} />
                            <DeleteItem cartItemId={cartItem?.cart_item_id} reRender={reRender} setReRender={setReRender} />
                        </Box>
                        <Table>
                            <TableBody>
                                {Array.isArray(cartItem?.shop_items) &&
                                    cartItem?.shop_items.map((shop_item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='w-72'>
                                                <OrderItem shop_item={shop_item} />
                                            </TableCell>
                                            <TableCell className='w-36'>
                                                <ToggleButton value="left" key="left" size='small'
                                                    sx={{ width: 30, height: 27, borderColor: 'white' }}
                                                    onClick={() => handleDecrease(shop_item?.shop_item_id, shop_item?.quantity)}>
                                                    <Remove sx={{ fontSize: 15 }} />
                                                </ToggleButton>
                                                <input value={shop_item?.quantity} type='number'
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => setChangeQuantity(shop_item?.shop_item_id, parseInt(e.target.value))}
                                                    style={{
                                                        border: '0.5px solid', borderColor: '#D3D3D3', borderRadius: 2,
                                                        width: 50, height: 27, textAlign: 'center'
                                                    }} />
                                                <ToggleButton value="right" key="right" size='small'
                                                    sx={{ width: 30, height: 27, borderColor: 'white' }}
                                                    onClick={() => handleIncrease(shop_item?.shop_item_id, shop_item?.quantity)}>
                                                    <Add sx={{ fontSize: 15 }} />
                                                </ToggleButton>
                                            </TableCell>
                                            <TableCell className='w-36'>
                                                <Typography fontWeight={'bold'} className='text-red-600'>
                                                    {formatCurrency(shop_item?.subtotal)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className='w-5'><DeleteItem shopItemId={shop_item?.shop_item_id} reRender={reRender} setReRender={setReRender} /></TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Box>
                ))}
            </TableContainer>
        </Box>
    )
}

export default LeftInformation