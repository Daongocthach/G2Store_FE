import { useState } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import loginImage from '../../../assets/img/loginImage.jpg'
import authenApi from '../../../apis/authenApi'
import Loading from '../../../components/Loading/Loading'
import { login, updateProfile } from '../../../redux/actions/auth'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
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
        if (response) {
          triggerAlert('Đăng nhập thành công!', false, false)
          localStorage.setItem('atk', response?.access_token)
          localStorage.setItem('rtk', response?.refresh_token)
          dispatch(login())
          authenApi.me()
            .then((response) => {
              const data = {
                shop_name: response?.shop?.name,
                avatar: response?.avatar,
                shop_id: response?.shop?.shop_id
              }
              dispatch(updateProfile(data))
            })
          navigate('/seller/dashboard')
          setLoading(false)
        }
        else {
          console.log(response)
          triggerAlert('Đăng nhập thất bại!', true, false)
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      triggerAlert('Đăng nhập thất bại!', true, false)
      console.log(error)
    }
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'black'
      }}>
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, filter: 'blur(1px)' }} />
        <Box sx={{
          position: 'absolute', width: { xs: '90%', sm: '70%', md: '30%' }, height: 'auto', borderRadius: '5px', top: '30%',
          left: '50%', bgcolor: 'black', opacity: 0.8, transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Đăng nhập</h2>
          <Stack component="form" sx={{ m: 3 }} spacing={4}>
            <TextField placeholder='Email' variant="filled" size="small" sx={{ bgcolor: 'white', borderRadius: 3 }} onChange={e => setEmail(e.target.value)} />
            <TextField placeholder='Mật khẩu' variant="filled" size="small" sx={{ bgcolor: 'white', borderRadius: 3 }} type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold' }}
              onClick={() => onFinish()}
            >Đăng nhập</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/reset-password'} style={{ color: 'white' }}>Quên mật khẩu?</Link>
              <Link to={'/register'} style={{ color: 'white' }}>Đăng ký?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>
  )
}

export default Login