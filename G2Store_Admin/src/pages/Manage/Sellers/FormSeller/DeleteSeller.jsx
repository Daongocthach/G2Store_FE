import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Box, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import productApi from '../../../../apis/productApi'
import { updateProduct } from '../../../../redux/actions/products'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function DeleteSeller({ setUpdate, productId }) {
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
        productApi.deleteProduct(productId)
            .then((response) => {
                setShowAlert(true)
                dispatch(updateProduct(response.data))
                setUpdate(productId)
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
        handleClose()
    }
    return (
        <Box>
            <Tooltip title='Xóa'><DeleteIcon sx={{ bgcolor: 'inherit', color: '#444444', cursor:'pointer' }} onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Bạn muốn xóa người bán này?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' color='inherit' onClick={handleClose}>Hủy</Button>
                    <Button variant='contained' color='success' onClick={handleClickDelete}>Xóa</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xóa người bán thành công!'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xóa người bán thất bại!'} isFail={true} />
        </Box>
    )
}
export default DeleteSeller