import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import AddCategory from '../FormCategory/AddCategory'
import DeleteCategory from '../FormCategory/DeleteCategory'
import UpdateCategory from '../FormCategory/UpdateCategory'
import AddProductCate from '../FormCategory/AddShopCateProduct'
import ViewShopCateProduct from '../FormCategory/ViewShopCateProduct'

function MenuCategory({ categories, reRender, setReRender, isReset, setIsReset }) {
    const [selectCategory, setSelectCategory] = useState()
    const handleClick = (category) => {
        if (category?.child_categories && category?.child_categories.length > 0) {
            setIsReset(true)
        }
        else {
            setIsReset(false)
        }
        setSelectCategory(category)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ overflow: 'auto', pt: 1, pl: 1 }}>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <Box sx={{
                        display: 'flex', gap: 1, alignItems: 'center', color: '#555555', ':hover': { bgcolor: 'inherit' },
                        '&:hover .action-buttons': { visibility: 'visible', bgcolor: 'inherit', cursor: 'pointer' }
                    }}
                        key={index}>
                        <Typography variant='subtitle1' onClick={() => handleClick(category)}
                            sx={{ color: selectCategory === category ? '#2a99ff' : '#444444', width: 130, textAlign: 'left', cursor:'pointer' }} >
                            {category?.name}
                        </Typography>
                        <AddCategory parent_id={category?.shop_cate_id} reRender={reRender} setReRender={setReRender} />
                        <UpdateCategory category={category} reRender={reRender} setReRender={setReRender} />
                        <DeleteCategory category_id={category?.shop_cate_id} reRender={reRender} setReRender={setReRender} />
                        <AddProductCate shop_cate_id={category?.shop_cate_id}/>
                        <ViewShopCateProduct shop_cate_id={category?.shop_cate_id}/>
                        {Array.isArray(category?.child_categories) && category.child_categories.length > 0 &&
                            <ArrowForwardIos sx={{ color: '#666666', fontSize: 10 }} />}
                    </Box>
                ))}
            </Box>
            { isReset && Array.isArray(selectCategory?.child_categories) && selectCategory.child_categories.length > 0 && <Box>
                <MenuCategory categories={selectCategory?.child_categories} reRender={reRender} setReRender={setReRender} isReset={isReset} setIsReset={setIsReset}/>
            </Box>}
        </Box>
    )
}

export default MenuCategory