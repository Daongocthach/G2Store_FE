import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ isAllowed }) {
    if (typeof isAllowed === 'undefined') {
        return <div>Loading...</div>
    }
    if (!isAllowed) {
        return <Navigate to={'/'} replace />
    }
    return <Outlet />
}

export default ProtectedRoute