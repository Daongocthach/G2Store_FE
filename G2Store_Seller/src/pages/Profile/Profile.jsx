import { useState, useEffect } from 'react'
import { Typography, Box, Input, Paper } from '@mui/material'
import authenApi from '../../apis/authenApi'
import ShowAlert from '../../components/ShowAlert/ShowAlert'
import Loading from '../../components/Loading/Loading'
import DialogUpdate from '../../components/ShowDialog/DialogUpdate'
import DialogUpdatePassword from '../../components/ShowDialog/DialogUpdatePassword'
import DialogUpdateEmail from '../../components/ShowDialog/DialogUpdateEmail'
import DialogUpdatePhoneNo from '../../components/ShowDialog/DialogUpdatePhoneNo'
import UpdateAvatar from './UpdateSeller/UpdateAvatar'

function Profile() {
  const [reRender, setReRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [seller, setSeller] = useState({})
  const [fullName, setFullName] = useState(seller?.full_name)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      authenApi.me()
        .then(async (response) => {
          setSeller({
            email: response?.email,
            phoneNo: response?.phone_no,
            full_name: response?.full_name,
            avatar: response?.avatar
          })
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [reRender])

  const handleUpdate = async () => {

  }

  return (
    <Paper sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', m: 2, p: 2, minHeight: '100vh' }} variant='outlined' >
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' sx={useStyles.inputTitle}>Thông tin người bán</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Email:</Typography>
          <Input placeholder='Email' sx={{ ...useStyles.input, color: 'gray' }} value={seller?.email ? seller?.email : ''} readOnly />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Điện thoại:</Typography>
          <Input placeholder='Điện thoại' sx={{ ...useStyles.input, color: 'gray' }} value={seller?.phone_no ? seller?.phone_no : ''} readOnly />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mt: 1, mb: 1 }}>
          <Typography variant='subtitle1' sx={useStyles.inputTitle}>Họ và Tên:</Typography>
          <Input placeholder='Nhập họ và tên' sx={{ ...useStyles.input, color: 'gray' }} value={fullName} onChange={e => setFullName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <DialogUpdate handle={handleUpdate} />
          {/*Avatar */}
          <UpdateAvatar setShowAlert={setShowAlert} setShowAlertFail={setShowAlertFail} reRender={reRender} setReRender={setReRender} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <DialogUpdatePassword />
          <DialogUpdatePhoneNo />
          <DialogUpdateEmail />
        </Box>
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