import { Container, Grid, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import CircleChart from './Statistical/CircleChart'
import Data from './Statistical/Data'
import statisticApi from '../../apis/statisticApi'
import authenApi from '../../apis/authenApi'
import { mockData } from '../../apis/mockdata'

function Dashboard() {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState([])
  const [loading, setLoading] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const handleChange = async (e) => {
    setLoading(true)
    setYear(e.target.value)
    statisticApi.getShopStatistic(parseInt(e.target.value))
      .then((response) => { setData(response) })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
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
  }, [])
  return (
    <Container sx={{ minHeight: '100vh' }}>
      {!loading && <Box>
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

