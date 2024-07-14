import { useState } from 'react'
import { Box, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, Typography } from '@mui/material'
import { NextPlan, ErrorOutline } from '@mui/icons-material'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import DialogAction from '../../../../components/Dialog/DialogAction'

const status = [
  { index: 0, value: 'ORDERED', label: 'Đã đặt' },
  { index: 1, value: 'CONFIRMED', label: 'Đã xác nhận' },
  { index: 2, value: 'PACKED', label: 'Đã đóng gói' },
  { index: 3, value: 'DELIVERING', label: 'Đang giao hàng' },
  { index: 4, value: 'DELIVERED', label: 'Đã giao hàng' }
]

function NextOrder({ order, setReRender, reRender }) {
  const triggerAlert = useAlert()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [stompClient, setStompClient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    connect()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws')
    let client = over(Sock)
    client.connect({}, function () {
      stompClient.subscribe('/all/notifications', function (result) {
        console.log(JSON.parse(result.body))
    })
      setIsConnected(true)
    }, function (error) {
      console.error('STOMP connection error:', error)
    })
    setStompClient(client)
  }

  const handleUpdate = async () => {
    const currentStatusIndex = status.findIndex(s => s.value === order?.order_status)
    const nextStatus = status[currentStatusIndex + 1]?.value
    if (!nextStatus) {
      triggerAlert('Cập nhật thất bại!', true, false)
    } else {
      setLoading(true)
      orderApi.updateOrder(order?.order_id, nextStatus)
        .then(() => {
          triggerAlert('Cập nhật thành công!', false, false)
          if (isConnected) {
            const notificationReq = {
              content: `Đơn hàng #${order?.order_id} của bạn đã được cập nhật!`,
              customer_id: order?.customer_id
            }
            stompClient.send('/app/private/customer', {}, JSON.stringify(notificationReq))
          }
          setReRender(!reRender)
        })
        .catch(error => {
          console.log(error)
          triggerAlert('Cập nhật thất bại!', true, false)
        })
        .finally(() => {
          setLoading(false)
          handleClose()
        })
    }
  }

  return (
    <Box>
      <Tooltip title='Cập nhật đơn'>
        <NextPlan className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#444444', textAlign: 'center' }}>
          Cập nhật trạng thái đơn hàng
        </DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1' className='text-center text-gray-700'>
            Bạn muốn cập nhật trạng thái! Nhấn "Chấp nhận" để tiếp tục.
          </Typography>
          <Box className='flex flex-row items-center justify-center gap-2 flex-wrap mt-2'>
            <ErrorOutline className='text-gray-600' sx={{ fontSize: 20 }} />
            <Typography variant='body2' className='text-gray-700'>Lưu ý: Không thể hoàn tác!</Typography>
          </Box>
        </DialogContent>
        <DialogAction setOpen={setOpen} handleClick={handleUpdate} />
      </Dialog>
      {loading && <Loading />}
    </Box>
  )
}

export default NextOrder
