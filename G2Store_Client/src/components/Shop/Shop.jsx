import { Typography, Button } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import avatarNull from '../../assets/img/avatar.png'

function Shop({ shop_id, shop_name, shop_image }) {
    const navigate = useNavigate()

    return (
        <Button sx={{ gap: 2, bgcolor: 'inherit', ':hover': { bgcolor: 'inherit' } }}
            onClick={() => { navigate('/shop-page', { state: shop_id }) }}>
            {/* <Storefront sx={{ fontSize: 25, color: '#444444' }} /> */}
            <img src={shop_image || avatarNull} style={{ borderRadius: '50%', width: 40, height: 40 }} />
            <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#444444' }}>{shop_name || 'Đang cập nhật'}</Typography>
            <NavigateNext sx={{ fontSize: 25, color: '#444444' }} />
        </Button>
    )
}

export default Shop