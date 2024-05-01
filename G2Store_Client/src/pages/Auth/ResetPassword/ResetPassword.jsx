import { useState } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertWarning, setShowAlertWarning] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const handleShowOTP = async () => {
    setLoading(true)
    if (!validateEmail(email)) {
      setShowAlertWarning(true)
      setLoading(false)
    }
    else {
      setTimeout(() => {
        setShowAlert(true)
        setShowOTP(true)
        setLoading(false)
      }, 1000)
    }

  }
  const onFinish = () => {
    setLoading(true)
    if (newPassword && otp) {
      setTimeout(() => {
        setShowAlertSuccess(true)
        navigate('/login')
        setLoading(false)
      }, 1000)

    }
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
          <Stack component="form" sx={{ m: 3 }} spacing={4} >
            {showOTP && <TextField placeholder='Nhập OTP' variant="filled" size="small" type='text'
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setOTP(e.target.value)}
            />}
            {showOTP && <TextField placeholder='Nhập mật khẩu mới' variant="filled" size="small" type='password'
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setNewPassword(e.target.value)}
            />}
            {!showOTP && <TextField placeholder='Nhập email' variant="filled" size="small" type='email'
              error={!validateEmail(email)} helperText={validateEmail(email) ? '' : 'Email không đúng định dạng!'}
              sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={e => setEmail(e.target.value)}
            />}
            {!showOTP ? <Button sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} onClick={() => handleShowOTP()}>Nhận OTP qua email</Button>
              : <Button sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }} onClick={() => onFinish()}>Xác nhận</Button>}
          </Stack>
        </Box>
      </Box>
      {loading && <Loading/>}
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đã gửi OTP'} />
      <ShowAlert showAlert={showAlertSuccess} setShowAlert={setShowAlertSuccess} content={'Đổi mật khẩu thành công'} />
      <ShowAlert showAlert={showAlertWarning} setShowAlert={setShowAlertWarning} content={'Email không đúng định dạng!'} isWarning={true} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đổi mật khẩu thất bại'} isFail={true} />
    </Container>
  )
}

export default ResetPassword