import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

function ShowAlertContent(content, isFail) {
    const [showAlert, setShowAlert] = useState(true)

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
            <Alert severity={isFail ? 'error' : 'success'} variant='filled' onClose={() => setShowAlert(false)}>
                {content}
            </Alert>
        </Snackbar>
    )
}

export default ShowAlertContent
