import { Typography, Box, Avatar } from '@mui/material'
import { ChatBubbleOutline, AddBusiness } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { mockData } from '../../../apis/mockdata'
function Header({ shop }) {
    const navigate = useNavigate()

    const handleClickChat = () => {
        navigate('/chat', {})
    }
    return (
        <Box className="flex items-center justify-start bg-orange-500 h-30 relative">
            <img src={mockData.images.shopDesign} className="object-cover h-40 w-full" />
            <Box className="absolute flex items-center bg-white h-22 ml-2 p-5 gap-3 rounded-lg flex-wrap">
                <Avatar className="w-12 h-12">
                    <img src={shop?.image} className="object-contain w-full h-full" />
                </Avatar>
                <Box className='w-40'>
                    <Typography variant="h6" className='text-gray-600'>{shop?.name}</Typography>
                    <Typography variant="subtitle2" className='text-gray-600'>Vi phạm: {shop?.violation_point}</Typography>
                </Box>
                <Box className="flex flex-col items-center justify-center cursor-pointer">
                    <ChatBubbleOutline className="text-[#193744]" onClick={handleClickChat} />
                    <Typography variant="subtitle2" className='text-gray-600'>Chat</Typography>
                </Box>
                <Box className="flex flex-col items-center justify-center cursor-pointer">
                    <AddBusiness className="text-[#193744]" />
                    <Typography variant="subtitle2" className='text-gray-600'>Theo dõi</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Header