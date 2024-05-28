import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { useEffect, useState } from 'react'

export default function CircleChart({ orders }) {
  const [weeklyData, setWeeklyData] = useState(new Array(7).fill(0))
  useEffect(() => {
    if (Array.isArray(orders)) {
      const currentDate = new Date()
      const currentWeekStartDate = new Date(currentDate);
      currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay())
      currentWeekStartDate.setHours(0, 0, 0, 0)
      const currentWeekEndDate = new Date(currentWeekStartDate)
      currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6)
      currentWeekEndDate.setHours(23, 59, 59, 999)

      const currentWeekOrders = orders.filter((order) => {
        const orderDate = new Date(order?.created_date)
        return orderDate >= currentWeekStartDate && orderDate <= currentWeekEndDate
      });

      const newWeeklyData = new Array(7).fill(0)
      currentWeekOrders.forEach((order) => {
        const orderDate = new Date(order?.created_date)
        const dayOfWeek = orderDate.getDay()
        newWeeklyData[dayOfWeek] += 1
      })

      setWeeklyData(newWeeklyData)
    }
  }, [orders])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: weeklyData[1], label: 'Thứ 2' },
              { id: 1, value: weeklyData[2], label: 'Thứ 3' },
              { id: 2, value: weeklyData[3], label: 'Thứ 4' },
              { id: 3, value: weeklyData[4], label: 'Thứ 5' },
              { id: 4, value: weeklyData[5], label: 'Thứ 6' },
              { id: 5, value: weeklyData[6], label: 'Thứ 7' },
              { id: 6, value: weeklyData[0], label: 'Chủ nhật' }
            ]
          }
        ]}
        width={500}
        height={300}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode === 'dark' ? 'orange' : 'green'}>Biểu đồ số lượt mua hàng trong tuần</Typography>
    </Box>
  )
}