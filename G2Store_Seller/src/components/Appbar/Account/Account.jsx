import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, IconButton, Tooltip, Avatar } from '@mui/material'
import { Settings, AccountCircle } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import { logout } from '../../../redux/actions/auth'
import { mockData } from '../../../apis/mockdata'
import { useAlert } from '../../ShowAlert/ShowAlert'

function Account({ user }) {
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
    const handleLogout = async () => {
        triggerAlert('Đăng xuất thành công')
        authenApi.logout()
        deleteCookie()
        dispatch(logout())
        persistor.purge()
        navigate('/')
    }
    return (
        <Box>
            <Tooltip title="Cài đặt" className='cursor-pointer'>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0, marginRight: '10px', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar className='w-11 h-11'>
                        <img src={user?.shop_image || mockData.images.avatarNull} className='object-contain w-full h-full' />
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
                    <Link to={'/seller/profile'} className='flex flex-row items-center'>
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