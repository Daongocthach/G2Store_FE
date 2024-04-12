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
            <Button size={'small'} sx={{ bgcolor: '#CD3333', color: 'white', borderRadius: 10, fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
                onClick={handleClickOpen} >Hủy đơn hàng</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteOrder