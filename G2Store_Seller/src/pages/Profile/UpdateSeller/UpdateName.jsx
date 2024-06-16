import { useState } from 'react'
import { Box, Button } from '@mui/material'
import DialogTextOnly from '../../../components/Dialog/DialogTextOnly'

function UpdateName({ handle }) {
    const [open, setOpen] = useState(false)
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px' }}
                variant="contained" color="warning" onClick={() => setOpen(true)}>Lưu thông tin cá nhân</Button>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handle} title={'Cập nhật tên'}
                content={'Bấm Chấp nhận để tiếp tục, Hủy để thoát'} />
        </Box>
    )
}

export default UpdateName