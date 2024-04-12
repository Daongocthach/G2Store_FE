import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import promotionApi from '../../../../apis/promotionApi'
import { updatePromotion } from '../../../../redux/actions/promotions'

function UpdatePromotion({ setUpdate, promotion }) {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [code, setCode] = useState()
  const [value, setValue] = useState()
  const [quantity, setQuantity] = useState()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    setStartDate(format(new Date(promotion?.startDate), 'yyyy-MM-dd'))
    setEndDate(format(new Date(promotion?.endDate), 'yyyy-MM-dd'))
    setCode(promotion?.code)
    setValue(promotion?.value)
    setQuantity(promotion?.quantity)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    promotionApi.updatePromotion(promotion?.id, startDate, endDate, code, value, quantity)
    .then((response) => {
        alert('Update Success')
        setUpdate(response.data.id)
        dispatch(updatePromotion(response.data))
    })
    .catch(error => {
        console.log(error)
        alert('Update Fail')
    })
    handleClose()
  }
  return (
    <div>
      <Button sx={{ bgcolor: 'orange', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Promotion</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Code: </Typography>
              <TextField fullWidth size='small' value={code} onChange={(e) => setCode(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Value: </Typography>
              <TextField fullWidth size='small' value={value} onChange={(e) => setValue(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Quantity: </Typography>
              <TextField fullWidth size='small' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>StartDate: </Typography>
              <TextField fullWidth size='small' type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>EndDate: </Typography>
              <TextField fullWidth size='small' type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default UpdatePromotion