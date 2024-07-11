import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider, Box, Tooltip, TextField } from '@mui/material'
import { Visibility } from '@mui/icons-material'
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
      <Tooltip title="Xem chi tiết">
        <Visibility className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle fontSize={17} className=" text-gray-700">
          Đơn hàng #{order?.order_id} ({format(new Date(order?.created_date), 'dd/MM/yyyy HH:mm:ss')})
        </DialogTitle>
        <DialogContent>
          <Box className="flex flex-col gap-1">
            {order?.refunded_at && <TextField readOnly value={format(new Date(order?.refunded_at), 'dd/MM/yyyy HH:mm:ss')}
              className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Ngày hoàn tiền' size='small' variant='filled' />}
            {order?.refunding_at && <TextField readOnly value={format(new Date(order?.refunding_at), 'dd/MM/yyyy HH:mm:ss')}
              className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Ngày yêu cầu hoàn tiền' size='small' variant='filled' />}
            <TextField readOnly value={order?.address?.receiver_name}
              className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Họ và tên' size='small' variant='filled' />
            <TextField readOnly className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Số điện thoại' size='small'
              variant='filled' value={order?.address?.receiver_phone_no} />
            <TextField readOnly className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Địa chỉ' size='small'
              variant='filled'
              value={order?.address?.province_name ? `${order?.address?.order_receive_address}, ${order?.address?.ward_name}, ${order?.address?.district_name}, ${order?.address?.province_name}` : ''} />
            <TextField readOnly className="min-w-[200px] md:min-w-[500px] text-[15px] " label='Phương thức thanh toán' size='small'
              variant='filled' value={order?.payment_type} />
            <Box>{order?.items.map((orderItem, index) => (<OrderItem key={index} orderItem={orderItem} />))}</Box>
            <Divider />
            <Box className='flex flex-col gap-1'>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle1' fontWeight={'bold'} className="min-w-[100px] text-gray-700">Tổng tiền:</Typography>
                <Typography variant='subtitle1' fontWeight={'bold'} className="text-red-600 text-[15px]">{formatCurrency(order?.grand_total)}</Typography>
              </Box>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle2' className="min-w-[100px] text-gray-700">Tiền hàng:</Typography>
                <Typography variant='subtitle2' className="text-gray-600">{formatCurrency(order?.shop_total)}</Typography>
              </Box>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle2' className="min-w-[100px] text-gray-700">Phí vận chuyển:</Typography>
                <Typography variant='subtitle2' className="text-gray-600">{formatCurrency(order?.fee_ship)}</Typography>
              </Box>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle2' className="min-w-[100px] text-gray-700">Giảm giá shop:</Typography>
                <Typography variant='subtitle2' className="text-green-700">-{formatCurrency(order?.shop_voucher_price_reduce)}</Typography>
              </Box>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle2' className="min-w-[100px] text-gray-700">Giảm giá vận chuyển:</Typography>
                <Typography variant='subtitle2' className="text-green-700">-{formatCurrency(order?.fee_ship_reduce)}</Typography>
              </Box>
              <Box className="flex justify-between items-center gap-1 flex-wrap">
                <Typography variant='subtitle2' className="min-w-[100px] text-gray-700">Giảm giá bằng điểm:</Typography>
                <Typography variant='subtitle2' className="text-green-700">-{formatCurrency(order?.point_spent)}</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default ViewOrder