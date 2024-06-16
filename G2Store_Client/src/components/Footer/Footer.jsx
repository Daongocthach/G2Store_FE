import { Box, Grid, InputBase, Paper, IconButton, Typography } from '@mui/material'
import { YouTube, Facebook, Twitter, Google, Send } from '@mui/icons-material'
export default function Footer() {

    return (
        <Box className='bg-gray-800 flex flex-row items-center justify-center p-2 w-full' sx={{
            bottom: 0, height: (theme) => theme.webCustom.footerHeight
        }} >
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
             className='text-white'>
                <Grid item xs={4} sm={8} md={12}>
                    <Typography variant='h4' className='text-orange-500' sx={{ fontWeight: 'bold', fontFamily: 'Merriweather", serif' }}>G2Store</Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Liên hệ: 0373060206
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    Báo lỗi dịch vụ
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Sản phẩm
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Đăng ký
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Email: ngocthach752@gmail.com
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Giới thiệu
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Khuyến mãi
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    <Paper component="form" className='flex flex-row items-center w-36 h-8' >
                        <InputBase placeholder="Gửi email" sx={{ ml: 1 }} />
                        <IconButton type="button" className='p-3'>
                            <Send />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Địa chỉ: Thành phố Thủ Đức, <br /> Thành Phố Hồ Chí Minh
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                    Chính sách bảo mật
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    Trang chủ
                </Grid>
                <Grid item xs={2} sm={4} md={3} display={{ xs: 'none', md: 'inherit' }}>
                    <YouTube /><Facebook /><Twitter /><Google />
                </Grid>
            </Grid>
        </Box>
    )
}
