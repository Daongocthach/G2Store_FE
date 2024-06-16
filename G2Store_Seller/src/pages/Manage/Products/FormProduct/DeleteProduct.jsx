import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import productApi from '../../../../apis/productApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteProduct({ productId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        productApi.deleteProduct(productId)
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
            <DialogTextOnly open={open} setOpen={setOpen} title={'Xóa sản phẩm'} content={'Bạn có muốn xóa sản phẩm này? Không thể hoàn tác!'} handleClick={handleClickDelete} />
        </div>
    )
}
export default DeleteProduct