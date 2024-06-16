/* eslint-disable react/no-unknown-property */
import { Box, Typography } from '@mui/material'
export default function Banner() {
    return (
        <Box className='w-full h-10 bg-sky-400 rounded-sm flex-row items-center flex mt-1 justify-center mb-2'>
            <Typography className='flex-1 text-center text-white'>
                <marquee scrollamount="3">$ 30 ngày đổi ý & Miễn phí trả hàng</marquee>
            </Typography>
            <Typography className='flex-1 text-center text-white'>
                <marquee scrollamount="3">& Giao hàng tận nơi - Đổi trả dễ dàng</marquee>
            </Typography>
        </Box>

    )
}
