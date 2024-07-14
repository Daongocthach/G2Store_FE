import { useState } from 'react'
import { Tooltip, Switch } from '@mui/material'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function UpdateStatus({ seller, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickPause = () => {
        // voucherApi.pauseVoucher(voucher?.id, !voucher?.is_paused)
        //     .then(() => {
        //         triggerAlert('Cập nhật thành công!', false, false)
        //         setReRender(!reRender)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         triggerAlert('Cập nhật thất bại!', true, false)
        //     })
        handleClose()
    }
    return (
        <div>
            {/* <Tooltip title={voucher?.is_paused ? 'Kích hoạt' : 'Tạm dừng'}>
                <Switch checked={!voucher?.is_paused} onClick={() => setOpen(true)} />
            </Tooltip> */}
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickPause} title={'Cập nhật mã giảm giá'} content={'Bạn muốn cập nhật trạng trạng thái mã giảm giá này!'} />
        </div>
    )
}
export default UpdateStatus