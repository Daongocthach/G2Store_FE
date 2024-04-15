import { Box } from '@mui/material'
import AppBar from '../components/Appbar/Appbar'
import BoardBar from '../components/BoardBar/BoardBar'
import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
  return (
    <div>
      <AppBar />
      <BoardBar />
      <Box sx={{ minHeight: '100vh' }}>
        {children}
      </Box>
      <Footer />
    </div>
  )
}

export default DefaultLayout