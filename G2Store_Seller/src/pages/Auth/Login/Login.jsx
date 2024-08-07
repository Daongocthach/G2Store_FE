import { useState, useEffect } from 'react'
import { Container, TextField, Stack, Button, Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import authenApi from '../../../apis/authenApi'
import Loading from '../../../components/Loading/Loading'
import { login, updateProfile, updateShopImage, updateShopName } from '../../../redux/actions/auth'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import { mockData } from '../../../apis/mockdata'

function Login() {
  const triggerAlert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = async () => {
    setLoading(true)
    try {
      if (email !== '' && password !== '') {
        const response = await authenApi.login({ email, password })
        triggerAlert('Đăng nhập thành công!', false, false)
        localStorage.setItem('atk', response?.access_token)
        localStorage.setItem('rtk', response?.refresh_token)
        dispatch(login())
        authenApi.me()
          .then((response) => {
            dispatch(updateProfile(response?.shop?.shop_id))
            dispatch(updateShopImage(response?.shop?.image))
            dispatch(updateShopName(response?.shop?.name))
          })
        navigate('/seller/dashboard')
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error?.response?.data?.code == 1) {
        triggerAlert('Tạo tài khoản thành công vui lòng xác nhận OTP đã gửi qua email!', false, false)
        navigate('/input-otp')
      }
      else {
        triggerAlert('Đăng nhập thất bại!', true, false)
      }
    }
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onFinish()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [email, password])
  return (
    <Container disableGutters maxWidth={false} className="h-screen">
      <Box className="w-full h-full overflow-hidden relative bg-black">
        <img src={mockData.images.loginImage} className="w-full h-full object-cover opacity-50" />
        <Box className="absolute w-[90%] sm:w-[70%] md:w-[30%] h-auto rounded-md top-1/3 left-1/2
        bg-black opacity-80 transform -translate-x-1/2 -translate-y-1/3 p-8">
          <Typography variant='h6' className="text-center text-white font-bold">Đăng nhập</Typography>
          <Stack component="form" className="mt-6 space-y-4">
            <TextField variant="filled" size="small" value={email}
              placeholder="Email" className="bg-white rounded-md" onChange={e => setEmail(e.target.value)}
              error={validator.isEmail(email)} helperText={validator.isEmail(email) ? '' : 'Email không đúng định dạng'}
            />
            <TextField
              placeholder='Mật khẩu'
              variant="filled"
              size="small"
              className="bg-white rounded-md"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button variant='contained' color='warning' onClick={() => onFinish()} >
              Đăng nhập
            </Button>
            <Box className="flex flex-row items-center justify-between">
              <Link to={'/reset-password'} className='text-white'>Quên mật khẩu?</Link>
              <Link to={'/register'} className='text-white'>Đăng ký?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>
  )
}

export default Login