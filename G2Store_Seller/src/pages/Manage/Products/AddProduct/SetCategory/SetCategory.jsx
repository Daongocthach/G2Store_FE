import { Box, Typography, Stepper, Step, StepLabel, Paper } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MenuCategory from './MenuCategory/MenuCategory'
import { mockData } from '../../../../../apis/mockdata'
import { useState } from 'react'

function SetCategory({ category, setCategory }) {
    const [chooseCategories, setChooseCategories] = useState([])
    return (
        <Box >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='body2' sx={{ color: 'red' }}>*</Typography>
                <Typography variant='body2'>Danh mục sản phẩm: </Typography>
            </Box>
            <Box sx={{ alignItems: 'center', gap: 1, mt: 2 }}>
                <Paper sx={{ width: '100%', height: 200, overflow: 'auto' }} elevation={4}>
                    {Array.isArray(mockData.categories) && mockData.categories.map((category, index) => (
                        <MenuCategory key={index} category={category} />
                    ))}
                </Paper>
                <Stepper activeStep={1} alternativeLabel>
                    {chooseCategories.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Box >
    )
}

export default SetCategory