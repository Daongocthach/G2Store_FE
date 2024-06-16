import { createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
const AlertContext = createContext()
const AlertProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('')
    const [isFail, setIsFail] = useState(false)
    const [isWarning, setIsWarning] = useState(false)
    const triggerAlert = (content, fail, warning) => {
        setAlertContent(content)
        setIsFail(fail)
        setIsWarning(warning)
        setShowAlert(true)
    }
    return (
        <AlertContext.Provider value={triggerAlert}>
            {children}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showAlert} autoHideDuration={1000} onClose={() => setShowAlert(false)}>
                <Alert severity={isFail ? 'error' : isWarning ? 'warning' : 'success'} variant='filled' onClose={() => setShowAlert(false)}>
                    {alertContent}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )
}
export default AlertProvider
export const useAlert = () => {
    return useContext(AlertContext)
}
