import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, TextField, Stack, Button, Box, Alert, Snackbar, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie } from '../../../utils/cookie'
import authenApi from '../../../apis/authenApi'
import loginImage from '../../../assets/img/loginImage.jpg'
import { login } from '../../../redux/actions/auth'
import { setCart } from '../../../redux/actions/cart'
import cartItemApi from '../../../apis/cartItemApi'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = () => {
    if (email !== '' && password !== '') {
      setLoading(true)
      authenApi.login(email, password)
        .then(response => {
          setShowAlert(true)
          setCookie('token', response.data.token, 1)
          // cartItemApi.getCartItemsByCustomerId(response.data.id)
          //   .then(response => { dispatch(setCart(response.data)) })
          setTimeout(() => {
            navigate('/')
          }, 1000)
        })
        .catch(error => {
          console.log(error)
          setShowAlertFail(true)
        }).finally(() => {
          setLoading(false)
        })
    }
    else {
      setShowAlertFail(true)
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
              <Link to={'/register'} style={{ color: 'white' }}>Đăng ký ?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
        <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showAlertFail} autoHideDuration={1000} onClose={() => setShowAlertFail(false)}>
        <Alert severity="error" variant='filled' onClose={() => setShowAlertFail(false)}>
          Sai tên đăng nhập hoặc mật khẩu!
        </Alert>
      </Snackbar>
      {loading && (
        <Box sx={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Container>
  )
}

export default Login