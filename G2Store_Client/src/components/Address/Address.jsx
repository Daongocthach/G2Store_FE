import { Typography, Box, Chip } from '@mui/material'
import { PersonPin } from '@mui/icons-material'

function Address({ address }) {
    return (
        <Box className="flex items-center gap-2">
            <PersonPin className="text-purple-600" sx={{ fontSize: 40 }} />
            <Box p={1}>
                <Box className="flex items-center gap-2">
                    <Typography variant="subtitle1" fontWeight={500} className="text-gray-700">{address?.receiver_name}</Typography>
                    <Typography variant="subtitle2" fontWeight={500} className="text-gray-700">{address?.receiver_phone_no}</Typography>
                    {address?.is_default && <Chip label="Mặc định" size="small" color='error' variant='outlined' className="font-semibold" />}
                </Box>
                <Typography className="text-gray-700" sx={{ fontSize: 14 }}>
                    {address?.province_id ? `${address?.order_receive_address}, ${address?.ward_name}, ${address?.district_name}, ${address?.province_name}` : ''}
                </Typography>
            </Box>
        </Box>

    )
}

export default Address