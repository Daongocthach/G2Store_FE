import { LineChart } from '@mui/x-charts/LineChart'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
export default function BasicLineChart() {
  var monthlyData = new Array(12).fill(0)
  const orders = useSelector(state => state.orders.orders)
  orders.forEach((order) => {
    const date = new Date(order.createdDate)
    const month = date.getMonth()
    monthlyData[month] += 1
  })
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'Tháng' }]}
        yAxis={[{ label: 'Lượt mua hàng' }]}
        series={[{ data: monthlyData }]}
        width={700}
        height={500}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode=== 'dark'?'orange':'green'}>Biểu đồ số lượt mua hàng trong tháng</Typography>
    </Box>
  )
}