import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import promotionApi from '../../../../apis/promotionApi'
import { deletePromotion } from '../../../../redux/actions/promotions'

function DeletePromotion({ setUpdate, promotionId }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        promotionApi.deletePromotion(promotionId)
        .then((response) => {
            alert('Delete Success')
            dispatch(deletePromotion(response.data))
            setUpdate(promotionId)
        })
        .catch(error => {
            console.log(error)
            alert('Delete Fail')
        })
        handleClose()
    }
    return (
        <div>
            <Button sx={{ bgcolor: '#EE6363', color: 'black' }} variant="outlined" onClick={handleClickOpen}><DeleteIcon/></Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeletePromotion