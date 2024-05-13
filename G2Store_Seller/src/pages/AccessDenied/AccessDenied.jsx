import { Alert, AlertTitle, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import accessDenied from '../../assets/img/accessDenied.jpg'
const AccessDenied = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={accessDenied} alt='Page Not Found' style={{ height: 200, width: 200, borderRadius: 5 }} />
            <Alert severity="error">
                <AlertTitle>Bạn không được cấp quyền truy cập tài nguyên này</AlertTitle>
                Liên hệ với người quản lý của shop — <strong>check it o!</strong>
            </Alert>
            <Link to={'/'}>
                <Button sx={{ color: 'orange', ':hover': { bgcolor: 'pink' } }}>Back to Home</Button>
            </Link>
        </Box>

    )
}

export default AccessDenied