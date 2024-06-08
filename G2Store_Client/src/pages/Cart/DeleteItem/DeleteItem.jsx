import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Tooltip } from '@mui/material'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import { removeFromCart } from '../../../redux/actions/cart'

function DeleteItem({ shopItemId, cartItemId, reRender, setReRender }) {
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
        if (cartItemId) {
            cartItemV2Api.deleteCartItems(cartItemId)
                .then(() => {
                    setShowAlert(true)
                    setReRender(!reRender)
                })
                .catch(err => {
                    console.log(err)
                    setShowAlertFail(true)
                })
        }
        else {
            cartItemV2Api.deleteShopItem(shopItemId)
                .then(() => {
                    setShowAlert(true)
                    dispatch(removeFromCart(shopItemId))
                    setReRender(!reRender)
                })
                .catch(err => {
                    console.log(err)
                    setShowAlertFail(true)
                })
        }
        handleClose()
    }
    return (
        <div style={{ marginTop: 4 }}>
            <Tooltip title={shopItemId ? 'Xóa' : 'Xóa tất cả sản phẩm của shop'}><DeleteOutline sx={{ color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >{shopItemId ? 'Xóa sản phẩm khỏi giỏ?' : 'Xóa tất cả sản phẩm của shop này?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn muốn xóa sản phẩm này khỏi giỏ hàng, bấm 'Chấp nhận' để tiếp tục, 'Hủy' để thoát
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }} >Chấp nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Xóa sản phẩm khỏi giỏ thành công'} />
            <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Xóa sản phẩm khỏi giỏ thất bại'} isFail={true} />
        </div>
    )
}

export default DeleteItem