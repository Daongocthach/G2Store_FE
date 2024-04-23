import { useState, useEffect } from 'react'
import { Typography, Box, Input, Button, Paper } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import authenApi from '../../apis/authenApi'
import avatarNull from '../../assets/img/avatar.png'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import Loading from '../../components/Loading/Loading'
import DialogUpdate from '../../components/ShowDialog/DialogUpdate'
import DialogUpdatePassword from '../../components/ShowDialog/DialogUpdatePassword'
import DialogUpdateEmail from '../../components/ShowDialog/DialogUpdateEmail'
import DialogUpdatePhoneNo from '../../components/ShowDialog/DialogUpdatePhoneNo'
import UpdateShop from './UpdateShop/UpdateShop'

function Profile() {
  const dispatch = useDispatch()
  const [reRender, setReRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [seller, setSeller] = useState({})
  const [fullName, setFullName] = useState(seller?.full_name)
  const [avatar, setAvatar] = useState(seller?.avatar)
  const [shop, setShop] = useState({})

  useEffect(() => {
    authenApi.me()
      .then((response) => {
        setSeller({
          email: response?.email,
          phoneNo: response?.phone_no,
          full_name: response?.full_name
        })
        console.log(response?.shop)
        setShop({
          shopId: response?.shop?.shopId,
          image: response?.shop?.image,
          name: response?.shop?.name,
          province: response?.shop?.province,
          district: response?.shop?.district,
          districtId: response?.shop?.districtId,
          ward: response?.shop?.ward,
          street: response?.shop?.street
        })
      })
      .catch((error) => console.log(error))
  }, [reRender])
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
    // if (!email || !fullName || !dob || !phoneNo) {
    //   setShowAlertFail(true)
    // }
    // else {
    //   setLoading(true)
    //   try {
    //     const response = await authenApi.updateProfile({ avatar, dob, email, fullName, phoneNo })
    //     seller(response)
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

  return (
    <Paper sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', m: 2, p: 2, minHeight: '100vh' }} variant='outlined' >
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' sx={useStyles.inputTitle}>Thông tin người bán</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Email:</Typography>
          <Input placeholder='Email' sx={useStyles.input} value={seller?.email ? seller?.email : ''} readOnly />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và Tên:</Typography>
          <Input placeholder='Nhập họ và tên' sx={useStyles.input} value={fullName} onChange={e => setFullName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Điện thoại:</Typography>
          <Input placeholder='Điện thoại' sx={useStyles.input} value={seller?.phone_no ? seller?.phone_no : ''} readOnly />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 1 }}>
          <Button component="label" htmlFor="upload-image" variant="contained" color="warning" sx={useStyles.button} >
            <AddCircle sx={{ mr: 1 }} />
            Ảnh đại diện
            <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </Button>
          <img src={avatar || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
          <DialogUpdate handle={handleUpdate} />
          <DialogUpdatePassword />
          <DialogUpdatePhoneNo />
          <DialogUpdateEmail />
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' sx={useStyles.inputTitle}>Thông tin shop</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Shop id:</Typography>
          <Input sx={useStyles.input} value={shop?.shopId} readOnly />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Tên shop:</Typography>
          <Input placeholder='Nhập tên shop' sx={useStyles.input} value={shop?.name} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Địa chỉ:</Typography>
          <Input readOnly placeholder='Địa chỉ' sx={useStyles.input} value={shop?.province ? (shop?.street + ', ' + shop?.ward + ', ' + shop?.district + ', ' + shop?.province) : ''} />
        </Box>
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Ảnh shop</Typography>
          <img src={shop?.image || avatarNull} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
        </Box>
        <UpdateShop rerender={reRender} setRerender={setReRender} shop={shop}/>
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
    fontWeight: 'bold', minWidth: '90px', color: '#4F4F4F'
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