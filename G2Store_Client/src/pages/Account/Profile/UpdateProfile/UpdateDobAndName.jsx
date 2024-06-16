import { useState } from 'react'
import { Box, Button } from '@mui/material'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'

function UpdateDobAndName({ handle }) {
    const [open, setOpen] = useState(false)
    return (
        <Box>
            <Button sx={{ fontWeight: 'bold', height: 40 }} size='medium' fullWidth
                variant="contained" color="success" onClick={() => setOpen(true)}>Lưu thông tin cá nhân</Button>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handle} title={'Cập nhật tên và ngày sinh'}
                content={'Bấm Chấp nhận để tiếp tục, Hủy để thoát'} />
        </Box>
    )
}

export default UpdateDobAndName