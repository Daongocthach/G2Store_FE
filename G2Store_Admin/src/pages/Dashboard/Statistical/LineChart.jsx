import { LineChart } from '@mui/x-charts/LineChart'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
export default function LineChartBasic({ monthStatisticalRes, isCustomer }) {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0))
  useEffect(() => {
    if (monthStatisticalRes) {
      setMonthlyData([
        monthStatisticalRes?.january_count,
        monthStatisticalRes?.february_count,
        monthStatisticalRes?.march_count,
        monthStatisticalRes?.april_count,
        monthStatisticalRes?.may_count,
        monthStatisticalRes?.june_count,
        monthStatisticalRes?.july_count,
        monthStatisticalRes?.august_count,
        monthStatisticalRes?.septemberIncome,
        monthStatisticalRes?.october_count,
        monthStatisticalRes?.november_count,
        monthStatisticalRes?.december_count
      ])
    }
  }, [monthStatisticalRes])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={[{ data: monthlyData, area: true, color: isCustomer ? '#EE7942' : '#1E90FF' }]}
        width={700}
        height={500}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode === 'dark' ? 'orange' : 'green'}>
        {isCustomer ? 'Biểu đồ số lượt người mua hàng đăng ký trong tháng' : 'Biểu đồ số lượt người bán hàng đăng ký trong tháng'}
      </Typography>
    </Box>
  )
}