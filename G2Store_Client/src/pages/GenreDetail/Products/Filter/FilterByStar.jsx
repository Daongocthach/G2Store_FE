import { Rating, Box, Typography } from '@mui/material'

function FilterByStar({ setStar }) {
    const handleClick = (value) => {
        setStar(value)
    }
    return (
        <Box className='flex flex-col gap-2'>
            <Typography variant='subtitle1' fontWeight={'bold'} >Đánh giá</Typography>
            <Box className='flex flex-row items-center gap-1 cursor-pointer' onClick={() => handleClick(5)} >
                <Rating size='medium' precision={1} value={5} readOnly />
                <Typography variant='body1' className='text-gray-700'>5 sao</Typography>
            </Box>
            <Box className='flex flex-row items-center gap-1 cursor-pointer' onClick={() => handleClick(4)}>
                <Rating size='medium' precision={1} value={4} readOnly />
                <Typography variant='body1' className='text-gray-700'>Trở lên</Typography>
            </Box>
            <Box className='flex flex-row items-center gap-1 cursor-pointer' onClick={() => handleClick(3)} >
                <Rating size='medium' precision={1} value={3} readOnly />
                <Typography variant='body1' className='text-gray-700'>Trở lên</Typography>
            </Box>
            <Box className='flex flex-row items-center gap-1 cursor-pointer' onClick={() => handleClick(2)}>
                <Rating size='medium' precision={1} value={2} readOnly />
                <Typography variant='body1' className='text-gray-700'>Trở lên</Typography>
            </Box>
            <Box className='flex flex-row items-center gap-1 cursor-pointer' onClick={() => handleClick(1)}>
                <Rating size='medium' precision={1} value={1} readOnly />
                <Typography variant='body1' className='text-gray-700'>Trở lên</Typography>
            </Box>

        </Box>
    )
}

export default FilterByStar