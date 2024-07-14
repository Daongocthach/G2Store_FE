import { useState } from 'react'
import { TextField, Box, Dialog, DialogTitle, Button, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import authenApi from '../../../apis/authenApi'
import DialogAction from '../../../components/Dialog/DialogAction'

function UpdateName({ fullNameRoot, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const handleOpen = () => {
        setOpen(true)
        setName(fullNameRoot)
    }
    const handleUpdateName = async () => {
        if (name) {
            authenApi.updateName(name)
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
            toast.error('Họ và tên không được để trống', { position: 'top-center', autoClose: 2000 })
        }
    }
    return (
        <Box>
            <Button sx={{ color: 'white', fontWeight: 'bold', height: '40px' }} onClick={handleOpen}>Đổi họ và tên</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Cập nhật họ và tên</DialogTitle>
                <DialogContent>
                    <TextField variant='filled' fullWidth label='Họ và tên' size='small' type='text' value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleUpdateName} />
            </Dialog>
        </Box>
    )
}

export default UpdateName