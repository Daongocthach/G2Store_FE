import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'
import authenApi from '../../../apis/authenApi'
import Loading from '../../../components/Loading/Loading'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

function Register() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const siteKey = import.meta.env.VITE_SITE_KEY
  const [captcha, setCaptCha] = useState(null)
  const [otp, setOTP] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleShowOTP = async () => {
    setLoading(true)
    if (!validateEmail(email) || password !== repeatPassword || !captcha) {
      triggerAlert('Vui lòng điền đây đủ thông tin!', false, true)
      setLoading(false)
    } else {
      authenApi.register(captcha, email, password)
        .then(() => {
          triggerAlert('Gửi thành công, Vui lòng kiểm tra email của bạn!', false, false)
          setShowOTP(true)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          triggerAlert('Gửi OTP thất bại!', true, false)
        })
        .finally(() => setLoading(false))
    }
  }
  const onFinish = async () => {
    setLoading(true)
    authenApi.activeAccount(otp)
      .then(() => {
        triggerAlert('Đăng ký thành công!', false, false)
        navigate('/')
        setLoading(false)
      })
      .catch(() => {
        triggerAlert('Đăng ký thất bại!', true, false)
      })
      .finally(() => setLoading(false))
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', bgcolor: 'black' }}>
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, filter: 'blur(1px)' }} />
        <Box sx={{
          position: 'absolute', width: { xs: '90%', sm: '70%', md: '30%' }, height: 'auto', borderRadius: '5px',
          top: '30%', left: '50%', bgcolor: 'black', opacity: 0.8, transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Đăng ký</h2>
          <Stack component="form" sx={{ m: 3 }} spacing={4} >
            {!showOTP && <TextField variant="filled" size="small" placeholder='Email' sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)} error={!validateEmail(email)} helperText={validateEmail(email) ? '' : 'Email không đúng định dạng'}
            />}
            {!showOTP && <TextField placeholder='Mật khẩu' variant="filled" size="small" type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }} onChange={e => setPassword(e.target.value)}
            />}
            {!showOTP && <TextField placeholder="Nhập lại mật khẩu" variant="filled" size="small" type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }} onChange={e => setRepeatPassword(e.target.value)}
              error={password !== repeatPassword} helperText={password !== repeatPassword ? 'Password không trùng khớp' : ''}
            />}
            {showOTP && <TextField placeholder='Nhập OTP' variant="filled" size="small" type='text'
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setOTP(e.target.value)}
            />}
            {!showOTP &&
              <ReCAPTCHA sitekey={siteKey} type='image' onChange={(val) => setCaptCha(val)} />
            }
            {!showOTP ? <Button sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} onClick={() => handleShowOTP()}>Nhận OTP qua email</Button>
              : <Button sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} onClick={() => onFinish()}>Đăng ký</Button>}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/reset-password'} style={{ color: 'white' }}>Quên mật khẩu?</Link>
              <Link to={'/'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>
  )
}

export default Register