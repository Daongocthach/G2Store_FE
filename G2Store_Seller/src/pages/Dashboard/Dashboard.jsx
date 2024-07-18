import {
  Container, Grid, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem,
  Card, CardActionArea, Typography, CardContent
} from '@mui/material'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import CircleChart from './Statistical/CircleChart'
import Data from './Statistical/Data'
import statisticApi from '../../apis/statisticApi'
import authenApi from '../../apis/authenApi'
import { mockData } from '../../apis/mockdata'
import { formatCurrency } from '../../utils/price'

function Dashboard() {
  const [data, setData] = useState({})
  const [balance, setBalance] = useState([])
  const [loading, setLoading] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const handleChange = async (e) => {
    setLoading(true)
    setYear(e.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      statisticApi.getShopStatistic(parseInt(year))
        .then((response) => { setData(response) })
      authenApi.me()
        .then((response) => { setBalance(response?.shop?.balance) })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [year])

  return (
    <Container sx={{ minHeight: '100vh' }}>
      {!loading && <Box>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent className='flex flex-row items-center'>
              <AccountBalanceWallet className='text-gray-700' sx={{ fontSize: 30}}/>
              <Typography variant="h6" component="div" className='text-gray-700'>
                {'Số dư ví: ' + formatCurrency(balance || 0)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Data data={data} balance={balance} />
        <FormControl sx={{ mt: 3 }} size='small'>
          <InputLabel>Năm</InputLabel>
          <Select value={year} label="Năm" onChange={(e) => handleChange(e)} >
            {mockData?.years.map((year, index) => (
              <MenuItem key={index} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container alignItems={'center'} spacing={3} >
          < Grid item xs={12} sm={12} md={6} lg={6}>
            <LineChart monthStatisticalRes={data?.monthStatisticalRes} />
          </Grid>
          < Grid item xs={12} sm={12} md={6} lg={6}>
            <CircleChart dayStatistical={data?.dayStatistical} />
          </Grid>
        </Grid>
      </Box>}
      {loading && <CircularProgress />}
    </Container>
  )
}

export default Dashboard

