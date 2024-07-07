import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Avatar, IconButton, Chip, Typography } from '@mui/material'
import { Logout, Login, AccountCircle, Person, PersonAdd } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/actions/auth'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import { useAlert } from '../../ShowAlert/ShowAlert'
import { mockData } from '../../../apis/mockdata'

function Account({ atk, avatar }) {
    const triggerAlert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        authenApi.logout()
        dispatch(logout())
        persistor.purge()
        handleClose()
        triggerAlert('Đăng xuất thành công!', false, false)
        navigate('/')
    }
    return (
        <Box>
            <IconButton size="small" onClick={handleClick} className='p-0 text-white' >
                {!atk && <Box className='flex flex-row gap-3'>
                    <Link to={'/login'} ><Chip icon={<Person />} label='Đăng nhập' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                    <Link to={'/register'} ><Chip icon={<PersonAdd />} label='Đăng Ký' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                </Box>}
                {atk && <Avatar className='w-10 h-10' >
                    <img src={avatar || mockData.images.avatarNull} className='w-full h-full object-contain' />
                </Avatar>}
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleClose}>
                {atk && <MenuItem onClick={handleClose}>
                    <Link to={'/profile'} className=' text-gray-700 flex flex-row items-center justify-between gap-2' >
                        <AccountCircle fontSize="small" />
                        Tài khoản
                    </Link>
                </MenuItem>}
                <Divider />
                {!atk && <MenuItem onClick={handleClose}>
                    <Link to={'/login'} className='text-gray-700 flex-row items-center justify-between gap-2' >
                        <Login fontSize="small" />
                        <Typography >Đăng nhập</Typography>
                    </Link>
                </MenuItem>}
                {atk && <MenuItem onClick={handleLogout}>
                    <Link className='text-gray-700 flex flex-row items-center justify-between gap-2' >
                        <Logout fontSize="small" />
                        <Typography >Đăng xuất</Typography>
                    </Link>
                </MenuItem>}
            </Menu>
        </Box>
    )
}

export default Account