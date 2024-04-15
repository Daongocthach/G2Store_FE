import { useState } from 'react'
import { Typography, Input, Box, Dialog, DialogTitle, Button, DialogContent, DialogActions, InputAdornment, IconButton } from '@mui/material'
import { AddCircle, Visibility, VisibilityOff } from '@mui/icons-material'


function DialogUpdatePassword({ handle }) {
    const [open, setOpen] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2, width: '150px' }}
                variant="contained" color="success" onClick={() => setOpen(true)}>Đổi mật khẩu</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550 }}>Cập nhật thông tin</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
                        <Typography variant='body1' sx={{ fontWeight: 550, minWidth: '90px' }}>Mật khẩu cũ</Typography>
                        <Input placeholder='*****' type={'password'} sx={{ fontSize: 15 }}
                            value={oldPassword} onChange={e => setOldPassword(e.target.value)}
                           />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
                        <Typography variant='body1' sx={{ fontWeight: 550, minWidth: '90px' }}>Mật khẩu mới</Typography>
                        <Input placeholder='*****' type={'password'} sx={{ fontSize: 15 }}
                            value={newPassword} onChange={e => setNewPassword(e.target.value)}
                            // endAdornment={
                            //     <InputAdornment position="end">
                            //         <IconButton onClick={handleClickShowPassword} edge="end" sx={{ mr: 1 }}>
                            //             {showPassword ? <VisibilityOff /> : <Visibility />}
                            //         </IconButton>
                            //     </InputAdornment>
                            // } 
                            />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handle} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogUpdatePassword