import { useState } from 'react'
import { Box, Typography, BottomNavigation, BottomNavigationAction, IconButton } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, YouTube, Image } from '@mui/icons-material'
function LeftInformation({ product }) {
  const [index, setIndex] = useState(0)
  const [bottomTab, setBottomTab] = useState(0)
    return (
        <Box >
            <Box sx={{ width: '90%', height: '350px', position: 'relative', bgcolor: '#E6E6FA', borderRadius: 2, p: 1 }} >
                <Box sx={{
                    width: '100%', height: '100%', transition: 'transform 0.5s ease',
                    transform: 'translateX(0)'
                }}>
                    {bottomTab == 0 &&
                        <img src={product?.images[index]?.file_url} alt='product' loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s' }} />}
                    {bottomTab == 1 && <video controls width="100%" height='100%'>
                        <source src={product?.images[index]?.file_url} type="video/mp4" />
                    </video>}
                </Box>
                {bottomTab == 0 && index > 0 && <IconButton color="secondary"
                    sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '10%', bgcolor: '#FFFFFF' }} onClick={() => { setIndex(index - 1) }}>
                    <ArrowBackIos sx={{ fontSize: 20, color: '#84898e' }} /></IconButton>}
                {bottomTab == 0 && index < product?.images.length - 1 && <IconButton color='secondary'
                    sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', opacity: 0.8, left: '90%', bgcolor: '#FFFFFF' }} onClick={() => { setIndex(index + 1) }}>
                    <ArrowForwardIos sx={{ fontSize: 20, color: '#84898e' }} /></IconButton>}
            </Box>
            <Box >
                <BottomNavigation sx={{ bgcolor: '#E6E6FA', width: '90%', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }}
                    showLabels value={bottomTab} onChange={(event, newValue) => { setBottomTab(newValue) }} >
                    <BottomNavigationAction label={'Hình ảnh' + ' (' + product?.images.length + ')'} icon={<Image sx={{ fontSize: 40 }} />} />
                    <BottomNavigationAction label={'Video' + ' (' + 0 + ')'} icon={<YouTube sx={{ fontSize: 40 }} />} />
                </BottomNavigation>
            </Box>
            <Typography variant='h5' mt={2} fontWeight={'bold'} color={'#444444'}>Thông tin sản phẩm</Typography>
            <Typography variant='subtitle1' color={'#444444'} > {product?.description}</Typography>
        </Box>
    )
}

export default LeftInformation