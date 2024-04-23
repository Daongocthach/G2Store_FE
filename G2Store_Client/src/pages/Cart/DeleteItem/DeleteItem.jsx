import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import cartItemApi from '../../../apis/cartItemApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import { removeFromCart } from '../../../redux/actions/cart'

function DeleteItem({ productId, reRender, setReRender }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        cartItemApi.deleteCartItem(productId)
            .then(() => {
                setShowAlert(true)
                dispatch(removeFromCart(productId))
                setReRender(!reRender)
            })
            .catch(err => {
                console.log(err)
                setShowAlertFail(true)
            })
        handleClose()
    }
    return (
        <div>
            <Button onClick={handleClickOpen}><DeleteIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444') }} />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} size='small' sx={{ fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Chấp nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Xóa sản phẩm khỏi giỏ thành công'} />
            <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Xóa sản phẩm khỏi giỏ thất bại'} isFail={true} />
        </div>
    )
}

export default DeleteItem