import { Snackbar, Alert } from '@mui/material'

function ShowAlert({ showAlert, setShowAlert, content, isFail }) {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showAlert} autoHideDuration={2000} onClose={() => setShowAlert(false)}>
            <Alert severity={isFail ? 'error' : 'success'} variant='filled' onClose={() => setShowAlert(false)}>
                {content}
            </Alert>
        </Snackbar>
    )
}

export default ShowAlert