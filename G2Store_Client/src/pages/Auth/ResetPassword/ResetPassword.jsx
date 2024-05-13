import { useState, useEffect } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import loginImage from '../../../assets/img/loginImage.jpg'
import authenApi from '../../../apis/authenApi'
import { validateEmail } from '../../../utils/email'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [otp, setOTP] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [showAlertOTP, setShowAlertOTP] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertWarning, setShowAlertWarning] = useState(false)
  const [showAlertFailOTP, setShowAlertFailOTP] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleShowOTP = async () => {
    setLoading(true)
    if (!validateEmail(email)) {
      setShowAlertWarning(true)
      setLoading(false)
    }
    else {
      authenApi.forgotPassword(email)
        .then(() => {
          setShowAlertOTP(true)
          setShowOTP(true)
          setCountdown(60)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setShowAlertFailOTP(true)
        })
        .finally(() => setLoading(false))
    }
  }
  const onFinish = async () => {
    setLoading(true)
    authenApi.resetPassword(otp, newPassword)
      .then(() => {
        setShowAlertSuccess(true)
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
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <Box sx={{
          position: 'absolute', width: { xs: '90%', sm: '70%', md: '30%' }, height: 'auto',
          borderRadius: '5px', top: '30%', left: '50%', bgcolor: 'black', opacity: 0.8, transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}> Đặt lại mật khẩu</h2>
          <Stack component="form" sx={{ m: 3 }} spacing={2} >
            {!showOTP && <TextField placeholder='Nhập email' variant="filled" size="small" type='email'
              error={!validateEmail(email)} helperText={validateEmail(email) ? '' : 'Email không đúng định dạng!'}
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setEmail(e.target.value)}
            />}
            {showOTP && <TextField placeholder='Nhập OTP' variant="filled" size="small" type='text'
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setOTP(e.target.value)}
            />}
            {showOTP && <TextField placeholder='Nhập mật khẩu mới' variant="filled" size="small" type='password'
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setNewPassword(e.target.value)}
            />}
            {/**Button */}
            {!showOTP && <Button variant='contained' color='error' sx={{ fontWeight: 'bold', ':hover': { bgcolor: '#444444' } }}
              onClick={() => handleShowOTP()} >
              Nhận OTP qua email
            </Button>}
            {showOTP && <Button variant='contained' color='error' sx={{ fontWeight: 'bold', ':hover': { bgcolor: '#444444' } }} onClick={() => onFinish()} >
              Xác nhận
            </Button>}
            {!showOTP && <Button variant='contained' color='warning' sx={{ fontWeight: 'bold', ':hover': { bgcolor: '#444444' } }}
              onClick={() => { setShowOTP(true) }} >
              Đã gửi? Xác nhận OTP
            </Button>}
            {showOTP && <Button variant='contained' color='warning' sx={{ fontWeight: 'bold', ':hover': { bgcolor: '#444444' } }}
              onClick={() => { countdown > 0 ? null : handleShowOTP() }} >
              {`Gửi lại OTP (${countdown}s)`}
            </Button>}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/register'} style={{ color: 'white' }}>Đăng ký?</Link>
              <Link to={'/login'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
      <ShowAlert showAlert={showAlertOTP} setShowAlert={setShowAlertOTP} content={'Đã gửi OTP'} />
      <ShowAlert showAlert={showAlertFailOTP} setShowAlert={setShowAlertFailOTP} content={'Gửi OTP thất bại!'} isFail={true} />
      <ShowAlert showAlert={showAlertSuccess} setShowAlert={setShowAlertSuccess} content={'Đổi mật khẩu thành công'} />
      <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Email không đúng định dạng!'} isWarning={true} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đổi mật khẩu thất bại'} isFail={true} />
    </Container>
  )
}

export default ResetPassword