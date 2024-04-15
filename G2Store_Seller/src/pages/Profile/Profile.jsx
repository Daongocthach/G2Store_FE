import { useState, useEffect } from 'react'
import { Typography, Box, Input, Button, Paper } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import authenApi from '../../apis/authenApi'
import { updateAvatar } from '../../redux/actions/auth'
import avatarNull from '../../assets/img/avatar.png'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import Loading from '../../components/Loading/Loading'
import DialogUpdate from '../../components/ShowDialog/DialogUpdate'
import DialogUpdatePassword from '../../components/ShowDialog/DialogUpdatePassword'

function Profile() {
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [email, setEmail] = useState(user?.email)
  const [dob, setDob] = useState(user?.dob)
  const [fullName, setFullName] = useState(user?.full_name)
  const [phoneNo, setPhoneNo] = useState(user?.phone_no)
  const [avatar, setAvatar] = useState(user?.avatar)

  const setUserData = (user) => {
    setEmail(user?.email)
    setDob(user?.dob)
    setFullName(user?.full_name)
    setPhoneNo(user?.phone_no)
    setAvatar(user?.avatar)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleUpdate = async () => {
    console.log(email, phoneNo, fullName)
    // if (!email || !fullName || !dob || !phoneNo) {
    //   setShowAlertFail(true)
    // }
    // else {
    //   setLoading(true)
    //   try {
    //     const response = await authenApi.updateProfile({ avatar, dob, email, fullName, phoneNo })
    //     setUser(response)
    //     setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //     setShowAlertFail(true)
    //     setLoading(false)
    //   }
    // }
  }
  const handleChangePassword = async () => {
  }
  useEffect(() => {
    authenApi.me()
      .then((response) => {
        setUser(response)
        setUserData(response)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <Paper sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', m: 2, p: 2, minHeight: '100vh' }} variant='outlined' >
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Email:</Typography>
          <Input placeholder='Email' sx={useStyles.input} value={email} onChange={e => setEmail(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và Tên:</Typography>
          <Input placeholder='Nhập họ và tên' sx={useStyles.input} value={fullName} onChange={e => setFullName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Điện thoại:</Typography>
          <Input placeholder='Nhập số điện thoại' sx={useStyles.input} value={phoneNo} onChange={e => setPhoneNo(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Ngày sinh:</Typography>
          <Input fullWidth size='small' type='date' sx={useStyles.input} placeholder={'Ngày sinh'} value={dob} onChange={(e) => setDob(e.target.value)} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
        <DialogUpdate handle={handleUpdate} />
        <DialogUpdatePassword handle={handleChangePassword} />
        <Button component="label" htmlFor="upload-image" variant="contained" color="success" sx={useStyles.button} >
          <AddCircle />
          Ảnh đại diện
          <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </Button>
        <img src={avatar || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Vui lòng kiểm tra lại thông tin!'} isFail={true} />
      {loading && <Loading />}
    </Paper>
  )
}

export default Profile

const useStyles = {
  inputTitle: {
    fontWeight: 'bold', minWidth: '100px', color: '#4F4F4F'
  },
  input: {
    minWidth: { xs: 200, md: 500 },
    fontSize: 15,
    bgcolor: '#e8f0fe'
  },
  button: {
    color: 'white', fontWeight: 'bold', height: '40px', borderRadius: 2
  }
}