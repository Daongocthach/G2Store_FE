import { useState } from 'react'
import { TextField, Box, Dialog, DialogTitle, Button, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import authenApi from '../../../../apis/authenApi'
import DialogAction from '../../../../components/Dialog/DialogAction'
import Loading from '../../../../components/Loading/Loading'

function UpdatePhoneNo({ reRender, setReRender }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [new_phone_no, setPhoneNo] = useState('')
    const [touched, setTouched] = useState(false)

    const handleUpdatePhoneNo = async () => {
        if (new_phone_no) {
            setLoading(true)
            authenApi.updatePhone({ new_phone_no })
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
            toast.error('Số điện thoại không được để trống', { position: 'top-center', autoClose: 2000 })
        }

    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px' }} onClick={() => setOpen(true)}>Đổi số điện thoại</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false), setTouched(false) }} >
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Cập nhật số điện thoại</DialogTitle>
                <DialogContent>
                    <TextField variant='filled' className='w-full' label='Số điện thoại' size='small' type='text' value={new_phone_no}
                        error={touched && !new_phone_no}
                        helperText={touched && !new_phone_no ? 'Không được để trống' : ''}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        onBlur={() => setTouched(true)} />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleUpdatePhoneNo} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}

export default UpdatePhoneNo