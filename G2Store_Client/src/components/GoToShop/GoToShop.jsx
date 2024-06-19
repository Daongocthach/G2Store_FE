import { Typography, Box } from '@mui/material'
import { NavigateNext, Storefront } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function GoToShop({ shop_id, shop_name, shop_image }) {
    const navigate = useNavigate()
    return (
        <Box className='flex flex-row items-center gap-2 cursor-pointer'
            onClick={() => { navigate('/shop-page', { state: shop_id }) }}>
            {shop_image ?
                <img src={shop_image} className='rounded-s-full w-10 h-10' />
                :
                <Storefront sx={{ fontSize: 25 }} className='text-gray-600'/>
            }
            <Typography fontSize={15} className='text-gray-600' fontWeight={'bold'}>{shop_name || 'Đang cập nhật'}</Typography>
            <NavigateNext className='text-gray-600' sx={{ fontSize: 20 }} />
        </Box>
    )
}

export default GoToShop