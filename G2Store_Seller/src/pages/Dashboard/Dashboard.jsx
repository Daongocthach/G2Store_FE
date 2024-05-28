import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import CircleChart from './Statistical/CircleChart'
import Data from './Statistical/Data'
import statisticApi from '../../apis/statisticApi'
import authenApi from '../../apis/authenApi'

function Dashboard() {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState([])
  useEffect(() => {
    statisticApi.getShopStatistic()
      .then((response) => {
        setData(response)
      })
    authenApi.me()
      .then((response) => {
        setBalance(response?.shop?.balance)
      })
  }, [])
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Data data={data} balance={balance} />
      <Grid container alignItems={'center'} spacing={3} mt={2}>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <LineChart monthStatisticalRes={data?.monthStatisticalRes} />
        </Grid>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <CircleChart dayStatistical={data?.dayStatistical} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard