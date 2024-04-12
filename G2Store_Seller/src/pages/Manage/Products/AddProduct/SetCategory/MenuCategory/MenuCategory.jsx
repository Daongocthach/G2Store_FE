import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'

function MenuCategory({ categories, setCategoryId }) {
    const [selectCategory, setSelectCategory] = useState()
    const [list, setList] = useState([])
    const handleClick = (category) => {
        setSelectCategory(category)
        if (setCategoryId)
            setCategoryId(category?.name)
    }
    return (
        <Box sx={{ display: 'flex', height: 200 }}>
            <Box sx={{ overflow: 'auto' }}>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <Button sx={{ display: 'flex', gap: 2, color: '#555555', ':hover': { bgcolor: 'inherit' } }}
                        key={index} onClick={() => handleClick(category)}>
                        <Typography variant='body1' sx={{ width: 200, textAlign: 'left' }} >{category?.name}</Typography>
                        <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />
                    </Button>
                ))}
            </Box>
            {Array.isArray(selectCategory?.childCategories) && <Box>
                <MenuCategory categories={selectCategory?.childCategories} setCategoryId={setCategoryId} />
            </Box>}
        </Box>
    )
}

export default MenuCategory