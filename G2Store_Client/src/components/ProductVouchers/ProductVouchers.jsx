import { useEffect, useState } from 'react'
import { Box, Typography, Popover, Radio } from '@mui/material'
import { KeyboardArrowDown, Receipt } from '@mui/icons-material'
import { formatCurrency } from '../../utils/price'
import voucherApi from '../../apis/voucherApi'
import emptyOrder from '../../assets/img/empty-order.png'
import cartItemV2Api from '../../apis/cartItemApiV2'

function ProductVouchers({ product, isCart, reRender, setReRender }) {
  const [chooseVoucher, setChooseVoucher] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [vouchers, setVouchers] = useState([])
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickVoucher = (voucher) => {
    setChooseVoucher(voucher)
    const data = {
      voucher_id: voucher?.id,
      cart_item_v2_id: product?.cart_item_v2_id
    }
    cartItemV2Api.applyCartVoucher(data)
      .then(() => setReRender(!reRender))
      .catch(error => console.log(error))
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (product?.product_id)
      voucherApi.getProductVouchers(product?.product_id)
        .then((response) => setVouchers(response))
        .catch((error) => console.log(error))
  }, [product?.product_id])
  return (
    <Box >
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 2, mt: 2 }} onClick={handleClick}>
        <Receipt color='action' />
        <Typography variant='subtitle1' >Xem các mã khuyến mãi</Typography>
        <KeyboardArrowDown sx={{ fontSize: 20 }} />
      </Box>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        {vouchers.map((voucher, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2, maxHeight: 300, overflow: 'auto' }}>
            <Receipt sx={{ fontSize: 25, color: '#444444' }} />
            <Box >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant='subtitle2' color={'#444444'} >{voucher?.name}: </Typography>
                <Typography color={'#cb1c22'} variant='subtitle1' fontWeight={'bold'} >{voucher?.discount_type == 'PERCENTAGE' ? voucher?.reduce_percent + '%' : formatCurrency(voucher?.reduce_price)}</Typography>
              </Box>
              <Typography color={'#444444'} variant='subtitle2' >Đơn tối thiểu: {formatCurrency(voucher?.min_spend)}</Typography>
              <Typography variant='subtitle2' fontStyle={'italic'}>{voucher?.start_date} - {voucher?.end_date}</Typography>
            </Box>
            {isCart && <Radio value={voucher} checked={chooseVoucher?.name === voucher} onChange={() => handleClickVoucher(voucher)} />}
          </Box>
        ))}
        {vouchers?.length < 1 &&
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ p: 2, minWidth: 500 }}>
            <img src={emptyOrder} style={{ objectFit: 'cover', height: '200px', width: '200px' }} />
            <Typography variant='h6' color={'#444444'}>Chưa có mã khuyến mãi nào</Typography>
          </Box>
        }
      </Popover>
    </Box>
  )
}

export default ProductVouchers