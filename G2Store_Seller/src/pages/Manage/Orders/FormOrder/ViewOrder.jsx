import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider, Box, Input } from '@mui/material'
import { Visibility, LocalShipping, FiberManualRecord } from '@mui/icons-material'
import { format } from 'date-fns'
import OrderItem from '../OrderItem/OrderItem'
import { formatCurrency } from '../../../../utils/price'

function ViewOrder({ order }) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
      <Button variant="contained" color='error' onClick={handleClickOpen}><Visibility /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color:'#444444' }}>Thông tin đơn hàng</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={useStyles.flexBox}>
              <Box sx={useStyles.flexBox}>
                <FiberManualRecord sx={{
                  fontSize: 15, color: order?.order_status == 'SUCCESS' ? 'green' :
                    order?.order_status == 'ON_DELIVERY' ? 'orange' :
                      order?.order_status == 'CONFIRMED' ? 'gold' : order?.order_status == 'PENDING' ? 'blue' : '#cd3333'
                }} />
                <Typography variant='subtitle1' color={'#444444'} sx={{ fontWeight: 'bold' }}>Đơn hàng</Typography>
                <Typography variant='subtitle2' color={'#444444'}>{format(new Date(order?.created_date), 'yyyy-MM-dd HH:mm:ss')}</Typography>
                <Typography variant='subtitle2' color={'#444444'}>#{order?.order_id}</Typography>
              </Box>
              <LocalShipping sx={{ color: '#444444' }} />
            </Box>
            <Typography variant='h6' sx={{ color: '#444444' }}>Thông tin khách hàng</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, mb: 1 }}>
              <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và tên</Typography>
              <Input readOnly sx={useStyles.input} value={order?.address?.receiver_name} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, mb: 1 }}>
              <Typography variant='subtitle1' sx={useStyles.inputTitle}>Số điện thoại</Typography>
              <Input readOnly sx={useStyles.input} value={order?.address?.receiver_phone_no} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, mb: 1 }}>
              <Typography variant='subtitle1' sx={useStyles.inputTitle}>Địa chỉ giao hàng</Typography>
              <Input readOnly sx={useStyles.input} value={order?.address?.province ? (order?.address?.order_receive_address + ', ' + order?.address?.ward + ', ' + order?.address?.district + ', ' + order?.address?.province) : ''} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, mb: 1 }}>
              <Typography variant='subtitle1' sx={useStyles.inputTitle}>Thanh toán</Typography>
              <Input readOnly sx={useStyles.input} value={order?.payment_type} />
            </Box>
            <Box>
              <Typography variant='h6' sx={{ color: '#444444' }}>Thông tin đơn hàng</Typography>
              <Box>
                {order?.items.map((orderItem, index) =>
                  <OrderItem key={index} orderItem={orderItem} />)}
              </Box>
            </Box>
            <Box>
              <Typography variant='h6' sx={{ color: '#444444' }}>Giá trị đơn hàng</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant='subtitle1' sx={useStyles.inputTitle}>Tổng tiền:</Typography>
                <Typography color={'#cd3333'} variant='h6' fontWeight={'bold'}>{formatCurrency(order?.total)}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant='subtitle1' sx={useStyles.inputTitle}>Phí vận chuyển:</Typography>
                <Typography variant='subtitle1' color={'#2e7d32'} >{formatCurrency(order?.fee_ship)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá shop:</Typography>
                <Typography variant='subtitle1' >{formatCurrency(order?.shop_voucher_price_reduce)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá toàn sàn:</Typography>
                <Typography variant='subtitle1' >{formatCurrency(order?.g2_voucher_price_reduce)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography variant='subtitle1' sx={useStyles.inputTitle}>Giảm giá bằng điểm:</Typography>
                <Typography variant='subtitle1' >{formatCurrency(order?.point_spent)}</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' } }}>Tắt</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default ViewOrder

const useStyles = {
  inputTitle: {
    minWidth: 100, color: '#444444'
  },
  input: {
    minWidth: { xs: 200, md: 500 },
    fontSize: 15
  },
  button: {
    color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2
  },
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1, justifyContent: 'space-between', flexWrap: 'wrap'
  }
}