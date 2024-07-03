import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../../utils/price'
import addressApi from '../../../apis/addressApi'
import Address from '../../../components/Address/Address'
import ChangeAddress from './../ChangeAddress/ChangeAddress'
import UpdateAddress from '../../Account/EditAddress/FormAddress/UpdateAddress'
import GoToShop from '../../../components/GoToShop/GoToShop'
import Loading from '../../../components/Loading/Loading'
import ProductVouchers from '../../../components/ProductVouchers/ProductVouchers'
import ShopFeeShip from '../ShopFeeShip/ShopFeeShip'
import OrderItem from '../../../components/Product/OrderItem'

function LeftInformation({ address, setAddress, cartItems, feeShips, reRender, setRerender }) {
    const [changeAddress, setChangeAddress] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            addressApi.getAddresses()
                .then((response) => {
                    setAddresses(response)
                    if (!address) {
                        const defaultAddress = response.find(address => address?.is_default)
                        if (defaultAddress) { setAddress(defaultAddress) }
                        else { setAddress(response[0]) }
                    }
                    else {
                        const addressUpdated = response.find(addressResponse => addressResponse?.address_id == address?.address_id)
                        if (addressUpdated)
                            setAddress(addressUpdated)
                    }
                })
                .catch((error) => { console.error('Error fetching data:', error) })
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [changeAddress])

    return (
        <Box>
            <Box className='flex items-center mt-2 gap-2'>
                {address?.address_id && <ChangeAddress addresses={addresses} setAddress={setAddress} />}
                <Divider orientation='vertical' variant="middle" flexItem />
                <UpdateAddress rerender={changeAddress} setRerender={setChangeAddress} />
                <Divider orientation='vertical' variant="middle" flexItem />
                {address?.address_id && <UpdateAddress address={address} rerender={changeAddress} setRerender={setChangeAddress} />}
            </Box>
            <Box className='flex items-center mt-2'>
                <Address address={address} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='w-72'>
                                <Typography className='font-bold text-gray-600'>Tất cả ({Array.isArray(cartItems) && cartItems.length}) sản phẩm</Typography>
                            </TableCell>
                            <TableCell className='w-36'><Typography className='font-bold text-gray-600'>Thành tiền</Typography> </TableCell>
                        </TableRow>
                    </TableHead>
                </Table >
                {Array.isArray(cartItems) && cartItems.map((cartItem, index) => (
                    <Box key={index} className="mt-4">
                        <GoToShop shop_id={cartItem?.shop?.shop_id} shop_name={cartItem?.shop?.name} shop_image={cartItem?.shop?.image} />
                        <Table>
                            <TableBody>
                                {Array.isArray(cartItem?.shop_items) &&
                                    cartItem?.shop_items.map((shop_item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='w-72'>
                                                <OrderItem isCheckout={true} shop_item={shop_item} />
                                            </TableCell>
                                            <TableCell className='w-36'>
                                                <Typography fontWeight={'bold'} className='text-red-600'>
                                                    {formatCurrency(shop_item?.subtotal)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <Box className='flex flex-row gap-2 mb-1 items-center mt-1'>
                            <ProductVouchers shopVouchers={cartItem?.vouchers} isCheckout={true}
                                cart_item_id={cartItem?.cart_item_id} reRender={reRender} setReRender={setRerender} />
                            <ShopFeeShip feeShips={feeShips} shop_id={cartItem?.shop?.shop_id} />
                        </Box>
                    </Box>
                ))}
            </TableContainer>
            {loading && <Loading />}
        </Box>
    )
}

export default LeftInformation