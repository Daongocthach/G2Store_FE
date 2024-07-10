import { useState } from 'react'
import { Box, Typography, Popover, Divider, Chip } from '@mui/material'
import { KeyboardArrowDown, Close, Receipt } from '@mui/icons-material'
import voucherApi from '../../apis/voucherApi'
import Voucher from './Voucher/Voucher'
import EmptyData from '../EmptyData/EmptyData'

{/**Component Use for ProductDetail, Checkout */ }
function ProductVouchers({ product, shopVouchers, cart_item_id, reRender, setReRender }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [vouchers, setVouchers] = useState([])
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    if (product?.product_id) {
      voucherApi.getProductVouchers(product?.product_id)
        .then((response) => setVouchers(response))
        .catch((error) => console.log(error))
    }
    else {
      setVouchers(shopVouchers)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box >
      {product?.product_id ?
        <Box className='flex flex-row items-center cursor-pointer gap-2' onClick={handleClick}>
          <Receipt sx={{ color: '#444444' }} />
          <Typography variant='subtitle1' >Xem các mã khuyến mãi</Typography>
          <KeyboardArrowDown sx={{ fontSize: 20 }} />
        </Box> :
        <Chip color='info' icon={<Receipt />} variant="outlined"
          label={'Xem các mã khuyến mãi'} onClick={handleClick} onDelete={handleClick}
          deleteIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />} />
      }
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        <Box className='flex flex-row items-center justify-between p-2 bg-blue-500 h-12'>
          <Box className='flex flex-row items-center gap-2'>
            <Receipt className='text-white' />
            <Typography fontWeight={'bold'} className='text-white'>Các khuyến mãi của shop</Typography>
          </Box>
          <Close className='text-white' sx={{ fontSize: 20 }} onClick={handleClose} />
        </Box>
        <Divider />
        {(product?.product_id && Array.isArray(vouchers)) ?
          vouchers.map((voucher, index) => (
            <Voucher voucher={voucher} key={index} />
          ))
          :
          vouchers.map((shopVoucher, index) => (
            <Voucher voucher={shopVoucher?.voucher} isSelected={shopVoucher?.is_selected}
              key={index} cart_item_id={cart_item_id} reRender={reRender} setReRender={setReRender} handleClose={handleClose} />
          ))
        }
        {Array.isArray(vouchers) && vouchers?.length < 1 &&
          <EmptyData content={'Sản phẩm này chưa có khuyến mãi nào!'} />
        }
      </Popover>
    </Box>
  )
}

export default ProductVouchers