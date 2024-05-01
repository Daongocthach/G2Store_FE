import { Grid, Typography, Box, FormControl, Select, MenuItem, Pagination, CircularProgress, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import productApi from '../../../apis/productApi'
import CardProduct from '../../../components/Product/CardProduct'
import FilterByPrice from './Filter/FilterByPrice'
import FilterByDistrict from './Filter/FilterByDistrict'

function Products() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('DEFAULT')
    const [startPrice, setStartPrice] = useState(0)
    const [endPrice, setEndPrice] = useState(0)
    const [isFilter, setIsFilter] = useState(false)
    const [districtId, setDistrictId] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setTimeout(() => {
                if (data?.category?.category_id) {
                    productApi.getProductsByCategoryId(data?.category?.category_id, page - 1, 16, sort, startPrice, endPrice, districtId)
                        .then((response) => {
                            setProducts(response)
                        })
                        .catch((error) => console.log(error))
                        .finally(() => setLoading(false))
                }
                else if (data?.name) {
                    console.log(data?.name, page - 1, 16, sort, startPrice, endPrice, districtId)
                    productApi.searchProducts(data?.name, page - 1, 16, sort, startPrice, endPrice, districtId)
                        .then((response) => {
                            setProducts(response)
                        })
                        .catch((error) => console.log(error))
                        .finally(() => setLoading(false))
                }
                else {
                    productApi.getProducts(page - 1, 16)
                        .then((response) => {
                            setProducts(response)
                        })
                        .catch((error) => console.log(error))
                        .finally(() => setLoading(false))
                }
            }, 1000)
        }

        fetchData()
    }, [page, data, sort, districtId, isFilter])
    const handleChangePage = (event, value) => {
        setPage(value)
    }

    return (
        <Grid container mt={1} maxWidth='lg' spacing={1}>
            <Grid item xs={12} sm={12} md={2} lg={2} >
                <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'} mt={2}>Loại sản phẩm</Typography>
                <Link underline="hover" color="inherit" href="/genre-detail" sx={{ fontSize: 13, color: 'orange' }}>{data?.category?.name}</Link>
                {data?.category?.child_categories && data?.category?.child_categories.length > 0 &&
                    <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'} mt={1}>Danh mục liên quan</Typography>}
                {data?.category?.child_categories && data?.category?.child_categories.length > 0 &&
                    data?.category?.child_categories.map((child, index) => (
                        <Box key={index}>
                            <Link underline="hover" color="inherit" onClick={() => navigate('/genre-detail', { state: { category: child } })}
                                sx={{ fontSize: 13, color: '#444444', cursor: 'pointer' }}>{child?.name}</Link>
                        </Box>
                    ))}
                <FilterByPrice isFilter={isFilter} setIsFilter={setIsFilter} setStartPrice={setStartPrice} setEndPrice={setEndPrice} />
                <FilterByDistrict />
            </Grid>
            <Grid mt={1} item xs={12} sm={12} md={10} lg={10} >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 1, gap: 2 }}>
                        <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'} >Sắp xếp</Typography>
                        <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                            <Select value={sort} onChange={(e) => setSort(e.target.value)} >
                                <MenuItem color='#444444' value={'TOP_SELLER'}>Bán chạy</MenuItem>
                                <MenuItem color='#444444' value={'DEFAULT'}>Mặc định</MenuItem>
                                <MenuItem color='#444444' value={'NEWEST'}>Mới nhất</MenuItem>
                                <MenuItem color='#444444' value={'PRICE_ASC'}>Giá tăng dần</MenuItem>
                                <MenuItem color='#444444' value={'PRICE_DESC'}>Giá giảm dần</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {loading && <CircularProgress />}
                        {!loading && <Grid container spacing={1} maxWidth='lg' >
                            {Array.isArray(products?.content) && products?.content.map((product, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                                    <CardProduct product={product} />
                                </Grid>
                            ))}
                        </Grid>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
                        <Pagination count={products?.totalPages} variant="outlined" color="primary" page={page} onChange={handleChangePage} />
                    </Box>
                </Box>
            </Grid>
        </Grid>

    )
}

export default Products