import { Grid, Typography, Box, FormControl, Select, MenuItem, Pagination, CircularProgress, Link, Divider } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
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
    const [startPrice, setStartPrice] = useState('0')
    const [endPrice, setEndPrice] = useState('100000000')
    const [isFilter, setIsFilter] = useState(false)
    const [districtId, setDistrictId] = useState('')
    const handleResetFilter = () => {
        setSort('DEFAULT')
        setStartPrice('0')
        setEndPrice('100000000')
        setDistrictId('')
        setIsFilter(false)
    }
    const handleChangePage = (event, value) => {
        setPage(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let apiCall
            if (data?.category?.category_id) {
                apiCall = productApi.getProductsByCategoryId(data?.category?.category_id, page - 1, 12, sort, parseInt(startPrice), parseInt(endPrice), districtId)
            } else if (data?.name) {
                apiCall = productApi.searchProducts(data?.name, page - 1, 12, sort, parseInt(startPrice), parseInt(endPrice), districtId)
            } else {
                apiCall = productApi.getProducts(page - 1, 12, sort, parseInt(startPrice), parseInt(endPrice), districtId)
            }
            apiCall
                .then((response) => {
                    setProducts(response)
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [page, data, sort, isFilter, districtId])

    useEffect(() => {
        handleResetFilter()
    }, [data?.name, data?.category?.category_id])
    return (
        <Grid container mt={1} maxWidth='lg' spacing={1}>
            <Grid item xs={12} sm={12} md={3} lg={3} >
                <Box className='flex flex-col gap-2'>
                    <Box className='flex flex-row items-center gap-2 mb-2'>
                        <FilterListIcon sx={{ color: '#333333' }} />
                        <Typography variant='h6' color={'#333333'} fontWeight={'bold'} >Bộ lọc tìm kiếm</Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Link underline="none" color="inherit" href="/genre-detail" sx={{ fontSize: 16, color: 'green' }}>
                            <b >Danh mục / </b>{data?.category?.name}</Link>
                        {data?.category?.child_categories && data?.category?.child_categories.length > 0 &&
                            <Box >
                                <Typography variant='subtitle1' fontWeight={'bold'} mt={1}>Danh mục liên quan</Typography>
                                <Box className='flex flex-col gap-1'>
                                    {data?.category?.child_categories.map((child, index) => (
                                        <Link key={index} underline="hover" color="inherit" onClick={() => navigate('/genre-detail', { state: { category: child } })}
                                            sx={{ fontSize: 15, color: '#444444', cursor: 'pointer' }}>{child?.name}</Link>
                                    ))}
                                </Box>
                            </Box>}
                    </Box>
                    <FilterByPrice isFilter={isFilter} setIsFilter={setIsFilter} startPrice={startPrice} setStartPrice={setStartPrice}
                        endPrice={endPrice} setEndPrice={setEndPrice} />
                    <FilterByDistrict />
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} >
                <Box>
                    <Box className='flex flex-row items-center justify-between'>
                        <Typography variant='body1'>Tìm thấy <b>{products?.numberOfElements}</b> sản phẩm</Typography>
                        <Box className='flex flex-row items-center'>
                            <Typography variant='body1' color={'#444444'}>Sắp xếp theo</Typography>
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