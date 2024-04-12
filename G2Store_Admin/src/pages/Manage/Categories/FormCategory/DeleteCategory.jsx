import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import categoryApi from '../../../../apis/categoryApi'
import { updateCategory } from '../../../../redux/actions/categories'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function DeleteCategory({ category_id }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        categoryApi.deleteCategory(category_id)
            .then((response) => {
                setShowAlert(true)
                dispatch(updateCategory(response.data))
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
        handleClose()
    }
    return (
        <div>
            <Button className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen}><DeleteIcon /></Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Bạn có muốn xóa danh mục này ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 500, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} size='small' sx={{ fontWeight: 500, bgcolor: '#1E90FF', color: 'white' }} >Xóa</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xóa danh mục thành công!'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xóa danh mục thất bại!'} />
        </div>
    )
}
export default DeleteCategory