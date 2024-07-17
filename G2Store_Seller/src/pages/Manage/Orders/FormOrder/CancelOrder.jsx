import { useState } from 'react'
import { Box, MenuItem } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'

function CancelOrder({ orderId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickCancelScheduleSend = async () => {
        setLoading(true)
        orderApi.updateOrder(orderId, 'CANCELED')
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
            <MenuItem onClick={handleClickOpen} className='text-gray-600 gap-1'>
                <Cancel className='text-gray-600' />
                Hủy đơn hàng
            </MenuItem>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickCancelScheduleSend} title={'Hủy đơn hàng'} content={'Bạn muốn hủy đơn hàng này? Không thể hoàn tác!'} />
            {loading && <Loading />}
        </Box>
    )
}
export default CancelOrder