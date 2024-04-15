import { useEffect, useState } from 'react'
import { NavigateNext } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Box, Typography, ListItemButton, List, Collapse } from '@mui/material'


export default function MenuCategory({ category }) {
  const dispatch = useDispatch()
  const [subCategories, setSubCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  const handleClickItem = (subCategory) => {

  }
  useEffect(() => {

  }, [])
  return (
    <Box>
      <ListItemButton onClick={handleClick} sx={{ p: 1, justifyContent: 'space-between' }} >
        <Typography variant='body1' sx={{ color: '#444444' }}>{category?.name}</Typography>
        <NavigateNext sx={{ color:'#444444', fontSize: 16 }}/>
      </ListItemButton>
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories?.map((subCategory, index) => (
            <SubCategory key={index} subCategory={subCategory}/>
            // <ListItemButton sx={{ pl: 4 }} key={subCategory.id} onClick={() => handleClickItem(subCategory)}>
            //   <Typography variant='body1' sx={{ fontWeight: '600' }}>{subCategory?.name}</Typography>
            // </ListItemButton>
          ))}
        </List>
      </Collapse> */}
    </Box>
  )
}