import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import DefaultLayout from './layouts/DefaultLayout'
import { publicRoutes, privateRoutes } from './routers/routes'
import ProtectedRoute from './components/ProtectRoute/ProtectRoute'
import AlertProvider from './components/ShowAlert/ShowAlert'

function App() {
  const keep_login = useSelector(state => state.auth.keep_login)
  return (
    <AlertProvider>
      <ToastContainer />
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            const Layout = route.layout || DefaultLayout
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CircularProgress />
                    Đang tải các tài nguyên vui lòng đợi...
                  </div>}>
                    <Layout>
                      <Page />
                    </Layout>
                  </Suspense>
                }
              />)
          }
          )}
          <Route path="/" element={<ProtectedRoute isAllowed={keep_login} />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout || DefaultLayout
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress />
                      Đang tải các tài nguyên vui lòng đợi...
                    </div>}>
                      <Layout>
                        <Page />
                      </Layout>
                    </Suspense>
                  }
                />
              )
            })}
          </Route>
        </Routes>
      </Router>
    </AlertProvider>
  )
}

export default App
