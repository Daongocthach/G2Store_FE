import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Tooltip, Grid } from '@mui/material'
import { LocalShipping } from '@mui/icons-material'
import { format } from 'date-fns'
import ghnApi from '../../../../apis/ghnApi'
import { vi } from 'date-fns/locale'

function TrackingOrder({ order }) {
  const [open, setOpen] = useState(false)
  const [orderInfo, setOderInfo] = useState({})
  const [trackingLogs, setTrackingLogs] = useState([])
  const handleClickOpen = () => {
    setOpen(true)
    if (order?.ghn_order_code) {
      ghnApi.genCode()
        .then(response => {
          ghnApi.trackingOrder(response?.data?.token, order?.ghn_order_code)
            .then((response) => {
              setOderInfo(response?.data?.data?.order_info)
              setTrackingLogs(response?.data?.data?.tracking_logs)
            })
        })
        .catch((error) => console.log(error))
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClickTracking = () => {
    location.assign('https://tracking.ghn.dev/?order_code=' + order?.ghn_order_code)
  }
  return (
    <Box>
      <Tooltip title="Tra cứu đơn hàng">
        <LocalShipping className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle fontSize={17} className=" text-gray-800">
          <Box className='flex flex-row items-center justify-between'>
            Đơn hàng #{order?.order_id} ({format(new Date(order?.created_date), 'dd/MM/yyyy HH:mm:ss')})
            {order?.ghn_order_code && <Typography fontStyle={'italic'} variant='caption' className='cursor-pointer'
              onClick={handleClickTracking}>
              <u>Tra cứu tại giao hàng nhanh</u>
            </Typography>}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box className="w-full ">
              <Typography variant="subtitle1" fontWeight={'bold'} className='text-gray-800' gutterBottom>
                Thông tin đơn hàng
              </Typography>
              <Box className="mb-4">
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Mã đơn hàng:</Typography>
                  <Typography variant="body2">{orderInfo?.order_code}</Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Ngày giao dự kiến:</Typography>
                  <Typography variant="body2">
                    {orderInfo?.leadtime ? format(new Date(orderInfo?.leadtime), 'dd/MM/yyyy HH:mm:ss') : ''}
                  </Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Trạng thái hiện tại:</Typography>
                  <Typography variant="body2">{orderInfo?.status_name}</Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1" fontWeight={'bold'} className='text-gray-800' gutterBottom>
                Người gửi
              </Typography>
              <Box className="mb-4">
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Họ và tên:</Typography>
                  <Typography variant="body2">{orderInfo?.from_name}</Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Điện thoại:</Typography>
                  <Typography variant="body2">{orderInfo?.from_phone}</Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Địa chỉ:</Typography>
                  <Typography variant="body2">{orderInfo?.from_address}</Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1" fontWeight={'bold'} className='text-gray-800' gutterBottom>
                Người nhận
              </Typography>
              <Box className="mb-4">
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Họ và tên:</Typography>
                  <Typography variant="body2">{orderInfo?.to_name}</Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Điện thoại:</Typography>
                  <Typography variant="body2">{orderInfo?.to_phone}</Typography>
                </Box>
                <Box className='flex flex-row items-center gap-1'>
                  <Typography variant="body2" className='w-32'>Địa chỉ:</Typography>
                  <Typography variant="body2">{orderInfo?.to_address}</Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="subtitle1" fontWeight={'bold'} className='text-gray-800' gutterBottom>
              Lịch sử đơn hàng
            </Typography>
            <Box className="rounded border p-1">
              <Grid container >
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" fontWeight={'bold'} className='text-gray-600'>
                    {format(new Date(), 'EEEE, dd/MM/yyyy', { locale: vi })}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" fontWeight={'bold'} className='text-gray-600'>Chi tiết</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="body2" fontWeight={'bold'} className='text-gray-600'>Thời gian</Typography>
                </Grid>
              </Grid>
              {Array.isArray(trackingLogs) && trackingLogs.length > 0 && trackingLogs.map((trackingLog, index) => (
                <Grid key={index} container mt={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" className='text-blue-700'>{trackingLog?.status_name}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" className='text-blue-700'>{trackingLog?.location?.address}</Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography variant="body2" className='text-blue-700'>22:40</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </DialogContent >
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Đóng</Button>
        </DialogActions>
      </Dialog >
    </Box >
  )
}
export default TrackingOrder