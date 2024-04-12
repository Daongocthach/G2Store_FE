import { Grid, Chip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
function Data() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [providers, setProviders] = useState([])
    const [promotions, setPromotions] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    var revenue = 0
    orders.forEach(order => {
        if (order?.orderStatus == 'SUCCESS')
            revenue += order?.total
    })
    useEffect(() => {

    }, [])
    return (
        <Grid container spacing={1} mt={2} ml={5}>
            {/* <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Reorder />} label={'Đơn hàng: ' + orders.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Filter9Plus />} label={'Sản phẩm: ' + products.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<AddHomeWork />} label={'Nhà cung cấp: ' + providers.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Category />} label={'Danh mục: ' + categories.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Category />} label={'Danh mục con: ' + subCategories.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<People />} label={'Khách hàng' + users.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Money />} label={'Khuyến mãi: ' + promotions.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Money />} label={'Doanh thu: ' + formatCurrency(revenue)} />
            </Grid> */}
        </Grid>
    )
}

export default Data