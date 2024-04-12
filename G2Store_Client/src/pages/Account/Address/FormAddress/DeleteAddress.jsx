import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'


function DeleteAddress({ addressId }) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {

        handleClose()
    }
    return (
        <div>
           <Button sx={{ color: 'inherit', fontWeight: 'bold' }} onClick={handleClickOpen}>Xóa</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleClickDelete() }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteAddress