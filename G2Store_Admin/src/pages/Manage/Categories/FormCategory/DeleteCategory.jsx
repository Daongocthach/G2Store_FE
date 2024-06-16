import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import categoryApi from '../../../../apis/categoryApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteCategory({ category_id, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = async () => {
        categoryApi.deleteCategory(category_id)
            .then(() => {
                triggerAlert('Xóa danh mục thành công!', false, false)
                setReRender(!reRender)
            })
            .catch((error) => console.log(error), triggerAlert('Xóa danh mục thất bại!', true, false))
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Xóa'>
                <DeleteIcon className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen} />
            </Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete} title={'Xóa danh mục'} content={'Bạn có muốn xóa danh mục này? Không thể hoàn tác!'} />
        </div>
    )
}
export default DeleteCategory