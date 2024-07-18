import { useState } from 'react'
import { Box, Typography, BottomNavigation, BottomNavigationAction, IconButton, Button } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, YouTube, Image } from '@mui/icons-material'

function LeftInformation({ product }) {
    const [index, setIndex] = useState(0)
    const [bottomTab, setBottomTab] = useState(0)
    const imageFiles = product?.images?.filter(file => file.file_type.includes('image/')) || []
    const videoFiles = product?.images?.filter(file => file.file_type.includes('video/')) || []
    const currentFiles = bottomTab === 0 ? imageFiles : videoFiles
    const [showFullText, setShowFullText] = useState(false)

    const handleToggleText = () => {
        setShowFullText(!showFullText)
    }
    const textToDisplay = showFullText ? product?.description : `${product?.description?.substring(0, 200)}...`
    return (
        <Box>
            <Box sx={{ width: '90%', height: '350px', position: 'relative', bgcolor: '#E6E6FA', borderRadius: 2, p: 1 }}>
                <Box sx={{
                    width: '100%', height: '100%', transition: 'transform 0.5s ease',
                    transform: 'translateX(0)'
                }}>
                    {bottomTab === 0 && currentFiles[index]?.file_type.includes('image/') &&
                        <img src={currentFiles[index]?.file_url} alt='product'
                            className="top-0 left-0 w-full h-full object-contain transition-transform duration-500" />}
                    {bottomTab === 1 && currentFiles[index]?.file_type.includes('video') &&
                        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
                            <video controls className="absolute top-0 left-0 w-full h-full object-contain">
                                <source src={currentFiles[index]?.file_url} type="video/mp4" />
                            </video>
                        </div>}
                </Box>
                {index > 0 && <IconButton color="secondary"
                    sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '10%', bgcolor: '#FFFFFF' }} onClick={() => { setIndex(index - 1) }}>
                    <ArrowBackIos sx={{ fontSize: 20, color: '#84898e' }} /></IconButton>}
                {index < currentFiles.length - 1 && <IconButton color='secondary'
                    sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', opacity: 0.8, left: '90%', bgcolor: '#FFFFFF' }} onClick={() => { setIndex(index + 1) }}>
                    <ArrowForwardIos sx={{ fontSize: 20, color: '#84898e' }} /></IconButton>}
            </Box>
            <Box>
                <BottomNavigation sx={{ bgcolor: '#E6E6FA', width: '90%', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }}
                    showLabels value={bottomTab} onChange={(event, newValue) => { setBottomTab(newValue), setIndex(0) }}>
                    <BottomNavigationAction label={'Hình ảnh (' + imageFiles.length + ')'} icon={<Image sx={{ fontSize: 40 }} />} />
                    <BottomNavigationAction label={'Video (' + videoFiles.length + ')'} icon={<YouTube sx={{ fontSize: 40 }} />} />
                </BottomNavigation>
            </Box>
            <Typography variant='h5' mt={2} fontWeight={'bold'} color={'#444444'}>Thông tin sản phẩm</Typography>
            <Typography variant='subtitle1' color='#444444' letterSpacing={0.5} align='justify' sx={{ whiteSpace: 'pre-wrap' }}>
                {textToDisplay}
            </Typography>
            <Box className='flex flex-row items-center justify-center w-full'>
                <Button onClick={handleToggleText} color='primary'>
                    {showFullText ? 'Thu gọn' : 'Xem thêm'}
                </Button>
            </Box>
        </Box>
    )
}

export default LeftInformation
