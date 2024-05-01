import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
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
                <DialogTitle >Xóa sản phẩm khỏi giỏ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn muốn xóa sản phẩm này khỏi giỏ hàng, bấm 'Chấp nhận' để tiếp tục, 'Hủy' để thoát
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight:'bold' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight:'bold' }} >Chấp nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Xóa sản phẩm khỏi giỏ thành công'} />
            <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Xóa sản phẩm khỏi giỏ thất bại'} isFail={true} />
        </div>
    )
}

export default DeleteItem