import { Container } from '@mui/material'
import Advertisement from './Advertisement/Advertisement'
import BestProducts from './BestProducts/BestProducts'

function Dashboard() {
  return (
    <Container sx={{ mb: 2, mt: 2, borderRadius: 5, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#fff2eb') }}>
      <Advertisement/>
      <BestProducts/>
    </Container>
  )
}

export default Dashboard