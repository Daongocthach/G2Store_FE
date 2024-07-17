import { useState, useEffect } from 'react'
import { Box, ButtonGroup, IconButton, TextField } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import authenApi from '../../../apis/authenApi'
import { updateAvatar } from '../../../redux/actions/auth'
import Loading from '../../../components/Loading/Loading'
import UpdateDobAndName from './UpdateProfile/UpdateDobAndName'
import UpdatePassword from './UpdateProfile/UpdatePassword'
import UpdatePhoneNo from './UpdateProfile/UpdatePhoneNo'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'
import { mockData } from '../../../apis/mockdata'

function Profile() {
  const triggerAlert = useAlert()
  const dispatch = useDispatch()
  const [reRender, setReRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    authenApi.me()
      .then((response) => {
        setUser(response)
        const data = {
          avatar: response?.avatar,
          point: response?.point
        }
        setAvatar(response?.avatar)
        dispatch(updateAvatar(data))
      })
      .catch((error) => console.log(error))
  }, [reRender])

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      handleUpdateAvatar(file)
    }
  }
  const handleUpdateAvatar = async (file) => {
    if (file) {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      authenApi.updateAvatar(formData)
        .then((response) => {
          dispatch(updateAvatar(response?.avatar))
          const reader = new FileReader()
          reader.onload = () => {
            setAvatar(reader.result)
          }
          reader.readAsDataURL(file)
          triggerAlert('Cập nhật ảnh đại diện thành công!', false, false)
        })
        .catch((error) => {
          console.log(error)
          triggerAlert('Cập nhật ảnh đại diện thất bại!', true, false)
          setAvatar(null)
        })
        .finally(() => setLoading(false))
    }
    else {
      triggerAlert('Lỗi chọn file!', false, true)
    }
  }

  return (
    <Box className="flex flex-col items-center justify-center gap-2">
      <Box className='relative bg-black rounded-full w-28 h-28' >
        <img src={avatar || mockData.images.avatarNull} className='w-full h-full rounded-full opacity-70' />
        <IconButton component="label" htmlFor="upload-image"
          className='absolute' sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
          <AddCircle className='text-gray-300' />
        </IconButton>
        <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
      </Box>
      <Box className="mb-2 flex flex-col gap-2 w-full">
        <TextField variant='standard' label='Họ và tên' disabled={!user?.full_name} fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-600'
          value={user?.full_name ? user?.full_name : 'Chưa cập nhật'} />
        <TextField variant='standard' label='Ngày sinh' disabled={!user?.dob} fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-500'
          value={user?.dob ? user?.dob : 'Chưa cập nhật'} />
        <TextField variant='standard' label='Email' disabled={!user?.email} fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-500'
          value={user?.email ? user?.email : ''} />
        <TextField variant='standard' label='Điện thoại' disabled={!user?.phone_no} readOnly fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 '
          value={user?.phone_no ? user?.phone_no : 'Chưa cập nhật'} />
        <TextField variant='standard' label='Tích điểm' fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-600'
          value={parseFloat(user?.point).toFixed(2) || 0 + ' điểm'} />
      </Box>
      <ButtonGroup variant="contained" color='info' aria-label="Basic button group" className='mt-1'>
        <UpdateDobAndName fullNameRoot={user?.full_name} dobRoot={user?.dob} reRender={reRender} setReRender={setReRender} />
        <UpdatePassword reRender={reRender} setReRender={setReRender} />
        <UpdatePhoneNo reRender={reRender} setReRender={setReRender} />
        {/* <UpdateEmail /> */}
      </ButtonGroup>
      {loading && <Loading />}
    </Box>
  )
}

export default Profile
