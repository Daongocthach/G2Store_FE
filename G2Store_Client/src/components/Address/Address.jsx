import { Typography, Box, Chip } from '@mui/material'
import { PersonPin } from '@mui/icons-material'

function Address({ address }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonPin sx={{ fontSize: 40, color: '#5D478B' }} />
            <Box p={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant='subtitle1' fontWeight={500} sx={{ color: '#444444' }}>{address?.receiver_name}</Typography>
                    <Typography variant='subtitle2' fontWeight={500} sx={{ color: '#444444' }}>{address?.receiver_phone_no}</Typography>
                    {address?.is_default && <Chip label='Mặc định' size='small' sx={{ color: 'red', bgcolor: '#fae8e9', fontWeight: 500 }} />}
                </Box>
                <Typography variant='body1'>
                    {address?.province ? (address?.order_receive_address + ', ' + address?.ward + ', ' + address?.district + ', ' + address?.province) : ''}
                </Typography>
            </Box>
        </Box>
    )
}

export default Address