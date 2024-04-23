import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import loginImage from '../../../assets/img/loginImage.jpg'
import { validateEmail } from '../../../utils/email'
import { setCookie } from '../../../utils/cookie'
import authenApi from '../../../apis/authenApi'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'
import { login } from '../../../redux/actions/auth'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')


  const onFinish = async () => {
    setLoading(true)
    try {
      if (!validateEmail(email) || password !== repeatPassword) {
        setShowAlertFail(true)
      }
      else {
        const response = await authenApi.register({ email, password })
        if (response) {
          setShowAlert(true)
          localStorage.setItem('atk', response?.access_token)
          localStorage.setItem('rtk', response?.refresh_token)
          dispatch(login(response?.access_token))
          setTimeout(() => {
            navigate('/seller/dashboard')
          }, 1000)
          setLoading(false)
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setShowAlertFail(true)
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
          position: 'absolute',
          width: { xs: '90%', sm: '70%', md: '30%' },
          height: 'auto',
          borderRadius: '5px',
          top: '30%',
          left: '50%',
          bgcolor: 'black',
          opacity: 0.8,
          transform: 'translate(-50%, -30%)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Đăng ký</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="input-email"
              variant="filled"
              size="small"
              placeholder='Email'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
              error={!validateEmail(email)}
              helperText={validateEmail(email) ? '' : 'Email không đúng định dạng'}
            />
            <TextField
              id="input-password"
              placeholder='Mật khẩu'
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              id="input-repeatpassword"
              placeholder="Nhập lại mật khẩu"
              variant="filled"
              size="small"
              type='password'
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setRepeatPassword(e.target.value)}
              error={password !== repeatPassword}
              helperText={password !== repeatPassword ? 'Password không trùng khớp' : ''}
            />
            <Button sx={{ bgcolor: 'red', borderRadius: '5px', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'brown' } }}
              onClick={onFinish}>Đăng ký
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/'} style={{ color: 'white' }}>Về trang chủ ?</Link>
              <Link to={'/login'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đăng ký thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Đăng ký thất bại'} isFail={true} />
      {loading && <Loading />}
    </Container>
  )
}

export default Register