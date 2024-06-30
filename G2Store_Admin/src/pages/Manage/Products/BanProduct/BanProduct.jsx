import { useState } from 'react'
import { Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import productApi from '../../../../apis/productApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function BanProduct({ productId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickBan = () => {
        productApi.lockedProduct(productId, true)
            .then(() => {
                triggerAlert('Khóa thành công!', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Khóa thất bại!', true, false)
            })
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Khóa sản phẩm'><LockIcon sx={{ color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} title={'Khóa sản phẩm'} content={'Bạn có muốn khóa phẩm này? Sản phẩm sẽ bị khóa vĩnh viễn và không thể hoàn tác'}
                handleClick={handleClickBan} />
        </div>
    )
}
export default BanProduct