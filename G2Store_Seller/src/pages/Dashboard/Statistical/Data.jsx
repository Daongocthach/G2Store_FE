import { Grid, Chip } from '@mui/material'
import { Reorder, LocalShipping, Category, RemoveCircleOutline, HighlightOff, Reviews, Grading } from '@mui/icons-material'
function Data({ data }) {
    return (
        <Grid container spacing={1} mt={2} >
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Category />} label={'Sản phẩm: ' + data?.onSaleProductCount + ' sản phẩm'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<RemoveCircleOutline />} label={'Sản phẩm hết hàng: ' + data?.outOfStockProductCount + ' sản phẩm'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reorder />} label={'Đơn chưa xử lý: ' + data?.unHandledOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<LocalShipping />} label={'Đơn đang giao: ' + data?.onDeliveredOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Grading />} label={'Đơn thành công: ' + data?.successOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<Reviews />} label={'Đơn chưa đánh giá: ' + data.unReviewedOrderCount + ' đơn'} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} >
                <Chip icon={<HighlightOff />} label={'Đơn bị hủy: ' + data?.canceledOrderCount + ' đơn'} />
            </Grid>
        </Grid>
    )
}

export default Data