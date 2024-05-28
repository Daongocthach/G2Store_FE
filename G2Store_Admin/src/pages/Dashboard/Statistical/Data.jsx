import { Grid, Chip } from '@mui/material'
import { Reorder, Money, Storefront, Person } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
function Data({ orders, sellers, users }) {
    var revenue = 0
    orders.forEach(order => {
        if (order?.order_status === 'RECEIVED') {
            revenue += order?.total * 2 / 100 || 0
        }
    })
    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Money />} label={'Doanh thu: ' + formatCurrency(revenue)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reorder />} label={'Tổng số đơn hàng: ' + (Array.isArray(orders) ? orders.length : 0) + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Storefront />} label={'Số lượng người bán: ' + (Array.isArray(sellers) ? sellers.length : 0) + ' người bán' } />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Person />} label={'Số lượng người dùng: ' + (Array.isArray(users) ? users.length : 0) + ' người dùng'} />
            </Grid>
        </Grid>
    )
}

export default Data