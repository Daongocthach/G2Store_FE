import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import orderApi from '../../../../apis/orderApi'

function DeleteOrder({ handleAllOrders, orderId }) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        orderApi.deleteOrder(orderId)
            .then(() => {
                alert('Delete Success')
                handleAllOrders()
            })
            .catch(error => {
                console.log(error)
                alert('Delete Fail')
            })
        handleClose()
    }
    return (
        <div>
            <Button size={'small'} variant='contained' color='error' sx={{ borderRadius: 2, fontWeight: 'bold' }}
                onClick={handleClickOpen} >Hủy đơn hàng</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Vui lòng chọn lý do hủy đơn hàng?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteOrder