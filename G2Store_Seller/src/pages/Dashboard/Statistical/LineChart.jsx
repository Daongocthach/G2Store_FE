import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
export default function BasicBarChart({ monthStatisticalRes }) {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0))
  useEffect(() => {
    if (monthStatisticalRes) {
      setMonthlyData([
        monthStatisticalRes?.januaryIncome,
        monthStatisticalRes?.februaryIncome,
        monthStatisticalRes?.marchIncome,
        monthStatisticalRes?.aprilIncome,
        monthStatisticalRes?.mayIncome,
        monthStatisticalRes?.juneIncome,
        monthStatisticalRes?.julyIncome,
        monthStatisticalRes?.augustIncome,
        monthStatisticalRes?.septemberIncome,
        monthStatisticalRes?.octoberIncome,
        monthStatisticalRes?.novemberIncome,
        monthStatisticalRes?.decemberIncome
      ])
    }
  }, [monthStatisticalRes])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={[{ data: monthlyData, label: 'Doanh thu (vnđ)' }]}
        width={700}
        height={500}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode === 'dark' ? 'orange' : 'green'}>Biểu đồ doanh thu trong tháng</Typography>
    </Box>
  )
}