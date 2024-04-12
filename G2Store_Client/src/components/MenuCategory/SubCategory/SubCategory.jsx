import { Box, Typography, ListItemButton, List, Collapse } from '@mui/material'
import { useEffect, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSubCategory } from '../../../redux/actions/subCategory'

export default function SubCategory({ subCategory }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(!open)
    }
    const handleClickItem = () => {
        dispatch(setSubCategory(subCategory))
        navigate('/genre-detail')
    }
    return (
        <Box pl={1}>
            <ListItemButton onClick={handleClick} sx={{ p: 1, justifyContent: 'space-between' }} >
                <Typography variant='body1' sx={{ fontWeight: '600' }}>{subCategory?.name}</Typography>
                {open ? <ExpandLess sx={{ color:'gray' }}/> : <ExpandMore sx={{ color:'gray' }}/>}
            </ListItemButton>
            {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 2 }} key={subCategory.id} >
                        <Typography variant='body1' sx={{  }}>{'Bánh xèo'}</Typography>
                    </ListItemButton>
                </List>
            </Collapse> */}
        </Box>
    )
}