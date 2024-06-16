import { useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import productApi from '../../../../apis/productApi'
import { updateProduct } from '../../../../redux/actions/products'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteSeller({ setUpdate, productId }) {
    const triggerAlert = useAlert()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        productApi.deleteProduct(productId)
            .then((response) => {
                triggerAlert('Xóa thành công!', false, false)
                dispatch(updateProduct(response.data))
                setUpdate(productId)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Xóa thất bại!', true, false)
            })
        handleClose()
    }
    return (
        <Box>
            <Tooltip title='Xóa'><DeleteIcon sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete} title={'Xóa người bán'} content={'Bạn muốn xóa người bán này?'} />
        </Box>
    )
}
export default DeleteSeller