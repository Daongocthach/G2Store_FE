import { Alert, AlertTitle, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import PageNotFound from '../../assets/img/PageNotFound.png'
const NotFound = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={PageNotFound} alt='Page Not Found' style={{ height: 300, width: 400 }} />
            <Alert severity="error">
                <AlertTitle>404 Error Missing Url</AlertTitle>
                You’re either misspelling the URL — <strong>check it out!</strong>
                <br />

            </Alert>
            <Link to={'/'}>
                <Button sx={{ color: 'orange', ':hover': { bgcolor: 'pink' } }}>Back to Home</Button>
            </Link>
        </Box>

    )
}

export default NotFound