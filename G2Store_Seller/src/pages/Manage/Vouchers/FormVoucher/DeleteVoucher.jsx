import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import voucherApi from '../../../../apis/voucherApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteVoucher({ voucherId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        voucherApi.deleteVoucher(voucherId)
            .then(() => {
                triggerAlert('Xóa thành công!', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Xóa thất bại!', true, false)
            })
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Xóa'><DeleteIcon sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete} title={'Xóa mã giảm giá'} content={'Bạn có muốn xóa mã giảm giá này? Không thể hoàn tác!'} />
        </div>
    )
}
export default DeleteVoucher