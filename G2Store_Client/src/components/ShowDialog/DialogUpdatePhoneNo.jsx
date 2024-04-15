import { useState } from 'react'
import { TextField, Box, Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@mui/material'
import { toast } from 'react-toastify'
import authenApi from '../../apis/authenApi'

function DialogUpdatePhoneNo() {
    const [open, setOpen] = useState(false)
    const [new_phone_no, setPhoneNo] = useState('')
    const [touched, setTouched] = useState(false)

    const handleUpdatePhoneNo = async () => {
        if (new_phone_no) {
            authenApi.updatePhone({ new_phone_no })
                .then(() => {
                    toast.success('Cập nhật thành công', { position: 'top-center', autoClose: 2000 })
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Cập nhật thất bại', { position: 'top-center', autoClose: 2000 })
                })
                .finally(() => setOpen(false))
        }
        else {
            toast.error('Số điện thoại không được để trống', { position: 'top-center', autoClose: 2000 })
        }

    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2 }}
                variant="contained" color="info" onClick={() => setOpen(true)}>Đổi số điện thoại</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false), setTouched(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550 }}>Cập nhật số điện thoại</DialogTitle>
                <DialogContent>
                    <TextField sx={{ mt: 2 }} fullWidth label='Số điện thoại' size='small' type='text' value={new_phone_no}
                        error={touched && !new_phone_no}
                        helperText={touched && !new_phone_no ? 'Không được để trống' : ''}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        onBlur={() => setTouched(true)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false), setTouched(false) }} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleUpdatePhoneNo} size='small' sx={{ height: 35, fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogUpdatePhoneNo