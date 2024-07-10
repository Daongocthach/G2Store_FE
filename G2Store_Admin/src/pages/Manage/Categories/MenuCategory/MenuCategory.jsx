import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import AddCategory from '../FormCategory/AddCategory'
import DeleteCategory from '../FormCategory/DeleteCategory'
import UpdateCategory from '../FormCategory/UpdateCategory'

function MenuCategory({ categories, reRender, setReRender, isReset, setIsReset }) {
    const [selectCategory, setSelectCategory] = useState()
    const handleClick = (category) => {
        if (category?.path && category?.path.split('/').length - 1 <= 5) {
            setIsReset(true)
        }
        else {
            setIsReset(false)
        }
        setSelectCategory(category)
    }
    return (
        <Box className="flex">
            <Box className="pt-1 pl-1 flex flex-col gap-1">
                {Array.isArray(categories) && categories.map((category, index) => (
                    <Box className="flex gap-1 items-center text-gray-700 hover:bg-inherit" key={index} 
                    sx={{
                        display: 'flex', gap: 1, alignItems: 'center', color: '#555555', ':hover': { bgcolor: 'inherit' },
                        '&:hover .action-buttons': { visibility: 'visible', bgcolor: 'inherit', cursor: 'pointer' }
                    }}>
                        <Typography variant="body1" onClick={() => handleClick(category)}
                            className={`cursor-pointer text-left w-52 ${selectCategory === category ? 'text-blue-600' : 'text-gray-800'}`}>
                            {category?.name}
                        </Typography>
                        <AddCategory
                            parent_id={category?.category_id}
                            reRender={reRender}
                            setReRender={setReRender}
                        />
                        <UpdateCategory
                            category={category}
                            reRender={reRender}
                            setReRender={setReRender}
                        />
                        <DeleteCategory
                            category_id={category?.category_id}
                            reRender={reRender}
                            setReRender={setReRender}
                        />
                        {Array.isArray(category?.child_categories) &&
                            category.child_categories.length > 0 && (
                                <ArrowForwardIos className="text-gray-700" sx={{ fontSize: 13 }} />
                            )}
                    </Box>
                ))}
            </Box>
            {isReset &&
                Array.isArray(selectCategory?.child_categories) &&
                selectCategory.child_categories.length > 0 && (
                    <Box>
                        <MenuCategory
                            categories={selectCategory?.child_categories}
                            reRender={reRender}
                            setReRender={setReRender}
                            isReset={isReset}
                            setIsReset={setIsReset}
                        />
                    </Box>
                )}
        </Box>

    )
}

export default MenuCategory