import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Tooltip } from '@mui/material'
import Feedback from '@mui/icons-material/Feedback'
import reviewApi from '../../../../../apis/reviewApi'
import Loading from '../../../../../components/Loading/Loading'
import { useAlert } from '../../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../../components/Dialog/DialogAction'

function FeedBack({ review, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = async () => {
        setLoading(true)
        reviewApi.shopFeedBack(review?.review_id, content)
            .then(() => {
                triggerAlert('Phản hồi thành công!', false, false)
                setReRender(!reRender)
            })
            .catch((error) => {
                triggerAlert('Phản hồi thất bại!', true, false)
                console.log(error)
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
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd}/>
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default FeedBack