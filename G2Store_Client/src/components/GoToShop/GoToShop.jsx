import { Typography, Box } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import avatarNull from '../../assets/img/avatar.png'

function GoToShop({ shop_id, shop_name, shop_image }) {
    const navigate = useNavigate()

    return (
        <Box className='flex flex-row items-center gap-2 cursor-pointer'
            onClick={() => { navigate('/shop-page', { state: shop_id }) }}>
            <img src={shop_image || avatarNull} style={{ borderRadius: '50%', width: 40, height: 40 }} />
            <Typography fontSize={15} className='text-gray-600' fontWeight={'bold'}>{shop_name || 'Đang cập nhật'}</Typography>
            <NavigateNext className='text-gray-600' sx={{ fontSize: 20 }} />
        </Box>
    )
}

export default GoToShop