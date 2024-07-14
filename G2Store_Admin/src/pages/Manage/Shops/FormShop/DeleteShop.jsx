import { useState } from 'react'
import { Tooltip } from '@mui/material'
import Lock from '@mui/icons-material/Lock'
import shopApi from '../../../../apis/shopApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteShop({ id }) {
  const triggerAlert = useAlert()
  const [open, setOpen] = useState(false)

    const handleClickDelete = () => {
        shopApi.lockedShop(id)
            .then(() => triggerAlert('Xóa thành công!', false, false))
            .catch((error) => { triggerAlert('Xóa thất bại!', true, false), console.log(error) })
        setOpen(false)
    }
    return (
        <div>
            <Tooltip title='Khóa Shop'><Lock sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <DialogTextOnly handleClick={handleClickDelete} open={open} setOpen={setOpen} title={'Khóa shop'} content={'Bạn muốn khóa Shop này, không thể hoàn tác!'} />
        </div>
    )
}
export default DeleteShop