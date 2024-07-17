import { useState } from 'react'
import { MenuItem, Box } from '@mui/material'
import { Print } from '@mui/icons-material'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import ghnApiV2 from '../../../../apis/ghnApiV2'

function PrintOrder({ orderCode }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handlePrint = () => {
        if (orderCode) {
            setLoading(true)
            ghnApiV2.printOrder(orderCode)
                .then((response) => {
                    location.assign(response)
                    triggerAlert('In đơn thành công!', false, false)
                })
                .catch((err) => {
                    console.log(err)
                    triggerAlert('In đơn thất bại!', true, false)
                })
                .setLoading(false)
        }
        else {
            triggerAlert('Không tìm thấy mã đơn hàng!', true, false)
        }
        handleClose()
    }
    return (
        <Box>
            <MenuItem onClick={handleClickOpen} className='text-gray-600 gap-1'>
                <Print className='text-gray-600' />
                In đơn hàng
            </MenuItem>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handlePrint} title={'In đơn hàng'} content={'Bạn muốn vào trang in đơn hàng này!'} />
            {loading && <Loading />}
        </Box>
    )
}
export default PrintOrder