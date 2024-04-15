import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout