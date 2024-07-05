import { useState } from 'react'
import { TextField, Box, Dialog, DialogTitle, Button, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import DialogAction from '../../../../components/Dialog/DialogAction'
import authenApi from '../../../../apis/authenApi'

function UpdateDobAndName({ fullNameRoot, dobRoot, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const [full_name, setFullName] = useState('')
    const [dob, setDob] = useState(null)
    const handleOpen = () => {
        setOpen(true)
        setFullName(fullNameRoot)
        setDob(dayjs(dobRoot))
    }
    const handleUpdate = async () => {
        if (!dob || !full_name) {
            toast.error('Ngày sinh hoặc tên đăng nhập không được để trống', { position: 'top-center', autoClose: 2000 })
        }
        else {
            const formattedDob = dob.format('YYYY-MM-DDTHH:mm')
            authenApi.updateProfile({ dob: formattedDob, full_name })
                .then(() => {
                    toast.success('Cập nhật thành công', { position: 'top-center', autoClose: 2000 })
                    setReRender(!reRender)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Cập nhật thất bại', { position: 'top-center', autoClose: 2000 })
                })
                .finally(() => {
                    setOpen(false)
                })
        }
    }
    return (
        <Box>
            <Button sx={{ fontWeight: 'bold', height: 40 }} size='medium' fullWidth
                variant="contained" color="success" onClick={handleOpen}>Cập nhật tên và ngày sinh</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Cập nhật email</DialogTitle>
                <DialogContent>
                    <Box className='flex-col bg-sky-50'>
                        <TextField id="full_name" variant='filled' name="full_name" fullWidth size='small' label='Nhập họ và tên'
                            value={full_name} onChange={(e) => setFullName(e.target.value)} focused color='info'
                            className='text-sm  text-gray-600' />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{
                                    openPickerIcon: { fontSize: 'small' },
                                    openPickerButton: { color: 'inherit' },
                                    textField: {
                                        variant: 'filled',
                                        focused: true,
                                        color: 'primary',
                                        fullWidth: true
                                    }
                                }}
                                value={dob}
                                onChange={(newValue) => setDob(newValue)}
                                label='Nhập ngày sinh'
                                referenceDate={dayjs('2002-05-07T15:30')}
                            />
                        </LocalizationProvider>
                        {/* <TextField fullWidth size='small' type='datetime-local'
                            onChange={(e) => console.log(e.target.value)} /> */}
                    </Box>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleUpdate} />
            </Dialog>
        </Box>
    )
}

export default UpdateDobAndName