import { Container, Grid } from '@mui/material'
import LineChart from './Statistical/LineChart'
import CircleChart from './Statistical/CircleChart'
import Data from './Statistical/Data'

function Dashboard() {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Data />
      <Grid container alignItems={'center'} spacing={3} mt={2}>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <LineChart />
        </Grid>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <CircleChart />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard