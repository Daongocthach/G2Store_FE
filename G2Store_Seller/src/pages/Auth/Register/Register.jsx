import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container, Typography } from '@mui/material'
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
  const recaptchaRef = useRef(null)
  const [captcha, setCaptCha] = useState(null)
  const [otp, setOTP] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
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
    <Container disableGutters maxWidth={false} className="h-screen">
      <Box className="w-full h-full overflow-hidden relative bg-black">
        <img src={loginImage} className="w-full h-full object-cover opacity-50 blur-sm" />
        <Box className="absolute w-[90%] sm:w-[70%] md:w-[30%] h-auto rounded-md top-[30%] left-1/2 bg-black opacity-80 transform -translate-x-1/2 -translate-y-1/3 p-8">
          <Typography variant='h6' className="text-center text-white font-bold">Đăng ký</Typography>
          <Stack className="mt-6">
            {!showOTP ?
              <Box className="flex flex-col gap-2 w-full">
                <TextField variant="filled" size="small"
                  placeholder="Email" className="bg-white rounded-md" onChange={e => setEmail(e.target.value)}
                  error={!validateEmail(email)} helperText={validateEmail(email) ? '' : 'Email không đúng định dạng'}
                />
                <TextField placeholder="Mật khẩu" variant="filled" size="small" type="password" className="bg-white rounded-md"
                  onChange={e => setPassword(e.target.value)}
                />
                <TextField placeholder="Nhập lại mật khẩu" variant="filled" size="small" type="password" className="bg-white rounded-md"
                  onChange={e => setRepeatPassword(e.target.value)} error={password !== repeatPassword}
                  helperText={password !== repeatPassword ? 'Password không trùng khớp' : ''}
                />
                <ReCAPTCHA sitekey={siteKey} type="image" onChange={val => setCaptCha(val)} ref={recaptchaRef} hidden={showOTP ? true : false} />
                <Button variant="contained" color="error" onClick={() => (countdown > 0 ? null : handleShowOTP())}>
                  {'Nhận OTP xác thực qua email' + (countdown > 0 ? `(${countdown}s)` : '')}
                </Button>
                <Button variant="contained" color="warning" onClick={() => setShowOTP(true)}>Đã gửi? Xác nhận OTP</Button>
              </Box>
              :
              <Box className="flex flex-col gap-2 w-full">
                <TextField placeholder="Nhập OTP" variant="filled" size="small" type="text" className="bg-white rounded-md"
                  onChange={e => setOTP(e.target.value)} />
                <Button variant="contained" color="warning" onClick={() => onFinish()} >Đăng ký</Button>
                <Button variant="contained" color="error" onClick={() => setShowOTP(false)}>Quay lại</Button>
              </Box>
            }
            <Box className="flex flex-row items-center justify-between mt-2">
              <Link to={'/reset-password'} className='text-white'>Quên mật khẩu?</Link>
              <Link to="/" className="text-white">Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {loading && <Loading />}
    </Container >
  )
}

export default Register