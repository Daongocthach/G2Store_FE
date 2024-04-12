import { Box, Button, Menu } from '@mui/material'
import { KeyboardArrowDown, Dehaze } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import MenuCategory from '../MenuCategory/MenuCategory'
import categoryApi from '../../apis/categoryApi'

function BoardBar() {
    const [categories, setCategories] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        // categoryApi.getCategories()
        //     .then(response => {
        //         setCategories(response.data)
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    }, [])
    return (
        <Box sx={{
            height: (theme) => theme.webCustom.boardBarHeight, display: 'flex', alignItems: 'center', borderTop: '1px solid #D3D3D3',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E6E6FA')
        }} paddingX={{ xs: 0, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Button startIcon={<Dehaze />} endIcon={<KeyboardArrowDown />} sx={{ bgcolor: 'inherit', fontSize: '18px', fontWeight: 'bold', color: '#696969' }}
                    aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    Danh Mục
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    { Array.isArray(categories) && categories?.map((category, index) => (
                        <MenuCategory key={index} category={category} />
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default BoardBar