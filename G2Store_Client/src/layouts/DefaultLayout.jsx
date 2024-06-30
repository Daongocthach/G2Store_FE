import { Box } from '@mui/material'
import AppBar from '../components/Appbar/Appbar'
import BoardBar from '../components/BoardBar/BoardBar'
import Footer from '../components/Footer/Footer'
import SpeedDialTooltipOpen from '../components/SpeedDial/SpeedDial'

function DefaultLayout({ children }) {
  return (
    <div>
      <AppBar />
      <BoardBar />
      <Box sx={{ minHeight: '100vh' }}>
        {children || <div></div>}
      </Box>
      <SpeedDialTooltipOpen />
      <Footer />
    </div>
  )
}

export default DefaultLayout