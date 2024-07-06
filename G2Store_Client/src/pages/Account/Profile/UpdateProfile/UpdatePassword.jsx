import { useState } from 'react'
import { Box, Dialog, DialogTitle, Button, DialogContent, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import authenApi from '../../../../apis/authenApi'
import DialogAction from '../../../../components/Dialog/DialogAction'
import Loading from '../../../../components/Loading/Loading'

function UpdatePassword({ reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [touched, setTouched] = useState(false)
    const [old_password, setOld_password] = useState('')
    const [new_password, setNew_password] = useState('')
    const [re_password, setRe_password] = useState('')
    const handleUpdate = async () => {
        if (new_password && old_password && old_password !== new_password && new_password === re_password) {
            setLoading(true)
            authenApi.updatePassword({ old_password, new_password })
                .then(() => {
                    toast.success('Cập nhật thành công', { position: 'top-center', autoClose: 2000 })
                    setReRender(!reRender)
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Cập nhật thất bại', { position: 'top-center', autoClose: 2000 })
                })
                .finally(() => {
                    setLoading(false)
                    setOpen(false)
                })
        }
        else {
            toast.error('Vui lòng kiểm tra lại thông tin', { position: 'top-center', autoClose: 2000 })
        }

    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px' }} onClick={() => setOpen(true)}>Đổi mật khẩu</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false), setTouched(false) }} >
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Cập nhật mật khẩu</DialogTitle>
                <DialogContent fullWidth>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField variant='filled' fullWidth label='Nhập mật khẩu cũ' size='small' type='password' value={old_password}
                            error={touched && !old_password}
                            helperText={touched && !old_password ? 'Không được để trống' : ''}
                            onChange={(e) => setOld_password(e.target.value)}
                            onBlur={() => setTouched(true)} />
                        <TextField variant='filled' fullWidth label='Nhập mật khẩu mới' size='small'
                            type='password' value={new_password}
                            error={touched && old_password == new_password}
                            helperText={touched && old_password == new_password ? 'Trùng mật khẩu cũ' : ''}
                            onChange={e => setNew_password(e.target.value)}
                            onBlur={() => setTouched(true)} />
                        <TextField variant='filled' fullWidth label='Xác nhận mật khẩu' size='small'
                            type='password' value={re_password}
                            error={new_password !== re_password}
                            helperText={new_password !== re_password ? 'Mật khẩu không khớp!' : ''}
                            onChange={e => setRe_password(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleUpdate} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}

export default UpdatePassword