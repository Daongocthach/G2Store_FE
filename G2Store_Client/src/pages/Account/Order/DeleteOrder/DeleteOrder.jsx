import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'
import orderApi from '../../../../apis/orderApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function DeleteOrder({ orderId, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickCancel = async () => {
        setLoading(true)
        orderApi.goodsReceived(orderId)
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                setShowAlertFail(true)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box>
            <Button variant='contained' color='warning' size='small' sx={{ borderRadius: 2 }}
                onClick={() => handleClickOpen()} >Hủy đơn</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#444444' }}>Bạn xác nhận hủy đơn hàng này?</DialogTitle>
                <DialogContent>Không thể hoàn tác!</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' } }}>Hủy</Button>
                    <Button onClick={handleClickCancel} sx={{ ':hover': { bgcolor: 'inherit' } }}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content='Hủy đơn thành công' />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Hủy đơn thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default DeleteOrder