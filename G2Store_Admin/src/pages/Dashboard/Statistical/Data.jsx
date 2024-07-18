import { Grid, Chip } from '@mui/material'
import { Storefront, Person, Today } from '@mui/icons-material'
function Data({ data }) {
    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={16} md={6} lg={6} >
                <Chip icon={<Storefront className='text-gray-600' sx={{ fontSize: 30 }} />} sx={{ fontSize: 16, color: '#444444' }}
                    label={'Số lượng shop: ' + data?.shop_count} />
            </Grid>
            <Grid item xs={12} sm={16} md={6} lg={6} >
                <Chip icon={<Person className='text-gray-600' sx={{ fontSize: 30 }} />} sx={{ fontSize: 16, color: '#444444' }}
                    label={'Số lượng người mua hàng: ' + data?.customer_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <Chip icon={<Today className='text-gray-600' sx={{ fontSize: 30 }} />} sx={{ fontSize: 16, color: '#444444' }}
                    label={'Shop đăng ký hôm nay: ' + data?.today_shop_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} >
                <Chip icon={<Today className='text-gray-600' sx={{ fontSize: 30 }} />} sx={{ fontSize: 16, color: '#444444' }}
                    label={'Người mua hàng đăng ký hôm nay: ' + data?.today_cus_count} />
            </Grid>
        </Grid>
    )
}

export default Data