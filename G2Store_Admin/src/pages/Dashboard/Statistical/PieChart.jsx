import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { useSelector } from 'react-redux'

export default function BasicPie() {
  const orders = useSelector((state) => state.orders.orders)
  const currentDate = new Date()

  const currentWeekStartDate = new Date(currentDate)
  currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay())
  currentWeekStartDate.setHours(0, 0, 0, 0)

  const currentWeekEndDate = new Date(currentWeekStartDate)
  currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6)
  currentWeekEndDate.setHours(23, 59, 59, 999)

  const currentWeekOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdDate)
    return orderDate >= currentWeekStartDate && orderDate <= currentWeekEndDate
  })
  const weeklyData = new Array(7).fill(0)

  currentWeekOrders.forEach((order) => {
    const orderDate = new Date(order.createdDate)
    const dayOfWeek = orderDate.getDay()
    weeklyData[dayOfWeek] += 1
  })
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: weeklyData[1], label: 'Monday' },
              { id: 1, value: weeklyData[2], label: 'Tuesday' },
              { id: 2, value: weeklyData[3], label: 'Wednesday' },
              { id: 3, value: weeklyData[4], label: 'Thursday' },
              { id: 4, value: weeklyData[5], label: 'Friday' },
              { id: 5, value: weeklyData[6], label: 'Saturday' },
              { id: 6, value: weeklyData[0], label: 'Sunday' }
            ]
          }
        ]}
        width={500}
        height={300}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode=== 'dark'?'orange':'green'}>Biểu đồ số lượt mua hàng trong tuần</Typography>
    </Box>
  )
}