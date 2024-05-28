import { LineChart } from '@mui/x-charts/LineChart'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
export default function BasicLineChart({ orders }) {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0))
  useEffect(() => {
    if (Array.isArray(orders)) {
      const newMonthlyData = new Array(12).fill(0)
      orders.forEach((order) => {
        if (order?.created_date) {
          const date = new Date(order?.created_date)
          const month = date.getMonth()
          newMonthlyData[month] += 1
        }
      })
      setMonthlyData(newMonthlyData)
    }
  }, [orders]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'Tháng' }]}
        yAxis={[{ label: 'Lượt mua hàng' }]}
        series={[{ data: monthlyData }]}
        width={700}
        height={500}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode === 'dark' ? 'orange' : 'green'}>Biểu đồ số lượt mua hàng trong tháng</Typography>
    </Box>
  )
}