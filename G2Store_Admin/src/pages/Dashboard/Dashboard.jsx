import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import LineChart from './Statistical/LineChart'
import CircleChart from './Statistical/CircleChart'
import Data from './Statistical/Data'
import orderApi from '../../apis/orderApi'
import sellerApi from '../../apis/sellerApi'
import customerApi from '../../apis/userApi'

function Dashboard() {
  const [sellers, setSellers] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    orderApi.getOrders()
      .then((response) => {
        setOrders(response)
      })
    sellerApi.getSellers()
    .then((response) => {
      setSellers(response)
    })
    customerApi.getCustomers()
    .then((response) => {
      setUsers(response)
    })
  }, [])
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Data users={users} sellers={sellers} orders={orders}/>
      <Grid container alignItems={'center'} spacing={3} mt={2}>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <LineChart orders={orders}/>
        </Grid>
        < Grid item xs={12} sm={12} md={6} lg={6}>
          <CircleChart orders={orders}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard