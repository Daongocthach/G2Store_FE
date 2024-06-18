import * as React from 'react'
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { ShoppingCart, Notifications, Login, AccountCircle, PersonAdd, Logout, Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import G2Logo from '../../assets/img/G2Logo.png'

const links = [
    { to: '/cart', title: 'Giỏ hàng', icon: <ShoppingCart fontSize="small" /> },
    { to: '/profile', title: 'Tài khoản', icon: <AccountCircle fontSize="small" /> },
    { to: '/logout', title: 'Đăng xuất', icon: <Logout fontSize="small" /> }
]
const links2 = [
    { to: '/notification', title: 'Thông báo', icon: <Notifications fontSize="small" /> },
    { to: '/login', title: 'Đăng nhập', icon: <Login fontSize="small" /> },
    { to: '/register', title: 'Đăng ký', icon: <PersonAdd fontSize="small" /> },
]
export default function DrawerMenu({ atk }) {
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Box className="flex items-center gap-1 bg-gray-800">
                <img src={G2Logo} className="h-16 w-16" />
                <Link to="/" className="no-underline">
                    <Typography variant="h5" fontWeight={'bold'} className="text-white cursor-pointer">G2Store</Typography>
                </Link>
            </Box>
            {atk && <List>
                {links.map((link, index) => (
                    <ListItem key={index} disablePadding>
                        <Link to={link?.to} className='text-gray-800 flex-row items-center justify-between' >
                            <ListItemButton>
                                <ListItemIcon>
                                    {link?.icon}
                                </ListItemIcon>
                                <ListItemText primary={link?.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>}
            <Divider variant='middle' />
            {!atk && <List>
                {links2.map((link, index) => (
                    <ListItem key={index} disablePadding>
                        <Link to={link?.to} className='text-gray-800 flex-row items-center justify-between' >
                            <ListItemButton>
                                <ListItemIcon>
                                    {link?.icon}
                                </ListItemIcon>
                                <ListItemText primary={link?.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>}
        </Box>
    )

    return (
        <div>
            <Menu onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' } }} className=" text-white hover:text-orange-300" />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}
