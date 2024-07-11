import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Box, Tooltip, Typography } from '@mui/material'
import { Create, ErrorOutline } from '@mui/icons-material'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

var stompClient = null

function UpdateOrder({ order, setReRender, reRender }) {
  const triggerAlert = useAlert()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    // connect()
    const orderStatusIndex = steps.findIndex(step => step?.value === order?.order_status)
    setActiveStep(orderStatusIndex)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws')
    stompClient = over(Sock)
    stompClient.connect({}, function () {
      stompClient.subscribe(`/user/${123}/specific`, function (result) {
      })
    }, function (error) {
      console.error('STOMP connection error:', error)
    })
  }
  const handleUpdate = async () => {
    setLoading(true)
    orderApi.refundOrder(order?.order_id)
      .then(() => {
        triggerAlert('Hoàn tiền thành công!', false, false)
        setReRender(!reRender)
      })
      .catch(error => {
        console.log(error)
        triggerAlert('Hoàn tiền thất bại!', true, false)
      })
      .finally(setLoading(false))
    handleClose()
  }

  return (
    <Box>
      <Tooltip title='Hoàn tiền'><Create sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#444444', textAlign: 'center' }}>Hoàn tiền đơn hàng</DialogTitle>
        <DialogContent>
          <Box className='flex flex-row items-center gap-2 flex-wrap'>
            <ErrorOutline className='text-gray-600' sx={{ fontSize: 20 }} />
            <Typography fontSize={13} className='text-gray-700'>Lưu ý</Typography>
          </Box>
          <ul style={{ listStyleType: 'circle' }} className='font-normal text-sm ml-4 text-gray-600'>
            <li >Bạn xác nhận hoàn tiền cho đơn hàng này !</li>
            <li >Không thể hoàn tác !</li>
            <li >Kiểm tra kỹ trước khi ấn "Chấp nhận" !</li>
          </ul>
        </DialogContent>
        <DialogAction setOpen={setOpen} handleClick={handleUpdate} />
      </Dialog>
      {loading && <Loading />}
    </Box>
  )
}
export default UpdateOrder

const steps = [
  { index: 0, value: 'ORDERED', label: 'Đã đặt' },
  { index: 1, value: 'CONFIRMED', label: 'Đã xác nhận' },
  { index: 2, value: 'PACKED', label: 'Đã đóng gói' },
  { index: 3, value: 'DELIVERING', label: 'Đang giao hàng' },
  { index: 4, value: 'DELIVERED', label: 'Đã giao hàng' }
]

