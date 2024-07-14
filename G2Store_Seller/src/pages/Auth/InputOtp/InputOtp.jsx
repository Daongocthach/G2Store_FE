import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container, Typography } from '@mui/material'
import authenApi from '../../../apis/authenApi'
import Loading from '../../../components/Loading/Loading'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import { mockData } from '../../../apis/mockdata'

function InputOtp() {
    const triggerAlert = useAlert()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOTP] = useState('')
    const onFinish = async () => {
        setLoading(true)
        authenApi.activeAccount(otp)
            .then(() => {
                triggerAlert('Xác thực thành công!', false, false)
                navigate('/')
                setLoading(false)
            })
            .catch(() => {
                triggerAlert('Xác thực thất bại!', true, false)
            })
            .finally(() => setLoading(false))
    }
    return (
        <Container disableGutters maxWidth={false} className="h-screen">
            <Box className="w-full h-full overflow-hidden relative bg-black">
                <img src={mockData.images.loginImage} className="w-full h-full object-cover opacity-50 blur-sm" />
                <Box className="absolute w-[90%] sm:w-[70%] md:w-[30%] h-auto rounded-md top-[30%] left-1/2 bg-black opacity-80 transform -translate-x-1/2 -translate-y-1/3 p-8">
                    <Typography variant='h6' className="text-center text-white font-bold">Đăng ký</Typography>
                    <Stack className="mt-6">
                        <Box className="flex flex-col gap-2 w-full">
                            <TextField placeholder="Nhập OTP" variant="filled" size="small" type="text" className="bg-white rounded-md"
                                onChange={e => setOTP(e.target.value)} />
                            <Button variant="contained" color="warning" onClick={() => onFinish()} >Xác nhận OTP</Button>
                        </Box>
                        <Box className="flex flex-row items-center justify-between mt-2">
                            <Link to={'/register'} className='text-white'>Đăng ký?</Link>
                            <Link to="/" className="text-white">Đăng nhập?</Link>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            {loading && <Loading />}
        </Container >
    )
}

export default InputOtp