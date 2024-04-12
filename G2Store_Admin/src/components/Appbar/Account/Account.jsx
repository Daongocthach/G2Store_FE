import { useState } from 'react'
import { Menu, Box, Divider, MenuItem, IconButton, Tooltip, Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@mui/material'
import { Settings, ManageAccounts, AccountCircle } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteCookie, getCookie } from '../../../utils/cookie'
import { persistor } from '../../../redux/store'
import ShowDialogAccept from '../../ShowDialog/ShowDialogAccept'

function Account() {
    const atk = getCookie('atk')
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
        persistor.purge()
        navigate('/')
    }
    return (
        <Box>
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
                {atk && <MenuItem>
                    <ShowDialogAccept buttonName={'Đăng xuất'} title={'Bạn có muốn đăng xuất'} content={'Nhấn "Ok" để đăng xuất, "Hủy" để thoát.'} handle={handleLogout} />
                </MenuItem>}
            </Menu>
        </Box>
    )
}

export default Account