import { useEffect, useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import MenuCategory from './MenuCategory/MenuCategory'
import categoryApi from '../../../../../apis/categoryApi'

function SelectCategory({ setCategoryId, product }) {
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(() => {
        categoryApi.getCategories()
            .then((response) => { setCategories(response) })
            .catch(err => console.log(err))
        const deepestCategory = getDeepestCategory(product?.category)
        setCategoryId(deepestCategory?.category_id)
        setSelectedCategories(deepestCategory?.name)
    }, [])
    return (
        <Box >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='subtitle2' sx={{ color: 'red' }}>*</Typography>
                <Typography variant='subtitle2'>Danh mục sản phẩm: </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Paper sx={{ width: '100%', p: 2 }} elevation={4}>
                    <Paper sx={{ borderWidth: 0.5, borderColor: '#CCCCCC' }} variant='outlined'>
                        <MenuCategory categories={categories} setCategoryId={setCategoryId} setSelectedCategories={setSelectedCategories} />
                    </Paper>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Typography variant='subtitle1'>Đang chọn: </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant='subtitle2' color={'#555555'}>{selectedCategories}</Typography>
                            <NavigateNext sx={{ color: '#444444', fontSize: 14 }} />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box >
    )
}

export default SelectCategory
function getDeepestCategory(category) {
    let deepestCategory = category
    while (deepestCategory && deepestCategory.child_categories && deepestCategory.child_categories.length > 0) {
        deepestCategory = deepestCategory.child_categories[0]
    }
    return deepestCategory
}