import { Box, Chip, Menu } from '@mui/material'
import { useEffect, useState } from 'react'
import { Dehaze, KeyboardArrowDown } from '@mui/icons-material'
import MenuCategory from '../../../../components/MenuCategory/MenuCategory'
import shopApi from '../../../../apis/shopApi'

function ShopCategories({ shop_id, setCategory }) {
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
        const fetchData = async () => {
            shopApi.getShopCategories(shop_id)
                .then((response) => setCategories(response))
                .catch((error) => console.log(error))
        }
        if (shop_id)
            fetchData()
    }, [shop_id])
    return (
        <Box>
            <Chip icon={<Dehaze sx={{ fontSize: 20 }} />} clickable label="Danh mục ngành hàng"
                sx={{
                    color: '#444444', bgcolor: 'transparent', paddingX: '5px', borderRadius: 4, fontSize: 15,
                    '& .MuiSvgIcon-root': { color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#444444') },
                    '&:hover': { bgcolor: 'primary.50' }
                }}
                onClick={handleClick} onDelete={handleClick} deleteIcon={<KeyboardArrowDown />}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                {(Array.isArray(categories) && categories.length > 0) ?
                    <MenuCategory categories={categories} setCategory={setCategory} isShopPage />
                    :
                    <Box className='p-3'>
                        Không có dữ liệu
                    </Box>
                }
            </Menu>
        </Box>
    )
}

export default ShopCategories