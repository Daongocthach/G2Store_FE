import { useState } from 'react'
import { Tooltip, Box } from '@mui/material'
import { CancelScheduleSend } from '@mui/icons-material'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
function CancelScheduleSendOrder({ orderId, reRender, setReRender }) {
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
            <Tooltip title="Hủy đơn hàng">
                <CancelScheduleSend className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
            </Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickCancelScheduleSend} title={'Hủy đơn hàng'} content={'Bạn muốn hủy đơn hàng này? Không thể hoàn tác!'} />
            {loading && <Loading />}
        </Box>
    )
}
export default CancelScheduleSendOrder