import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'

function MenuCategory({ categories, setCategoryId, setSelectedCategories }) {
    const [selectCategory, setSelectCategory] = useState()
    const handleClick = (category) => {
        if (category?.child_categories && category.child_categories.length === 0) {
            setCategoryId(category?.category_id)
            setSelectedCategories(category?.name)
        }
        setSelectCategory(category)
    }
    return (
        <Box className='flex flex-row overflow-x-auto' >
            <Box className='overflow-auto flex flex-col gap-2 p-2'>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <Box className='flex flex-row gap-1 text-gray-600 cursor-pointer items-center'
                        key={index} onClick={() => handleClick(category)}>
                        <Typography sx={{ fontSize: 15 }} className={`${selectCategory === category ? 'text-blue-500' : 'text-gray-600'} w-60 text-left`}>
                            {category?.name}
                        </Typography>
                        {Array.isArray(category?.child_categories) && category.child_categories.length > 0 &&
                            <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />}
                    </Box>
                ))}
            </Box>
            {Array.isArray(selectCategory?.child_categories) && selectCategory.child_categories.length > 0 && <Box>
                <MenuCategory categories={selectCategory?.child_categories} setCategoryId={setCategoryId} setSelectedCategories={setSelectedCategories} />
            </Box>}
        </Box>
    )
}

export default MenuCategory