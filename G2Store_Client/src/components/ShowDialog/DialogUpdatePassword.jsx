import { useState } from 'react'
import { Box, Dialog, DialogTitle, Button, DialogContent, DialogActions, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import authenApi from '../../apis/authenApi'

function DialogUpdatePassword({ reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [touched, setTouched] = useState(false)
    const [old_password, setOld_password] = useState('')
    const [new_password, setNew_password] = useState('')
    const handle = async () => {
        if (new_password && old_password && old_password !== new_password) {
            authenApi.updatePassword({ old_password, new_password })
                .then(() => {
                    toast.success('Cập nhật thành công', { position: 'top-center', autoClose: 2000 })
                    setReRender(!reRender)
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Cập nhật thất bại', { position: 'top-center', autoClose: 2000 })
                })
                .finally(() => setOpen(false))
        }
        else {
            toast.error('Vui lòng kiểm tra lại thông tin', { position: 'top-center', autoClose: 2000 })
        }

    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2 }}
                variant="contained" color="info" onClick={() => setOpen(true)}>Đổi mật khẩu</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false), setTouched(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550, color:'#444444' }}>Cập nhật mật khẩu</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField fullWidth label='Mật khẩu cũ' size='small' type='password' value={old_password}
                            error={touched && !old_password}
                            helperText={touched && !old_password ? 'Không được để trống' : ''}
                            onChange={(e) => setOld_password(e.target.value)}
                            onBlur={() => setTouched(true)} />
                        <TextField fullWidth label='Mật khẩu mới' size='small'
                            type='password' value={new_password}
                            error={touched && old_password == new_password}
                            helperText={touched && old_password == new_password ? 'Trùng mật khẩu cũ' : ''}
                            onChange={e => setNew_password(e.target.value)}
                            onBlur={() => setTouched(true)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false), setTouched(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handle} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogUpdatePassword