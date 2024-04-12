import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Alert, Snackbar, Avatar, IconButton, Tooltip, Chip } from '@mui/material'
import { Settings, Login, AccountCircle, Person, PersonAdd } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { logout } from '../../../redux/actions/auth'
import { persistor } from '../../../redux/store'

function Account() {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.auth.avatar)
    const navigate = useNavigate()
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
        deleteCookie()
        dispatch(logout())
        persistor.purge()
        setShowAlert(true)
        navigate('/')
    }
    return (
        <Box>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
                <Alert severity="success" variant='filled' onClose={() => setShowAlert(false)}>
                    Đăng xuất thành công!
                </Alert>
            </Snackbar>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ padding: 0, marginRight: '10px', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {!avatar && <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to={'/login'} ><Chip icon={<Person />} label='Đăng nhập' /></Link>
                    <Link to={'/register'} ><Chip icon={<PersonAdd />} label='Đăng Ký' /></Link>
                </Box>}
                {avatar && <Avatar sx={{ width: 32, height: 32 }}>
                    <img src={avatar} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </Avatar>}
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                {avatar && <MenuItem onClick={handleClose}>
                    <Link to={'/account'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AccountCircle fontSize="small" />
                        Tài khoản
                    </Link>
                </MenuItem>}
                <Divider />
                {!avatar && <MenuItem onClick={handleClose}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Login fontSize="small" />
                        Đăng nhập
                    </Link>
                </MenuItem>}
                {avatar && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" />
                    Đăng xuất
                </MenuItem>}
            </Menu>
        </Box>
    )
}

export default Account