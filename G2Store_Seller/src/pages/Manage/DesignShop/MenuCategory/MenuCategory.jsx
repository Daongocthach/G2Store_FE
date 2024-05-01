import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'


export default function MenuCategory({ categories }) {
  const [selectCategory, setSelectCategory] = useState()
  const handleClick = (category) => {

    setSelectCategory(category)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ overflow: 'auto' }}>
        {Array.isArray(categories) && categories.map((category, index) => (
          <Button sx={{ display: 'flex', gap: 2, color: '#555555', ':hover': { bgcolor: 'inherit' } }}
            key={index} onClick={() => handleClick(category)}>
            <Typography variant='body1' sx={{ width: 120, textAlign: 'left' }} >{category?.name}</Typography>
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