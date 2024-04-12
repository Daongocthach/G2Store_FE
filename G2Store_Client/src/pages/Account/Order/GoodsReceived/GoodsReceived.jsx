import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import orderApi from '../../../../apis/orderApi'

function GoodsReceived({ orderId }) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickGoodsReceived = () => {
        orderApi.updateOrderStatus(orderId, 3)
            .then(() => {
                alert('Update Success')
            })
            .catch(error => {
                console.log(error)
                alert('Update Fail')
            })
        handleClose()
    }
    return (
        <div>
            <Button size={'small'} sx={{ bgcolor: '#CD3333', color: 'white', borderRadius: 10, fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
                onClick={handleClickOpen} >Đã nhận hàng</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Have you received the goods?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickGoodsReceived}>Accept</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default GoodsReceived