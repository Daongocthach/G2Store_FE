import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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

function LeftInformation({ cartItems, paymentType, totalFeeShip, setTotalFeeShip }) {
    const navigate = useNavigate()
    const [reRender, setReRender] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            addressApi.getAddresses()
                .then((response) => {
                    setAddresses(response)
                    if (!address) {
                        const defaultAddress = response.find(address => address?.is_default)
                        if (defaultAddress) {
                            setAddress(defaultAddress)
                        }
                        else {
                            setAddress(response[0])
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                })
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [reRender])
    return (
        <Box>
            <Box className='flex items-center mt-2 gap-2'>
                <ChangeAddress addresses={addresses} setAddress={setAddress} reRender={reRender} setReRender={setReRender} />
                <Divider orientation='vertical' variant="middle" flexItem />
                <UpdateAddress address={address} rerender={reRender} setRerender={setReRender} />
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
                                                <Box className='flex flex-row gap-2'>
                                                    <img src={shop_item?.image} alt='omachi'
                                                        onClick={() => { navigate('/product-detail', { state: shop_item?.product_id }) }}
                                                        className="object-cover h-20 w-20 rounded-md cursor-pointer"
                                                    />
                                                    <Box>
                                                        <Typography fontSize={14} className="text-gray-700 w-36 line-clamp-2">
                                                            {shop_item?.name}
                                                        </Typography>
                                                        <Typography fontSize={13} className='text-gray-600'>{formatCurrency(shop_item?.price)}</Typography>
                                                        <Typography fontSize={13} className='text-gray-600'>x{shop_item?.quantity}</Typography>
                                                    </Box>
                                                </Box>
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
                            <ProductVouchers shopVouchers={cartItem?.vouchers} isCheckout={true} cart_item_id={cartItem?.cart_item_id} />
                            <ShopFeeShip address_id={address?.address_id} paymentType={paymentType}
                                cartItem={cartItem} totalFeeShip={totalFeeShip} setTotalFeeShip={setTotalFeeShip} />
                        </Box>
                    </Box>
                ))}
            </TableContainer>
            {loading && <Loading />}
        </Box>
    )
}

export default LeftInformation