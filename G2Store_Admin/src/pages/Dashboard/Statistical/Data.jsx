import { Grid, Chip } from '@mui/material'
import { Storefront, Person } from '@mui/icons-material'
function Data({ data }) {
    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Storefront />} label={'Số lượng shop: ' + data?.shop_count + ' shop'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Person />} label={'Số lượng người dùng: ' + data?.customer_count + ' người dùng'} />
            </Grid>
        </Grid>
    )
}

export default Data