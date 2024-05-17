import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'

export default function MenuCategory({ categories }) {
  const navigate = useNavigate()
  const [selectCategory, setSelectCategory] = useState()
  const handleClick = (category) => {
    // if (category?.child_categories && category.child_categories.length === 0) {
    //   navigate('/genre-detail', { state: category?.category_id })
    // }
    // else if (!category?.path.includes('/') && (selectCategory?.path.split('/').length - 1) > 1) {
    //   setIsNotShow(true)
    //   console.log('abc')
    // }
    navigate('/genre-detail', { state: { category:  category } })
    setSelectCategory(category)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ overflow: 'auto' }}>
        {Array.isArray(categories) && categories.map((category, index) => (
          <Button sx={{ display: 'flex', gap: 2, color: '#555555', ':hover': { bgcolor: 'inherit' } }}
            key={index} onClick={() => handleClick(category)}>
            <Typography variant='body1' color={selectCategory === category ? '#2a99ff': '#555555'} sx={{ width: 120, textAlign: 'left' }} >{category?.name}</Typography>
            {Array.isArray(category?.child_categories) && category.child_categories.length > 0 &&
              <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />}
          </Button>
        ))}
      </Box>
      {Array.isArray(selectCategory?.child_categories) && selectCategory.child_categories.length > 0 && <Box>
        <MenuCategory categories={selectCategory?.child_categories} />
      </Box>}
    </Box>
  )
}