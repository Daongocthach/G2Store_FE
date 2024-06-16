import { Grid, Chip } from '@mui/material'
import { Reorder, Money, Storefront, Person } from '@mui/icons-material'
import { formatCurrency } from '../../../utils/price'
function Data() {

    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Money />} label={'Doanh thu: ' + formatCurrency(0)} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reorder />} label={'Tổng số đơn hàng: ' + 0 + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Storefront />} label={'Số lượng người bán: ' + 0 + ' người bán' } />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Person />} label={'Số lượng người dùng: ' + 0 + ' người dùng'} />
            </Grid>
        </Grid>
    )
}

export default Data