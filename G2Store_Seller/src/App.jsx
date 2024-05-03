import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import DefaultLayout from './layouts/DefaultLayout'
import { publicRoutes, privateRoutes } from './routers/routes'
import ProtectedRoute from './components/ProtectRoute/ProtectRoute'

function App() {
  const keep_login = useSelector(state => state.auth.keep_login)

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
          <Route path="/seller" element={<ProtectedRoute isAllowed={keep_login}/>}>
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
