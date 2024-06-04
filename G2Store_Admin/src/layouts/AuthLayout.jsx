import Footer from '../components/Footer/Footer'

function AuthLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default AuthLayout