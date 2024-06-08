import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import voucherApi from '../../../../apis/voucherApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'

function DeleteVoucher({ voucherId, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        voucherApi.deleteVoucher(voucherId)
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Xóa'><DeleteIcon sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >
                    <Typography variant={'h6'} minWidth={'100px'} fontWeight={'bold'}>Bạn có muốn xóa mã giảm giá này?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Chấp nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Xóa mã giảm giá thành công!'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Xóa mã giảm giá thất bại!'} isFail={true} />
        </div>
    )
}
export default DeleteVoucher