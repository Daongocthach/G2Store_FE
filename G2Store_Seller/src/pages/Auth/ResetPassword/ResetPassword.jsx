import { useState } from 'react'
import { Container, TextField, Stack, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import loginImage from '../../../assets/img/loginImage.jpg'
import authenApi from '../../../apis/authenApi'
import { validateEmail } from '../../../utils/email'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const onFinish = () => {
    if (!validateEmail(email)) {
      setShowAlertFail(true)
    }
    else {
      authenApi.forgotPassword(email)
      setShowAlert(true)
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
              sx={{ bgcolor: 'red', color: 'white', fontWeight: 'bold', ':hover':{ bgcolor:'red' } }}
              onClick={() => onFinish()}
            >Nhận password mới qua email</Button>
          </Stack>
        </Box>
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Gửi mail mật khẩu mới thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Vui lòng kiểm tra lại thông tin'} isFail={true} />
    </Container>
  )
}

export default ResetPassword