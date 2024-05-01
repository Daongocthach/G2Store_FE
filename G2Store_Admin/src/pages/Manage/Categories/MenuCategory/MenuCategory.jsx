import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Typography, List, Collapse, Button } from '@mui/material'
import AddCategory from '../FormCategory/AddCategory'
import DeleteCategory from '../FormCategory/DeleteCategory'
import UpdateCategory from '../FormCategory/UpdateCategory'

function MenuCategory({ category, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <Box sx={{ pl: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', '&:hover .action-buttons': { visibility: 'visible', bgcolor: 'inherit' } }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1' color={'#444444'}>{category?.name}</Typography>
                    <UpdateCategory category={category} reRender={reRender} setReRender={setReRender} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <AddCategory parent_id={category?.category_id} reRender={reRender} setReRender={setReRender} />
                    <DeleteCategory category_id={category?.category_id} reRender={reRender} setReRender={setReRender} />
                    {Array.isArray(category?.child_categories) && category?.child_categories.length > 0 &&
                        <Button sx={{ color: '#444444', ':hover': { bgcolor: 'inherit' } }} onClick={handleClick} >
                            {open ?
                                <ExpandLess sx={{ color: '#444444' }} />
                                : <ExpandMore sx={{ color: '#444444' }}
                                />}
                        </Button>}
                </Box>
            </Box>
            {Array.isArray(category?.child_categories) && category?.child_categories.length > 0 &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {Array.isArray(category?.child_categories) && category?.child_categories.map((child, index) => (
                            <MenuCategory category={child} key={index} reRender={reRender} setReRender={setReRender} />
                        ))}
                    </List>
                </Collapse>}
        </Box>
    )
}

export default MenuCategory