import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, Alert, Snackbar, IconButton, Tooltip } from '@mui/material'
import { Settings, ManageAccounts } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { persistor } from '../../../redux/store'
import authenApi from '../../../apis/authenApi'
import { logout } from '../../../redux/actions/auth'

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
        handleClose()
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
                <ManageAccounts sx={{ width: 40, height: 40, color: 'white' }} />
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