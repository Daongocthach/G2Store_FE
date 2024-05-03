import { useState } from 'react'
import { Box, Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@mui/material'

function DialogUpdate({ handle }) {
    const [open, setOpen] = useState(false)
    const handleUpdate = () => {
        setOpen(false)
        handle()
    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2 }}
                variant="contained" color="success" onClick={() => setOpen(true)}>Cập nhật</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550, color:'#444444' }}>Cập nhật thông tin</DialogTitle>
                <DialogContent>
                    Bấm 'Ok' để chấp nhận, 'Hủy' để thoát!
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleUpdate} size='small' sx={{ fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogUpdate