import { useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import DialogAction from '../../../../components/Dialog/DialogAction'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

var stompClient = null
function AddNotification({ reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [content, setContent] = useState('')
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
        connect()
    }
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, function (frame) {
            console.log(frame)
            stompClient.subscribe('/all/messages', function (result) {
                console.log(JSON.parse(result.body))
            })
        })
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        if (stompClient && content.trim() !== '') {
            stompClient.send('/app/public', {}, JSON.stringify({ content: content }))
            triggerAlert('Thông báo đã được gửi', false, false)
        } else {
            triggerAlert('Nội dung thông báo không được để trống', 'error')
        }
        handleClose()
    }
    return (
        <Box>
            <Tooltip title='Thêm thông báo'>
                <Button sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }} startIcon={<AddCircle />} variant="outlined"
                    onClick={handleClickOpen}>
                    Thêm thông báo
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle id="responsive-dialog-title">
                    Thêm thông báo
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth variant='filled' size='small' sx={{ mt: 1, lineHeight: 2 }} label="Nhập nội dung"
                        onChange={(e) => setContent(e.target.value)} />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd} />
            </Dialog>
        </Box>
    )
}
export default AddNotification