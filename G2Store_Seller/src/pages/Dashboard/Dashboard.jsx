import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import PieChart from './Statistical/PieChart'
import Data from './Statistical/Data'
import orderApi from '../../apis/orderApi'
import statisticApi from '../../apis/statisticApi'

function Dashboard() {
  const [orders, setOrders] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    statisticApi.getShopStatistic()
      .then((response) => {
        setData(response)
      })
  }, [])
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Data data={data}/>
      <Grid container alignItems={'center'} spacing={3} mt={2}>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <LineChart />
        </Grid>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <PieChart />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard