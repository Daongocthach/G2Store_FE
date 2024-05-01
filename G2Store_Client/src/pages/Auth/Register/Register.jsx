import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'
import authenApi from '../../../apis/authenApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const siteKey = import.meta.env.VITE_SITE_KEY
  const [captcha, setCaptCha] = useState(null)
  const [otp, setOTP] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertOTP, setShowAlertOTP] = useState(false)
  const [showAlertWarning, setShowAlertWarning] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleShowOTP = async () => {
    setLoading(true)
    if (!validateEmail(email) || password !== repeatPassword || !captcha) {
      setShowAlertWarning(true)
      setLoading(false)
    } else {
      console.log(captcha)
      authenApi.register(captcha, email, password)
        .then(() => {
          setShowAlertOTP(true)
          setShowOTP(true)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setShowAlertFail(true)
        })
        .finally(() => setLoading(false))
    }
  }
  const onFinish = async () => {
    setLoading(true)
    console.log(otp)
    authenApi.activeAccount(otp)
      .then(() => {
        setShowAlert(true)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        setLoading(false)
      })
      .catch(() => {
        setShowAlertFail(true)
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
              <Link to={'/'} style={{ color: 'white' }}>Về trang chủ ?</Link>
              <Link to={'/login'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đăng ký thành công'} />
      <ShowAlert showAlert={showAlertOTP} setShowAlert={setShowAlertOTP} content={'Gửi thành công, Vui lòng kiểm tra email của bạn!'} />
      <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Vui lòng điền đây đủ thông tin'} isWarning={true} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đăng ký thất bại'} isFail={true} />
      {loading && <Loading />}
    </Container>
  )
}

export default Register