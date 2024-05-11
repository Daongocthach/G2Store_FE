import { useState } from 'react'
import { Box, Menu, MenuItem, Tooltip, IconButton } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'

function FilterReviews({ setSortType }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleSort = (type) => {
        handleClose()
        setSortType(type)
    }
    return (
        <Box>
            <Tooltip title={'Lọc'}><IconButton onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                <FilterAlt /></IconButton></Tooltip>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
                <MenuItem onClick={() => handleSort('')}>Mặc định</MenuItem>
                <MenuItem onClick={() => handleSort('RATING_DESC')}>Sao giảm dần</MenuItem>
                <MenuItem onClick={() => handleSort('RATING_ASC')}>Sao tăng dần</MenuItem>
                <MenuItem onClick={() => handleSort('RECENTLY')}>Gần nhất</MenuItem>
            </Menu>
        </Box>
    )
}

export default FilterReviews