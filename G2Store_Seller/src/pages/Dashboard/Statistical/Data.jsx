import { Grid, Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { Reorder, Money, LocalShipping, ViewWeek, Today, Reviews, Grading, CalendarMonth } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
function Data({ data }) {

    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Money />} label={'Doanh thu: ' + formatCurrency(0)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Today />} label={'Thu nhập ngày: ' + formatCurrency(data.dayIncome)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<ViewWeek />} label={'Thu nhập tuần: ' + formatCurrency(data.weekIncome)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<CalendarMonth />} label={'Thu nhập tháng: ' + formatCurrency(data.monthIncome)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reorder />} label={'Đơn chưa xử lý: ' + data.unHandledOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<LocalShipping />} label={'Đơn đang giao: ' + data.onDeliveredOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Grading />} label={'Đơn thành công: ' + data.successOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reviews/>} label={'Đơn chưa đánh giá: ' + data.unReviewedOrderCount + ' đơn'} />
            </Grid>
        </Grid>
    )
}

export default Data