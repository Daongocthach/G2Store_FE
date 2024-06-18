import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'

{/**Use For ShopPage get shopCategories and BoardBar get Categories */ }
export default function MenuCategory({ categories, isShopPage, setCategory }) {
  const navigate = useNavigate()
  const [selectCategory, setSelectCategory] = useState()
  const handleClick = (category) => {
    if (isShopPage) {
      setCategory(category)
      setSelectCategory(category)
    }
    else {
      navigate('/genre-detail', { state: { category: category } })
      setSelectCategory(category)
    }
  }
  return (
    <Box className='flex flex-row overflow-x-auto' >
      <Box className='overflow-auto flex flex-col gap-1 p-2'>
        {Array.isArray(categories) && categories.map((category, index) => (
          <Box className='flex flex-row gap-1 text-gray-600 cursor-pointer'
            key={index} onClick={() => handleClick(category)}>
            <Typography sx={{ fontSize: 15 }} className={`${selectCategory === category ? 'text-blue-500' : 'text-gray-600'} w-32 text-left`}>
              {category?.name}
            </Typography>
            {Array.isArray(category?.child_categories) && category.child_categories.length > 0 &&
              <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />}
          </Box>
        ))}
      </Box>
      {Array.isArray(selectCategory?.child_categories) && selectCategory.child_categories.length > 0 && <Box>
        <MenuCategory categories={selectCategory?.child_categories} />
      </Box>}
    </Box>
  )
}