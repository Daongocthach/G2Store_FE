import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Stepper, Step, StepLabel, Box, Tooltip } from '@mui/material'
import { Create } from '@mui/icons-material'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

var stompClient = null
var isConnected = false

function UpdateOrder({ order, setReRender, reRender }) {
  const triggerAlert = useAlert()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    connect()
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
      stompClient.subscribe('/user/' + order?.customer_id + '/specific/customer', function (result) {
        console.log(JSON.parse(result.body))
      })
      isConnected = true
    }, function (error) {
      console.error('STOMP connection error:', error)
    })
  }
  const handleUpdate = async () => {
    setLoading(true)
    orderApi.updateOrder(order?.order_id, steps[activeStep]?.value)
      .then(() => {
        triggerAlert('Cập nhật thành công!', false, false)
        if (!isConnected) {
          const notificationReq = {
            content: 'Đơn hàng #' + order?.order_id + ' của bạn đã được cập nhật!',
            customer_id: order?.customer_id
          }
          stompClient.send('/app/private/customer', {}, JSON.stringify(notificationReq))
          triggerAlert('Thông báo đã được gửi', false, false)
        } else {
          triggerAlert('Chưa kết nối!', false, true)
        }
        setReRender(!reRender)
      })
      .catch(error => {
        console.log(error)
        triggerAlert('Cập nhật thất bại!', true, false)
      })
      .finally(setLoading(false))
    handleClose()
  }
  const handleNext = () => {
    if (activeStep === 4)
      return
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    if (activeStep === 0)
      return
    setActiveStep(activeStep - 1)
  }

  return (
    <Box>
      <Tooltip title='Cập nhật'><Create sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#444444', textAlign: 'center' }}>Cập nhật trạng thái đơn hàng</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step?.index} >
                <StepLabel>{step?.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Button onClick={handleBack} variant='contained' size='small' color='info' sx={{ borderRadius: 10 }}>Trước
            </Button>
            <Button onClick={handleNext} variant='contained' size='small' color='info' sx={{ borderRadius: 10 }}>Tiếp
            </Button>
          </Box>
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

