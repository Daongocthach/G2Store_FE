import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Avatar, IconButton, Chip, Typography } from '@mui/material'
import { Settings, Login, AccountCircle, Person, PersonAdd } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/actions/auth'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import avatarNull from '../../../assets/img/avatar.png'
import ShowAlert from '../../ShowAlert/ShowAlert'

function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)
    const atk = localStorage.getItem('atk')
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
        dispatch(logout())
        persistor.purge()
        setShowAlert(true)
        handleClose()
        navigate('/')
    }
    return (
        <Box>
            <IconButton
                size="small"
                onClick={handleClick}
                sx={{ padding: 0, marginRight: '10px', color: 'white' }}
            >
                {!atk && <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to={'/login'} ><Chip icon={<Person />} label='Đăng nhập' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                    <Link to={'/register'} ><Chip icon={<PersonAdd />} label='Đăng Ký' sx={{ bgcolor: '#DDDDDD' }} /></Link>
                </Box>}
                {atk && <Avatar sx={{ width: 40, height: 40 }} >
                    <img src={user?.avatar || avatarNull} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </Avatar>}
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} onClose={handleClose}>
                {atk && <MenuItem onClick={handleClose}>
                    <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AccountCircle fontSize="small" sx={{ mr: 1 }} />
                        Tài khoản
                    </Link>
                </MenuItem>}
                <Divider />
                {!atk && <MenuItem onClick={handleClose}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Login fontSize="small" />
                        <Typography >Đăng nhập</Typography>
                    </Link>
                </MenuItem>}
                {atk && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" sx={{ mr: 1 }} />
                    Đăng xuất
                </MenuItem>}
            </Menu>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Đăng xuất thành công!'} />
        </Box>
    )
}

export default Account