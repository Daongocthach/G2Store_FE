import { useState } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import categoryApi from '../../../../apis/categoryApi'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

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
        categoryApi.deleteShopCategory(category_id)
            .then(() => {
                triggerAlert('Xóa thành công!', false, false)
                setReRender(!reRender)
            })
            .catch((error) => console.log(error), triggerAlert('Xóa thất bại!', true, false))
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Xóa ngành hàng'><DeleteIcon className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Xóa ngành hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có muốn xóa ngành hàng này? Không thể hoàn tác!
                    </DialogContentText>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickDelete} />
            </Dialog>
        </div>
    )
}
export default DeleteCategory