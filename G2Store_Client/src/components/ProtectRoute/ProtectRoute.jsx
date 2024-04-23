import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ isAllowed, redirectPath = '/login' }) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRoute