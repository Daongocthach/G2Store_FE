import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Alert, Snackbar, Avatar, IconButton, Chip, Typography } from '@mui/material'
import { Settings, Login, AccountCircle, Person, PersonAdd } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { logout } from '../../../redux/actions/auth'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import avatarNull from '../../../assets/img/avatar.png'
import ShowAlert from '../../ShowAlert/ShowAlert'

function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        authenApi.logout()
        deleteCookie()
        dispatch(logout())
        persistor.purge()
        setShowAlert(true)
        handleClose()
        navigate('/')
    }
    return (
        <Box>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ padding: 0, marginRight: '10px', color: 'white' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {!user?.atk && <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to={'/login'} ><Chip icon={<Person />} label='Đăng nhập' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                    <Link to={'/register'} ><Chip icon={<PersonAdd />} label='Đăng Ký' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                </Box>}
                {user?.atk && <Avatar sx={{ width: 32, height: 32 }}>
                    <img src={user?.avatar || avatarNull} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </Avatar>}
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                {user?.atk && <MenuItem onClick={handleClose}>
                    <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AccountCircle fontSize="small" />
                        Tài khoản
                    </Link>
                </MenuItem>}
                <Divider />
                {!user?.atk && <MenuItem onClick={handleClose}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Login fontSize="small" />
                        <Typography >Đăng nhập</Typography>
                    </Link>
                </MenuItem>}
                {user?.atk && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" />
                    Đăng xuất
                </MenuItem>}
            </Menu>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đăng xuất thành công!'}/>
        </Box>
    )
}

export default Account
