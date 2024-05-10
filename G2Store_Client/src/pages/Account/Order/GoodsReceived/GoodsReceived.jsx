import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'
import orderApi from '../../../../apis/orderApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function GoodsReceived({ orderId }) {
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
    const handleClickGoodsReceived = async () => {
        setLoading(true)
        orderApi.goodsReceived(orderId)
            .then(() => {
                setShowAlert(true)
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
            <Button variant="contained" color='success' size='small' sx={{ borderRadius: 2 }} onClick={handleClickOpen}>
                Đã nhận hàng
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#444444' }}>Bạn xác nhận đã nhận hàng?</DialogTitle>
                <DialogContent>Không thể hoàn tác!</DialogContent>
                <DialogActions>
                <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' } }}>Hủy</Button>
                    <Button onClick={handleClickGoodsReceived} sx={{ ':hover': { bgcolor: 'inherit' } }}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content='Đánh giá thành công' />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đánh giá thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default GoodsReceived