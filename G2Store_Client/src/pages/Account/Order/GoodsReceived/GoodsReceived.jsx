import { useState } from 'react'
import { Button, Box } from '@mui/material'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'

function GoodsReceived({ orderId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickGoodsReceived = async () => {
        setLoading(true)
        orderApi.goodsReceived(orderId)
            .then(() => {
                triggerAlert('Xác nhận nhận hàng thành công', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Xác nhận nhận hàng thất bại!', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box>
            <Button variant="contained" color='success' size='small' sx={{ borderRadius: 2 }} onClick={handleClickOpen}>
                Đã nhận hàng
            </Button>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickGoodsReceived} title={'Xóa địa chỉ'} content={'Bạn xác nhận đã nhận hàng? Không thể hoàn tác!'} />
            {loading && <Loading />}
        </Box>
    )
}
export default GoodsReceived