import { Box, Button, Menu, Chip, Stack } from '@mui/material'
import { KeyboardArrowDown, Dehaze, AddHomeWork, Filter9Plus, MoneyOff } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuCategory from '../MenuCategory/MenuCategory'
import { mockData } from '../../apis/mockdata'

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
                <Chip icon={<Dehaze />} clickable sx={useStyles.chip} label="Danh mục" onClick={handleClick}
                    onDelete={handleClick} deleteIcon={<KeyboardArrowDown />}/>
                <Link to={'/manage/providers'}><Chip icon={<AddHomeWork />} label={'Gian hàng tốt'} clickable sx={useStyles.chip} ></Chip></Link>
                <Link to={'/manage/products'}><Chip icon={<Filter9Plus />} label={'Sản phẩm top'} clickable sx={useStyles.chip} ></Chip></Link>
                <Link to={'/manage/promotions'}><Chip icon={<MoneyOff />} label={'Khuyến mãi'} clickable sx={useStyles.chip} ></Chip></Link>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    {Array.isArray(mockData.categories) && mockData.categories?.map((category, index) => (
                        <MenuCategory key={index} category={category} />
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default BoardBar

const useStyles = {
    chip: {
        color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444'),
        bgcolor: 'transparent',
        border: '1 ',
        paddingX: '5px',
        borderRadius: '4px',
        '& .MuiSvgIcon-root': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444')
        },
        '&:hover': {
            bgcolor: 'primary.50'
        }
    }
}