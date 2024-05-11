import { Box, Typography, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'

function Notification() {
    // const [notifications, setNotifications] = useState([])
    // useEffect(() => {
    //     notificationApi.getAllNotifications()
    //         .then(response => {
    //             setNotifications(response.data)
    //         })
    //         .catch(err => [
    //             console.log(err)
    //         ])
    // }, [])
    return (
        <Box sx={{ m: 10 }}>
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link underline="hover" color="inherit" href="/" variant='subtitle1'> Trang chủ</Link>
                <Link underline="hover" color="inherit" variant='subtitle1' >Thông báo</Link>
            </Breadcrumbs>
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