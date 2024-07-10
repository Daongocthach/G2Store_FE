import { Typography, Grid, Box, Input } from '@mui/material'
import CardProduct from '../../../components/Product/CardProduct'
import EmptyData from '../../../components/EmptyData/EmptyData'

function ShopInfo({ shop, top5products }) {
    return (
        <Box>
            <Box className="flex flex-row items-center md:flex-row gap-1 mt-1 mb-1">
                <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Tên shop:</Typography>
                <Input placeholder="Tên shop" className='min-w-[200px] md:min-w-[500px] bg-[#e8f0fe]' readOnly value={shop?.name} />
            </Box>
            <Box className="flex flex-row items-center md:flex-row gap-1 mt-1 mb-1">
                <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Địa chỉ:</Typography>
                <Input readOnly placeholder="Địa chỉ" className='min-w-[200px] md:min-w-[500px] bg-[#e8f0fe]'
                    value={shop?.province_name ? `${shop?.street}, ${shop?.ward_name}, ${shop?.district_name}, ${shop?.province_name}` : ''}
                />
            </Box>
            <Box className="flex flex-row items-centerl md:flex-row gap-1 mt-1 mb-1">
                <Typography variant="subtitle2" className='min-w-[90px] text-[#4F4F4F]'>Số lượt bán:</Typography>
                <Input placeholder="Tên shop" className='min-w-[200px] md:min-w-[500px] bg-[#e8f0fe]' readOnly value="5 Sản phẩm" />
            </Box>
            <Box className="flex items-center w-full gap-1 mt-2">
                <Typography variant="body1" className="w-1 bg-[#007fff] text-[#007fff]">|</Typography>
                <Typography variant="h6" color="#444444">Sản phẩm nổi bật</Typography>
            </Box>
            <Box className="flex items-center">
                <Grid container spacing={1} maxWidth="lg">
                    {Array.isArray(top5products) && top5products.length > 0 ? (
                        top5products.map((product, index) => (
                            <Grid key={index} item xs={6} sm={6} md={3} lg={2}>
                                <CardProduct product={product} isShort={true} />
                            </Grid>
                        ))
                    ) : (
                        <EmptyData content="Không có sản phẩm nào được tìm thấy!" />
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default ShopInfo