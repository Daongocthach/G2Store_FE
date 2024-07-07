import { useState, useEffect } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import authenApi from '../../../apis/authenApi'
import { validateEmail } from '../../../utils/email'
import Loading from '../../../components/Loading/Loading'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import { mockData } from '../../../apis/mockdata'

function ResetPassword() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [otp, setOTP] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
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
    if (!validateEmail(email)) {
      triggerAlert('Email không đúng định dạng!', false, true)
    }
    else if (countdown > 0) {
      triggerAlert('Vui lòng chờ hết đếm ngược!', false, true)
    }
    else {
      setLoading(true)
      authenApi.forgotPassword(email)
        .then(() => {
          triggerAlert('Đã gửi email chưa OTP! Vui lòng kiểm tra hộp thư của bạn', false, false)
          setShowOTP(true)
          setCountdown(60)
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
    authenApi.resetPassword(otp, newPassword)
      .then(() => {
        triggerAlert('Đổi mật khẩu thành công', false, false)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        setLoading(false)
      })
      .catch(() => {
        triggerAlert('Đổi mật khẩu thất bại!', true, false)
      })
      .finally(() => setLoading(false))
  }
  return (
    <Container disableGutters maxWidth={false} className="h-screen">
      <Box className="w-full h-full overflow-hidden relative bg-black">
        <img src={mockData.images.loginImage} className="w-full h-full object-cover opacity-50" />
        <Box className="absolute w-11/12 sm:w-3/4 md:w-1/3 h-auto rounded-md top-1/3 left-1/2 bg-black opacity-80 transform -translate-x-1/2 -translate-y-1/3 p-8">
          <h2 className="text-center text-white">Đặt lại mật khẩu</h2>
          <Stack component="form" className="m-3 space-y-4">
            {!showOTP && (
              <TextField
                placeholder="Nhập email"
                variant="filled"
                size="small"
                type="email"
                error={!validateEmail(email)}
                helperText={validateEmail(email) ? '' : 'Email không đúng định dạng!'}
                className="bg-white rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            {showOTP && (
              <TextField
                placeholder="Nhập OTP"
                variant="filled"
                size="small"
                type="text"
                className="bg-white rounded-md"
                onChange={(e) => setOTP(e.target.value)}
              />
            )}
            {showOTP && (
              <TextField
                placeholder="Nhập mật khẩu mới"
                variant="filled"
                size="small"
                type="password"
                className="bg-white rounded-md"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            )}
            {!showOTP && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleShowOTP()}
              >
                Nhận OTP qua email
              </Button>
            )}
            {showOTP && (
              <Button
                variant="contained"
                color="error"
                onClick={() => onFinish()}
              >
                Xác nhận
              </Button>
            )}
            {!showOTP && (
              <Button
                variant="contained"
                color="warning"
                onClick={() => { setShowOTP(true) }}
              >
                Đã gửi? Xác nhận OTP
              </Button>
            )}
            {showOTP && (
              <Button
                variant="contained"
                color="warning"
                onClick={() => {handleShowOTP() }}
              >
                {`Gửi lại OTP (${countdown}s)`}
              </Button>
            )}
            <Box className="flex items-center justify-between">
              <Link to="/register" className="text-white">
                Đăng ký?
              </Link>
              <Link to="/login" className="text-white">
                Đăng nhập?
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container>

  )
}

export default ResetPassword