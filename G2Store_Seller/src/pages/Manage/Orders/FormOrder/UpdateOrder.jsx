import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, Box } from '@mui/material'
import { Create } from '@mui/icons-material'
import orderApi from '../../../../apis/orderApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function UpdateOrder({ order, setReRender, reRender }) {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    const orderStatusIndex = steps.findIndex(step => step?.value === order?.order_status)
    setActiveStep(orderStatusIndex)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = async () => {
    setLoading(true)
    orderApi.updateOrder(order?.order_id, steps[activeStep]?.value)
      .then(() => {
        setShowAlert(true)
        setReRender(!reRender)
      })
      .catch(error => {
        console.log(error)
        setShowAlertFail(true)
      })
      .finally(setLoading(false))
    handleClose()
  }
  const handleNext = () => {
    if (activeStep === 0 || activeStep === 5 || activeStep === 9 )
      return
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    if (activeStep === 0 || activeStep === 6 || activeStep === 9 )
      return
    setActiveStep(activeStep - 1)
  }

  return (
    <Box>
      <Button variant="contained" color='warning' onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#444444' }}>Cập nhật trạng thái đơn hàng</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step?.index} >
                <StepLabel sx={{ color: '#444444' }}>{step?.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Button onClick={handleBack} variant='contained' color='info' sx={{ '&:hover': { bgcolor: 'inherit' }, borderRadius: 10 }}>Trước
            </Button>
            <Button onClick={handleNext} variant='contained' color='info' sx={{ '&:hover': { bgcolor: 'inherit' }, borderRadius: 10 }}>Tiếp
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }}>Hủy</Button>
          <Button onClick={handleUpdate} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }}>Lưu</Button>
        </DialogActions>
      </Dialog>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật đơn hàng thành công!'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Cập nhật đơn hàng thất bại'} isFail={true} />
      {loading && <Loading />}
    </Box>
  )
}
export default UpdateOrder

const steps = [
  { index: 0, value: 'UN_PAID', label: 'Chưa thanh toán' },
  { index: 1, value: 'ORDERED', label: 'Đã đặt' },
  { index: 2, value: 'CONFIRMED', label: 'Đã xác nhận' },
  { index: 3, value: 'PACKED', label: 'Đóng gói' },
  { index: 4, value: 'DELIVERING', label: 'Đang giao hàng' },
  { index: 5, value: 'DELIVERED', label: 'Đã giao hàng' },
  { index: 6, value: 'RECEIVED', label: 'Đã nhận hàng' }
]

