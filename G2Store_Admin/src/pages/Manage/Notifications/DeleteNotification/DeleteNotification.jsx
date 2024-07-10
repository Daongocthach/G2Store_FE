import { useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function DeleteNotification() {
    const triggerAlert = useAlert()
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
        <Box>
            <Tooltip title='Xóa'><DeleteIcon sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete} title={'Xóa thông báo'}
                content={'Bạn muốn xóa thông báo này?'} />
        </Box>
    )
}
export default DeleteNotification