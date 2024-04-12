import { useState } from 'react'
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box,
  Typography, FormControl, Select, MenuItem, Alert, Snackbar
} from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import productApi from '../../../../apis/productApi'
import { updateProduct } from '../../../../redux/actions/products'

function UpdatePrice({ product }) {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [discount, setDiscount] = useState()
  const [subCategory, setSubCategory] = useState()
  const [provider, setProvider] = useState()
  const [image, setImage] = useState()
  const [enabled, setEnabled] = useState()
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    setName(product?.name)
    setPrice(product?.price)
    setDescription(product?.description)
    setDiscount(product?.discount)
    setSubCategory(product?.subCategory?.id)
    setProvider(product?.provider?.id)
    setImage(product?.image)
    setEnabled(product?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    productApi.updateProduct(product?.id, name, price, description, discount, subCategory, provider, image, enabled)
      .then((response) => {
        setShowAlert(true)
        dispatch(updateProduct(response.data))
      })
      .catch(error => {
        console.log(error)
        setShowAlertFail(true)
      })
    handleClose()
  }
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Cập nhật sản phẩm thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Cập nhật sản phẩm thất bại!
        </Alert>
      </Snackbar>
      <Button onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Name: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Description: </Typography>
              <TextField fullWidth size='small' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Price: </Typography>
              <TextField fullWidth size='small' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Discount: </Typography>
              <TextField fullWidth size='small' value={discount} onChange={(e) => setDiscount(e.target.value)} />
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
export default UpdatePrice