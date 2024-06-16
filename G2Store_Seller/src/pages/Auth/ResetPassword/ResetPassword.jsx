import { useState } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import loginImage from '../../../assets/img/loginImage.jpg'
import authenApi from '../../../apis/authenApi'
import { validateEmail } from '../../../utils/email'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

function ResetPassword() {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const onFinish = () => {
    if (!validateEmail(email)) {
      triggerAlert('Vui lòng kiểm tra lại email!', false, true)

    }
    else {
      authenApi.forgotPassword(email)
      triggerAlert('Gửi thành công, kiểm tra mật khẩu trong mail!', false, false)
      navigate('/login')
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
        <img src={loginImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
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
          <h2 style={{ textAlign: 'center', color: 'white' }}>Quên mật khẩu</h2>
          <Stack
            component="form"
            sx={{ m: 3 }}
            spacing={4}
          >
            <TextField
              id="filled-hidden-label-small"
              placeholder='Nhập Email'
              variant="filled"
              size="small"
              sx={{ bgcolor: 'white', borderRadius: 3 }}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'red' } }}
              onClick={() => onFinish()}
            >Nhận password mới qua email</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={'/reset-password'} style={{ color: 'white' }}>Đăng ký?</Link>
              <Link to={'/'} style={{ color: 'white' }}>Đăng nhập?</Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPassword