import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

export default function CircleChart({ dayStatistical }) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 430 }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: dayStatistical?.mondayIncome, label: 'Thứ 2' },
              { id: 1, value: dayStatistical?.tuesdayIncome, label: 'Thứ 3' },
              { id: 2, value: dayStatistical?.wednesdayIncome, label: 'Thứ 4' },
              { id: 3, value: dayStatistical?.thursdayIncome, label: 'Thứ 5' },
              { id: 4, value: dayStatistical?.fridayIncome, label: 'Thứ 6' },
              { id: 5, value: dayStatistical?.saturdayIncome, label: 'Thứ 7' },
              { id: 6, value: dayStatistical?.sundayIncome, label: 'Chủ nhật' }
            ]
          }
        ]}
        width={500}
        height={300}
      />
      <Typography variant='h6' fontWeight={'bold'} color={(theme) => theme.palette.mode === 'dark' ? 'orange' : 'green'}>Biểu đồ doanh thu trong tuần</Typography>
    </Box>
  )
}