import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Typography, List, Collapse, Checkbox, Button } from '@mui/material'
import AddCategory from '../FormCategory/AddCategory'
import DeleteCategory from '../FormCategory/DeleteCategory'
import UpdateCategory from '../FormCategory/UpdateCategory'

function MenuCategory({ category, reRender, setReRender }) {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <Box sx={{ pl: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', '&:hover .action-buttons': { visibility: 'visible', bgcolor: 'inherit' } }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox />
                    <Typography variant='h7'>{category?.name}</Typography>
                    <UpdateCategory category={category} reRender={reRender} setReRender={setReRender}/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <AddCategory parent_id={category?.category_id} reRender={reRender} setReRender={setReRender}/>
                    <DeleteCategory category_id={category?.category_id} reRender={reRender} setReRender={setReRender}/>
                    {Array.isArray(category?.child_categories) && category?.child_categories.length > 0 &&
                        <Button sx={{ color: '#666666', ':hover': { bgcolor: 'inherit' } }} onClick={handleClick} >
                            {open ?
                                <ExpandLess sx={{ color: '#00BFFF' }} />
                                : <ExpandMore sx={{ color: '#666666' }}
                                />}
                        </Button>}
                </Box>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {Array.isArray(category?.child_categories) && category?.child_categories.map((child, index) => (
                        <MenuCategory category={child} key={index} reRender={reRender} setReRender={setReRender} />
                    ))}
                </List>
            </Collapse>
        </Box>
    )
}

export default MenuCategory