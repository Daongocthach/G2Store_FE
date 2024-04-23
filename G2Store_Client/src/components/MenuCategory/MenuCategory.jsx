import { useEffect, useState } from 'react'
import { NavigateNext } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Box, Typography, ListItemButton } from '@mui/material'


export default function MenuCategory({ category }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  const handleClickItem = () => {

  }
  useEffect(() => {

  }, [])
  return (
    <Box>
      <ListItemButton onClick={handleClick} sx={{ p: 1, justifyContent: 'space-between' }} >
        <Typography variant='body1' sx={{ color: '#444444' }}>{category?.name}</Typography>
        <NavigateNext sx={{ color:'#444444', fontSize: 16 }}/>
      </ListItemButton>
    </Box>
  )
}