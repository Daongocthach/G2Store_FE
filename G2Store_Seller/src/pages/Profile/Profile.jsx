import { useState } from 'react'
import { Typography, Box, Input, Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Breadcrumbs, Link } from '@mui/material'
import { PersonOutline } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [fullName, setFullName] = useState(user?.fullName)
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo)
  const [avatar, setAvatar] = useState(user?.avatar)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
  const onUpdate = () => {
    // authenApi.updateProfile(user?.id, fullName, phoneNo, avatar)
    //   .then(response => {
    //     dispatch(login(response.data))
    //     alert('Cập nhật thông tin thành công')
    //   })
    //   .catch(() => alert('Cập nhật thông tin thất bại'))
  }
  const onUpdatePassword = () => {
    // authenApi.updatePassword(user?.id, oldPassword, newPassword)
    //   .then(() => {
    //     alert('Cập nhật mật khẩu thành công')
    //   })
    //   .catch(() => {
    //     alert('Sai mật khẩu')
    //     console.log()
    //   })
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', p: 1, minHeight: '100vh' }}>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/profile">
          Tài khoản
        </Link>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
        <PersonOutline sx={{ color: 'red' }} />
        <Typography variant='subtitle1' sx={{}}>Tài khoản ID: {user?.id}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Email</Typography>
          <Input sx={{ minWidth: '200px' }} value={user.email} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Họ và Tên</Typography>
          <Input sx={{ minWidth: '200px' }} value={fullName} onChange={e => setFullName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Điện thoại</Typography>
          <Input sx={{ minWidth: '200px' }} value={phoneNo} onChange={e => setPhoneNo(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Địa chỉ</Typography>
          <Typography variant='body1' maxWidth={'250px'}>{user?.address + ', ' + user?.ward + ', ' + user?.district + ', Tỉnh ' + user?.province}</Typography>
          <Button sx={{ bgcolor:'gray', color:'white' }} onClick={onUpdate}>Đổi</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Avatar</Typography>
          <TextField size='small' type={'file'} onChange={handleAvatarChange} />
          <img src={avatar} alt={'avatar'} width={'50px'} height={'50px'} style={{ borderRadius: 10 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
        <Button sx={{ color: 'white', width: '150px', height: '40px', bgcolor: '#FF0000' }} onClick={onUpdate}>Cập nhật</Button>
        <Button sx={{ color: 'white', width: '150px', height: '40px', bgcolor: '#EE9A00' }} onClick={handleClickOpen}>Đổi mật khẩu</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1, flexWrap: 'wrap' }}>
        <Typography variant='h6' >Bảo mật & Quyền riêng tư</Typography>
        <Typography variant='body1' >Kiểm soát quyền truy cập vào tài khoản này</Typography>
      </Box>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle >Đổi mật khẩu</DialogTitle>
        <DialogContent >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography minWidth={'130px'}>Mật khẩu cũ: </Typography>
              <TextField fullWidth size='small' type='password' label="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography minWidth={'130px'}>Mật khẩu mới: </Typography>
              <TextField fullWidth size='small' type='password' label="New Password" onChange={(e) => setNewPassword(e.target.value)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onUpdatePassword}>Accept</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Profile