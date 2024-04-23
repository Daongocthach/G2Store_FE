import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'

function MenuCategory({ categories, setCategoryId, setSelectedCategories }) {
    const [selectCategory, setSelectCategory] = useState()
    const handleClick = (category) => {
        if (category?.child_categories && category.child_categories.length === 0) {
            setCategoryId(category?.category_id)
            //setSelectedCategories(prev => [...prev, category?.name])
            setSelectedCategories(category?.name)
        }
        // else {
        //     const categoryName = category?.child_categories.find(item => item?.name === category?.name)?.name
        //     if (categoryName)
        //         setSelectedCategories(prev => [...prev, categoryName])
        // }
        setSelectCategory(category)
    }
    return (
        <Box sx={{ display: 'flex', height: 200 }}>
            <Box sx={{ overflow: 'auto' }}>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <Button sx={{ display: 'flex', gap: 2, color: '#555555', ':hover': { bgcolor: 'inherit' } }}
                        key={index} onClick={() => handleClick(category)}>
                        <Typography variant='body1' sx={{ width: 200, textAlign: 'left' }} >{category?.name}</Typography>
                        {Array.isArray(category?.child_categories) && category.child_categories.length > 0 &&
                        <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />}
                    </Button>
                ))}
            </Box>
            {Array.isArray(selectCategory?.child_categories) && selectCategory.child_categories.length > 0 && <Box>
                <MenuCategory categories={selectCategory?.child_categories} setCategoryId={setCategoryId} setSelectedCategories={setSelectedCategories} />
            </Box>}
        </Box>
    )
}

export default MenuCategory