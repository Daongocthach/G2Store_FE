import { Box, Typography, Divider, Button } from '@mui/material'
import { Storefront, LocalShipping } from '@mui/icons-material'
import { format } from 'date-fns'
import { formatCurrency } from '../../../utils/price'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import HtmlTooltip from '../../HtmlTooltip/HtmlTooltip'

function Voucher({ voucher, isSelected, cart_item_id, reRender, setReRender, handleClose }) {
    const handleClickVoucher = () => {
        cartItemV2Api.applyCartVoucher(cart_item_id, voucher?.id)
            .then(() => {
                setReRender(!reRender)
                handleClose()
            })
            .catch(error => console.log(error))
    }
    return (
        <Box className={`flex flex-row items-center p-2 gap-6 ${isSelected && 'bg-green-100'}`}>
            <Box className='flex flex-col items-center gap-1'>
                {voucher?.voucher_type === 'SHOP_VOUCHER' ?
                    <Storefront className='text-blue-600' sx={{ fontSize: 30 }} />
                    :
                    <LocalShipping className='text-green-600' sx={{ fontSize: 30 }} />}

            </Box>
            <Divider orientation='vertical' variant="middle" flexItem />
            <Box className='flex flex-col gap-4' >
                <Box className='flex flex-col gap-1'>
                    <Typography variant='subtitle2'
                        className={voucher?.voucher_type === 'SHOP_VOUCHER' ? 'text-gray-700' : 'text-green-600'} >
                        {voucher?.name}
                    </Typography>
                    <Typography className='text-gray-600' variant='body2'>
                        Giảm {voucher?.discount_type == 'PERCENTAGE' ? voucher?.reduce_percent +
                            '%' : formatCurrency(voucher?.reduce_price)}
                    </Typography>
                    <Typography variant='body2' className='text-gray-600'>Cho đơn hàng từ {formatCurrency(voucher?.min_spend)}</Typography>
                </Box>
                <Typography className='text-gray-600' variant='caption'>
                    HSD: {format(new Date(voucher?.end_date), 'yyyy/MM/dd')}
                </Typography>
            </Box>
            <Box className='flex flex-col gap-5 justify-end items-end ml-5' >
                <HtmlTooltip voucher={voucher} />
                {cart_item_id && (isSelected ?
                    <Button size='small' variant='contained' color='warning' onClick={handleClickVoucher}>
                        Bỏ chọn
                    </Button> :
                    <Button size='small' variant='contained' onClick={handleClickVoucher}>Áp dụng</Button>)}
            </Box>
        </Box>
    )
}

export default Voucher
