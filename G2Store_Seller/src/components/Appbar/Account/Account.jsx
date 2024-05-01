import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Alert, Snackbar, IconButton, Tooltip, Avatar } from '@mui/material'
import { Settings, AccountCircle } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import { logout } from '../../../redux/actions/auth'
import avatarNull from '../../../assets/img/avatar.png'

function Account() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
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
        authenApi.logout()
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
            <Tooltip title="Cài đặt" sx={{ cursor: 'pointer' }}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0, marginRight: '10px', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 45, height: 45 }}>
                        <img src={user?.avatar || avatarNull} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-account"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {user && <MenuItem onClick={handleClose}>
                    <Link to={'/seller/profile'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AccountCircle fontSize="small" />
                        Tài khoản
                    </Link>

                </MenuItem>}
                <Divider />
                {user && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" />
                    Đăng xuất
                </MenuItem>}
            </Menu>
        </Box>
    )
}

export default Account