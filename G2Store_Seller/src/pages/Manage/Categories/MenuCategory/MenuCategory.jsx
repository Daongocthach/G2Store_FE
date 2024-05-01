import { useState } from 'react'
import { ArrowDropDown, ArrowRight } from '@mui/icons-material'
import { Box, Typography, List, Collapse } from '@mui/material'
import AddCategory from '../FormCategory/AddCategory'
import DeleteCategory from '../FormCategory/DeleteCategory'
import UpdateCategory from '../FormCategory/UpdateCategory'
import AddProductCate from '../FormCategory/AddShopCateProduct'
import ViewShopCateProduct from '../FormCategory/ViewShopCateProduct'

function MenuCategory({ category, reRender, setReRender }) {
    const [open, setOpen] = useState(true)
    const handleClick = () => {
        if (Array.isArray(category?.child_categories) && category?.child_categories.length > 0)
            setOpen(!open)
    }
    return (
        <Box sx={{ pl: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', '&:hover .action-buttons': { visibility: 'visible', bgcolor: 'inherit' } }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {open ? <ArrowDropDown sx={{ color: '#444444', cursor: 'pointer' }} onClick={handleClick} />
                        : <ArrowRight sx={{ color: '#444444', cursor: 'pointer' }} onClick={handleClick} />}
                    <Typography variant='subtitle1' color={'#444444'}>{category?.name}</Typography>
                    <UpdateCategory category={category} reRender={reRender} setReRender={setReRender} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ViewShopCateProduct shop_cate_id={category?.shop_cate_id}/>
                    <AddProductCate shop_cate_id={category?.shop_cate_id}/>
                    <AddCategory parent_id={category?.shop_cate_id} reRender={reRender} setReRender={setReRender} />
                    <DeleteCategory category_id={category?.shop_cate_id} reRender={reRender} setReRender={setReRender} />
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