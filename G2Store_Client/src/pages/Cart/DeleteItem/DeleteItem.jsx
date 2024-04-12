import { Button, Dialog, DialogActions, DialogTitle, Alert, Snackbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import cartItemApi from '../../../apis/cartItemApi'
import { removeFromCart } from '../../../redux/actions/cart'

function DeleteItem({ customerId, productId }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        cartItemApi.deleteCartItem(customerId, productId)
            .then(() => {
                dispatch(removeFromCart(productId))
                setShowAlertSuccess(true)
            })
            .catch(err => {
                console.log(err)
                setShowAlertFail(true)
            })
        handleClose()
    }
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlertSuccess} autoHideDuration={2000} onClose={() => setShowAlertSuccess(false)}>
                <Alert severity="success" variant='filled' onClose={() => setShowAlertSuccess(false)}>
                    Xóa sản phẩm thành công!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlertFail} autoHideDuration={2000} onClose={() => setShowAlertFail(false)}>
                <Alert severity="warning" variant='filled' onClose={() => setShowAlertFail(false)}>
                    Xóa sản phẩm thất bại!
                </Alert>
            </Snackbar>
            <Button onClick={handleClickOpen}><DeleteIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleClickDelete() }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteItem