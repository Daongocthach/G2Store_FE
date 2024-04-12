import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, Box, Alert, Snackbar } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import orderApi from '../../../../apis/orderApi'
import { updateOrder } from '../../../../redux/actions/orders'

const steps = [
  'PENDING',
  'CONFIRMED',
  'ON_DELIVERY',
  'SUCCESS'
]

function UpdateOrder({ setUpdate, order }) {
  var status
  if (order?.orderStatus == 'PENDING') {
    status = 0
  }
  if (order?.orderStatus == 'CONFIRMED') {
    status = 1
  }
  if (order?.orderStatus == 'ON_DELIVERY') {
    status = 2
  }
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(status || 0)
  const [open, setOpen] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpenCancel = () => {
    setOpenCancel(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseCancel = () => {
    setOpenCancel(false)
  }
  const handleCancel = () => {
    orderApi.updateOrderStatus(order?.id, 4)
      .then((response) => {
        setShowAlert(true)
        dispatch(updateOrder(response.data))
        setUpdate(activeStep)
      })
      .catch(error => {
        console.log(error)
        setShowAlertFail(true)
      })
    setOpenCancel(false)
    setOpen(false)
  }
  const handleUpdate = () => {
    orderApi.updateOrderStatus(order?.id, activeStep)
      .then((response) => {
        setShowAlert(true)
        setUpdate(activeStep)
        dispatch(updateOrder(response.data))
      })
      .catch(error => {
        console.log(error)
        setShowAlertFail(true)
      })
    handleClose()
  }
  const handleNext = () => {
    if (activeStep == 4) {
      return
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    if (activeStep == 0)
      return
    setActiveStep(activeStep - 1)
  }
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Cập nhật đơn hàng thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Cập nhật đơn hàng thất bại!
        </Alert>
      </Snackbar>
      <Button sx={{ bgcolor: 'orange', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Button onClick={handleClickOpenCancel}
              sx={{ bgcolor: '#EE6363', color: 'white', borderRadius: 5, '&:hover': { bgcolor: '#BEBEBE' } }}>Cancel Order
            </Button>
            <Button onClick={handleBack}
              sx={{ bgcolor: '#1874CD', color: 'white', borderRadius: 10, '&:hover': { bgcolor: '#BEBEBE' } }}>Back
            </Button>
            <Button onClick={handleNext}
              sx={{ bgcolor: '#1874CD', color: 'white', borderRadius: 10, '&:hover': { bgcolor: '#BEBEBE' } }}>Next
            </Button>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCancel} onClose={handleCloseCancel} >
        <DialogTitle >Are you sure to cancel this order?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Close</Button>
          <Button onClick={handleCancel}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default UpdateOrder