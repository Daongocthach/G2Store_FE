import { Box, Menu, Chip } from '@mui/material'
import { KeyboardArrowDown, Widgets, MoneyOff, Category } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuCategory from '../MenuCategory/MenuCategory'
import categoryApi from '../../apis/categoryApi'

function BoardBar() {
    const [categories, setCategories] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handle = () => { }
    const handleClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        categoryApi.getCategories()
            .then(response => {
                setCategories(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    return (
        <Box className='h-10 bg-gray-200 flex flex-row items-center border-t border-gray-300 sm:px-0 md:px-10'>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Chip icon={<Category />} clickable sx={useStyles.chip} label="Danh mục" onClick={handleClick}
                    onDelete={handle} deleteIcon={<KeyboardArrowDown />} />
                <Link to={'/promotion'}><Chip icon={<MoneyOff />} label={'Khuyến mãi'} clickable sx={useStyles.chip} ></Chip></Link>
                <Link to={'/genre-detail'}><Chip icon={<Widgets />} label={'Sản phẩm'} clickable sx={useStyles.chip} ></Chip></Link>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
                <MenuCategory categories={categories} />
            </Menu>
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