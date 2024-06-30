import { useState, useEffect } from 'react'
import { Box, ButtonGroup, IconButton, TextField, Typography, Input } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import authenApi from '../../../apis/authenApi'
import { updateAvatar } from '../../../redux/actions/auth'
import avatarNull from '../../../assets/img/avatar.png'
import Loading from '../../../components/Loading/Loading'
import UpdateDobAndName from './UpdateProfile/UpdateDobAndName'
import UpdatePassword from './UpdateProfile/UpdatePassword'
import UpdatePhoneNo from './UpdateProfile/UpdatePhoneNo'
import UpdateEmail from './UpdateProfile/UpdateEmail'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

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
        setUser({
          email: response?.email,
          phoneNo: response?.phone_no,
          full_name: response?.full_name,
          dob: response?.dob,
          point: response?.point
        })
        const data = {
          avatar: response?.avatar,
          point: response?.point
        }
        setAvatar(response?.avatar)
        dispatch(updateAvatar(data))
      })
      .catch((error) => console.log(error))
  }, [reRender, dispatch])

  const formik = useFormik({
    initialValues: {
      full_name: user?.full_name ? user.full_name : '',
      dob: user?.dob ? user.dob : ''
    },
    enableReinitialize: true,
    onChange: (e) => {
      const { name, value } = e.target
      formik.setFieldValue(name, value)
    }
  })

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      handleUpdateAvatar(file)

    }
  }
  const handleUpdateAvatar = async (file) => {
    setLoading(true)
    if (file) {
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

        })
        .finally(() => setLoading(false))
    }
  }
  const handleUpdate = async () => {
    const { full_name, dob } = formik.values
    if (!dob || !full_name) {
      triggerAlert('Ngày sinh hoặc tên đăng nhập không được để trống!', false, true)
    }
    else {
      setLoading(true)
      try {
        authenApi.updateProfile({ dob, full_name })
        setLoading(false)
        triggerAlert('Cập nhật thông tin thành công!', false, false)
      } catch (error) {
        console.log(error)
        triggerAlert('Cập nhật thông tin thất bại!', true, false)
        setLoading(false)
      }
    }
  }
  return (
    <Box className="flex flex-col items-center justify-center gap-2">
      <Box className='relative bg-black rounded-full w-28 h-28' >
        <img src={avatar || avatarNull} className='w-full h-full rounded-full opacity-70' />
        <IconButton component="label" htmlFor="upload-image"
          className='absolute' sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
          <AddCircle className='text-gray-300' />
        </IconButton>
        <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
      </Box>
      <Box className="mb-2 flex flex-col gap-2 w-full">
        <Box className='flex-col bg-sky-50'>
          <Typography variant='caption' className='text-gray-400'>Họ và tên</Typography>
          <Input id="full_name" name="full_name" fullWidth size='small' placeholder={'Nhập họ và tên'} value={formik.values.full_name}
            className='min-w-[200px] md:min-w-[500px] text-sm  text-gray-600' onChange={formik.handleChange} />
        </Box>
        <Box className='flex-col bg-sky-50'>
          <Typography variant='caption' className='text-gray-400'>Ngày sinh</Typography>
          <Input id="dob" name="dob" fullWidth size='small' type='date' placeholder={'Ngày sinh'} value={formik.values.dob}
            className='min-w-[200px] md:min-w-[500px] text-sm  text-gray-600' onChange={formik.handleChange} />
        </Box>
        <TextField variant='standard' label='Email' disabled fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-600' value={user?.email ? user?.email : ''} />
        <TextField variant='standard' label='Điện thoại' disabled fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-600' value={user?.phone_no ? user?.phoneN_no : ''} />
        <TextField variant='standard' label='Tích điểm' disabled fullWidth size='small'
          className='min-w-[200px] md:min-w-[500px] text-sm bg-sky-50 text-gray-600' value={user?.point || 0} />
      </Box>
      <ButtonGroup variant="contained" color='info' aria-label="Basic button group" className='mt-1'>
        <UpdateDobAndName handle={handleUpdate} />
        <UpdatePassword reRender={reRender} setReRender={setReRender} />
        <UpdatePhoneNo reRender={reRender} setReRender={setReRender} />
        <UpdateEmail reRender={reRender} setReRender={setReRender} />
      </ButtonGroup>
      {loading && <Loading />}
    </Box>
  )
}

export default Profile
