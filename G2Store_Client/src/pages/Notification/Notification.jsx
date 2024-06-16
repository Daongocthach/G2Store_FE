import { Box } from '@mui/material'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
function Notification() {

    return (
        <Box sx={{ m: 10 }}>
            <BreadCrumbs links={[{ name: 'Thông báo', href: '' }]} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <img src='https://phanphoiled.net/wp-content/uploads/2019/10/den-led-tron-rang-dong-A70N1-12w-gia-bong-den-led-rang-dong.jpg' alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://loyaltynetwork.com.vn/wp-content/uploads/2021/06/buy2get1-2048x1279.jpg' alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://iwater.vn/Image/Picture/New/khuyen_mai_nuoc_top_1.jpg' alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
                <img src='https://loyaltynetwork.com.vn/wp-content/uploads/2021/06/cac-hinh-thuc-khuyen-mai-doc-dao.jpg' alt='image'
                    style={{ objectFit: 'cover', borderRadius: '5px', height: '200px', with: '200px' }} />
            </Box>
        </Box>
    )
}

export default Notification