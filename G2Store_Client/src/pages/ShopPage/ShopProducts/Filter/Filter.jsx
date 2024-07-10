import { useState } from 'react'
import { FilterAlt, PlayCircle } from '@mui/icons-material'
import { IconButton, Typography, Popover, Box, TextField, Button } from '@mui/material'
import FilterByPrice from './Filters/FilterByPrice'

function Filter({ name, setName, isFilter, setIsFilter, startPrice, setStartPrice, endPrice, setEndPrice }) {
  const [tempName, setTempName] = useState(name || '')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSearch = () => {
    setName(tempName)
    setIsFilter(!isFilter)
  }
  return (
    <Box>
      <IconButton size='small' onClick={handleClick}>
        <Typography className='text-gray-600'>Bộ lọc</Typography>
        <FilterAlt className='text-gray-600' />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
        <Box className='flex flex-col gap-2 p-2'>
          <TextField type='search' variant='outlined' size='small' placeholder="Nhập tên sản phẩm" value={tempName}
            className='bg-blue-50' onChange={(e) => setTempName(e?.target?.value)} onFocus={(e) => e.target.select()} />
          <FilterByPrice startPrice={startPrice} setStartPrice={setStartPrice}
            endPrice={endPrice} setEndPrice={setEndPrice} />
          <Button startIcon={<PlayCircle />} onClick={handleSearch}
            fullWidth variant='contained' size='small' sx={{ mt: 1 }}>Tìm kiếm</Button>
        </Box>
      </Popover>
    </Box >
  )
}

export default Filter