import { useEffect, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Box, Typography, ListItemButton, List, Collapse } from '@mui/material'
import subCategoryApi from '../../apis/subCategory'
import SubCategory from './SubCategory/SubCategory'
import { setSubCategory } from '../../redux/actions/subCategory'

export default function MenuCategory({ category }) {
  const dispatch = useDispatch()
  const [subCategories, setSubCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  const handleClickItem = (subCategory) => {
    dispatch(setSubCategory(subCategory))
  }
  useEffect(() => {
    subCategoryApi.getSubCategoriesByCateId(category?.id)
      .then(response => {
        setSubCategories(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  return (
    <Box>
      <ListItemButton onClick={handleClick} sx={{ p: 1, justifyContent: 'space-between' }} >
        <Typography variant='body1' sx={{ fontWeight: '600' }}>{category?.name}</Typography>
        {open ? <ExpandLess sx={{ color:'gray' }}/> : <ExpandMore sx={{ color:'gray' }}/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories?.map((subCategory, index) => (
            <SubCategory key={index} subCategory={subCategory}/>
            // <ListItemButton sx={{ pl: 4 }} key={subCategory.id} onClick={() => handleClickItem(subCategory)}>
            //   <Typography variant='body1' sx={{ fontWeight: '600' }}>{subCategory?.name}</Typography>
            // </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}