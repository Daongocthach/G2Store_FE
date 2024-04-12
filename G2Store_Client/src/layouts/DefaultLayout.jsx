import AppBar from '../components/Appbar/Appbar'
import BoardBar from '../components/BoardBar/BoardBar'
import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
  return (
    <div>
      <AppBar />
      <BoardBar/>
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout