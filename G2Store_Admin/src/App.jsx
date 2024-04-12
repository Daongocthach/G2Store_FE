import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import DefaultLayout from './layouts/DefaultLayout'
import { publicRoutes, privateRoutes } from './routers/routes'
import ProtectedRoute from './components/ProtectRoute/ProtectRoute'

function App() {
  const atk = useSelector(state => state.auth.atk)
  return (
    <div>
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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />)
          }
          )}
          <Route path="/admin" element={<ProtectedRoute isAllowed={atk} />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout || DefaultLayout
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
