import { useState, useEffect } from 'react'
import { Typography, Box, Input, Paper, ButtonGroup } from '@mui/material'
import authenApi from '../../apis/authenApi'
import Loading from '../../components/Loading/Loading'
import UpdateAvatar from './UpdateSeller/UpdateAvatar'
import UpdateName from './UpdateSeller/UpdateName'
import UpdatePassword from './UpdateSeller/UpdatePassword'
import UpdatePhoneNo from './UpdateSeller/UpdatePhoneNo'

function Profile() {
  const [reRender, setReRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seller, setSeller] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      authenApi.me()
        .then(async (response) => {
          setSeller({
            email: response?.email,
            phone_no: response?.phone_no,
            full_name: response?.full_name,
            avatar: response?.avatar
          })
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [reRender])

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
          <Input placeholder='Họ và tên' sx={{ ...useStyles.input, color: 'gray' }} value={seller?.full_name ? seller?.full_name : ''} readOnly />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          {/* <DialogUpdate handle={handleUpdate} /> */}
          {/*Avatar */}
          <UpdateAvatar reRender={reRender} setReRender={setReRender} />
        </Box>
        <ButtonGroup variant="contained" color='info' aria-label="Basic button group" className='mt-1'>
          <UpdateName fullNameRoot={seller?.full_name} reRender={reRender} setReRender={setReRender} />
          <UpdatePassword reRender={reRender} setReRender={setReRender} />
          <UpdatePhoneNo reRender={reRender} setReRender={setReRender} />
          {/* <UpdateEmail /> */}
        </ButtonGroup>
      </Box>
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