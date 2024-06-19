import { useState } from 'react'
import { Button, Box } from '@mui/material'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
function DeleteOrder({ orderId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickCancel = async () => {
        setLoading(true)
        orderApi.cancelOrder(orderId)
            .then(() => {
                triggerAlert('Hủy đơn thành công!', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Hủy đơn thất bại!', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box>
            <Button variant='contained' color='warning' size='small' sx={{ borderRadius: 2 }}
                onClick={() => handleClickOpen()} >Hủy đơn</Button>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickCancel} title={'Hủy đơn hàng'} content={'Bạn muốn hủy đơn hàng này? Không thể hoàn tác!'} />
            {loading && <Loading />}
        </Box>
    )
}
export default DeleteOrder