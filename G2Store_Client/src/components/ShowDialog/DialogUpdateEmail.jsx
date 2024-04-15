import { useState } from 'react'
import { TextField, Box, Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@mui/material'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authenApi from '../../apis/authenApi'
import { deleteCookie } from '../../utils/cookie'
import { logout } from '../../redux/actions/auth'
import { persistor } from '../../redux/store'

function DialogUpdateEmail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [touched, setTouched] = useState(false)
    const [open, setOpen] = useState(false)
    const [new_email, setNewEmail] = useState('')

    const handleUpdate = async () => {
        if (new_email) {
            authenApi.updateEmail({ new_email })
                .then(() => {
                    toast.success('Cập nhật thành công, Vui lòng đăng nhập lại', { position: 'top-center', autoClose: 4000 })
                    authenApi.logout()
                    deleteCookie()
                    dispatch(logout())
                    persistor.purge()
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Cập nhật thất bại', { position: 'top-center', autoClose: 2000 })
                })
                .finally(() => setOpen(false))
        }
        else {
            toast.error('Email không được để trống', { position: 'top-center', autoClose: 2000 })
        }

    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2 }}
                variant="contained" color="info" onClick={() => setOpen(true)}>Đổi email</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550 }}>Cập nhật email</DialogTitle>
                <DialogContent>
                    <TextField sx={{ mt: 2 }} fullWidth label='Email' size='small' type='text' value={new_email}
                        error={touched && !new_email}
                        helperText={touched && !new_email ? 'Không được để trống' : ''}
                        onChange={(e) => setNewEmail(e.target.value)}
                        onBlur={() => setTouched(true)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleUpdate} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogUpdateEmail