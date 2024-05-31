import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Tooltip } from '@mui/material'
import Feedback from '@mui/icons-material/Feedback'
import reviewApi from '../../../../../apis/reviewApi'
import ShowAlert from '../../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../../components/Loading/Loading'

function FeedBack({ review, reRender, setReRender }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = async () => {
        setLoading(true)
        reviewApi.shopFeedBack(review?.review_id, content)
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch((error) => {
                console.log(error)
                setShowAlertFail(true)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box >
            <Tooltip title='Phản hồi'><Feedback sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center' }}>Phản hồi</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' multiline rows={3} sx={{ mt: 1 }} label="Phản hồi" onChange={(e) => setContent(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight:'bold' }}>Hủy</Button>
                    <Button onClick={handleClickAdd} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight:'bold' }}>Thêm</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Phản hồi thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Phản hồi thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default FeedBack