import { Container, Grid, CircularProgress, Box, Card, CardActionArea, Typography, CardContent } from '@mui/material'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import Data from './Statistical/Data'
import statisticApi from '../../apis/statisticApi'
import { formatCurrency } from '../../utils/price'

function Dashboard() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      statisticApi.getAdminStatistical()
        .then((response) => { setData(response) })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [])

  return (
    <Container sx={{ minHeight: '100vh' }}>
      {!loading && <Box>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent className='flex flex-row items-center'>
              <AccountBalanceWallet className='text-gray-700' sx={{ fontSize: 30 }} />
              <Typography variant="h6" component="div" className='text-gray-700'>
                {'Thu nhập: ' + formatCurrency(data?.income || 0)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Data data={data} />
        <Grid container alignItems={'center'} spacing={3} >
          < Grid item xs={12} sm={12} md={12} lg={6}>
            <LineChart monthStatisticalRes={data?.shop_month_res} />
          </Grid>
          < Grid item xs={12} sm={12} md={12} lg={6}>
            <LineChart monthStatisticalRes={data?.cus_month_res} isCustomer={true} />
          </Grid>
        </Grid>
      </Box>}
      {loading && <CircularProgress />}
    </Container>
  )
}

export default Dashboard

