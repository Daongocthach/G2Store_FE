import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Typography } from '@mui/material'
import Block from '@mui/icons-material/Block'
import ShowAlert from '../ShowAlert/ShowAlert'
import shopApi from '../../apis/shopApi'

function DeleteItem({ id, content }) {
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        shopApi.lockedShop(id)
            .then(() => setShowAlert(true))
            .catch((error) => { setShowAlertFail(true), console.log(error) })
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Khóa Shop'><Block sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >
                    <Typography variant={'h6'} minWidth={'100px'} fontWeight={'bold'}>{content}</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Chấp nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Khóa thành công!'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Khóa thất bại!'} isFail={true} />
        </div>
    )
}
export default DeleteItem