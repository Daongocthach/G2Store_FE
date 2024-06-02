import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import categoryApi from '../../../../apis/categoryApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function DeleteCategory({ category_id, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = async (category_id) => {
        categoryApi.deleteShopCategory(category_id)
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch((error) => console.log(error))
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Xóa ngành hàng'><DeleteIcon className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Bạn có muốn xóa ngành hàng này?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }} >Hủy</Button>
                    <Button onClick={() => handleClickDelete(category_id)} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }} >Xóa</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xóa ngành hàng thành công!'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xóa ngành hàng thất bại!'} isFail={true} />
        </div>
    )
}
export default DeleteCategory