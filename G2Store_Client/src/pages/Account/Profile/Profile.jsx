import { useState, useEffect } from 'react'
import { Typography, Box, Input, Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import authenApi from '../../../apis/authenApi'
import { updateAvatar } from '../../../redux/actions/auth'
import avatarNull from '../../../assets/img/avatar.png'
import ShowAlert from '../../../components/ShowAlert/ShowAlert'
import Loading from '../../../components/Loading/Loading'
import DialogUpdate from '../../../components/ShowDialog/DialogUpdate'
import DialogUpdatePassword from '../../../components/ShowDialog/DialogUpdatePassword'
import DialogUpdatePhoneNo from '../../../components/ShowDialog/DialogUpdatePhoneNo'
import DialogUpdateEmail from '../../../components/ShowDialog/DialogUpdateEmail'

function Profile() {
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState(user?.avatar)

  useEffect(() => {
    authenApi.me()
      .then((response) => {
        setUser({
          email: response?.email,
          phoneNo: response?.phone_no,
          full_name: response?.full_name,
          dob: response?.dob,
          point: response?.point
        })
      })
      .catch((error) => console.log(error))
  }, [])

  const formik = useFormik({
    initialValues: {
      full_name: user?.full_name ? user.full_name : '',
      dob: user?.dob ? user.dob : ''
    },
    enableReinitialize: true
  })

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
    const { full_name, dob } = formik.values
    if (!dob || !full_name) {
      console.log(dob, full_name)
      setShowAlertFail(true)
    }
    else {
      setLoading(true)
      try {
        authenApi.updateProfile({ avatar, dob, full_name })
        setLoading(false)
        setShowAlert(true)
      } catch (error) {
        console.log(error)
        setShowAlertFail(true)
        setLoading(false)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Email:</Typography>
          <Input placeholder='Email' readOnly sx={useStyles.input} value={user?.email ? user?.email : ''} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Điện thoại:</Typography>
          <Input placeholder='Nhập số điện thoại' readOnly sx={useStyles.input} value={user?.phoneNo ? user?.phoneNo : ''} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và Tên:</Typography>
          <Input id="full_name" name="full_name" placeholder='Nhập họ và tên' sx={useStyles.input} value={formik.values.full_name}
            onChange={formik.handleChange} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Ngày sinh:</Typography>
          <Input id="dob" name="dob" fullWidth size='small' type='date' sx={useStyles.input} placeholder={'Ngày sinh'} value={formik.values.dob}
            onChange={formik.handleChange} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1 }}>
          <Button component="label" htmlFor="upload-image" variant="contained" color="warning" sx={useStyles.button} >
            <AddCircle sx={{ mr: 1 }} />
            Ảnh đại diện
            <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </Button>
          <img src={avatar || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
        <DialogUpdate handle={handleUpdate} />
        <DialogUpdatePassword />
        <DialogUpdatePhoneNo />
        <DialogUpdateEmail />
      </Box>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật thành công'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Vui lòng kiểm tra lại thông tin!'} isFail={true} />
      {loading && <Loading />}
    </Box>
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