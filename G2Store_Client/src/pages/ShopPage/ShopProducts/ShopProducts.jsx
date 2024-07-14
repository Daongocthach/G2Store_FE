import { useState, useEffect } from 'react'
import { Grid, Box, Pagination, CircularProgress } from '@mui/material'
import EmptyData from '../../../components/EmptyData/EmptyData'
import CardProduct from '../../../components/Product/CardProduct'
import productApi from '../../../apis/productApi'
import Filter from './Filter/Filter'
import ShopCategories from './ShopCategories/ShopCategories'
import Sort from '../../../components/Sort/Sort'

function ShopProducts({ shop_id }) {
    const [isReset, setIsReset] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [startPrice, setStartPrice] = useState('')
    const [endPrice, setEndPrice] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState(null)
    const [sort, setSort] = useState('DEFAULT')
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const handleReset = () => {
        setCategory(null)
        setSort('DEFAULT')
        setStartPrice('')
        setEndPrice('')
        setIsReset(!isReset)
    }
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    const fetchData = async () => {
        setLoading(true)
        productApi.getShopProducts(shop_id, page - 1, 12, sort, name, category?.shop_cate_id, parseInt(startPrice), parseInt(endPrice))
            .then((response) => {
                setProducts(response)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchData()
    }, [page, category, sort, isFilter, isReset])
    return (
        <Box>
            <Box className='flex flex-row items-center justify-between flex-wrap'>
                <Box className='flex flex-row items-center gap-2 flex-wrap'>
                    <ShopCategories setCategory={setCategory} shop_id={shop_id} />
                    <Filter name={name} setName={setName} isFilter={isFilter} setIsFilter={setIsFilter}
                        startPrice={startPrice} setStartPrice={setStartPrice} endPrice={endPrice} setEndPrice={setEndPrice} />
                </Box>
                <Sort sort={sort} setSort={setSort} handleReset={handleReset} />
            </Box>
            <Box className="bg-[#E6E6FA] flex flex-col items-center justify-center">
                {loading && <CircularProgress />}
                {!loading && (
                    <Grid container spacing={1} p={1}>
                        {Array.isArray(products?.content) && products.content.length > 0 ? (
                            products.content.map((product, index) => (
                                <Grid key={index} item xs={3} sm={3} md={3} lg={2}>
                                    <CardProduct product={product} isShort={true} />
                                </Grid>
                            ))
                        ) : (
                            <EmptyData content="Không có sản phẩm nào được tìm thấy!" />
                        )}
                    </Grid>
                )}
                <Box className="flex flex-row items-center justify-center mt-2 mb-2">
                    <Pagination count={products?.totalPages} variant="outlined" color="primary"
                        page={page} onChange={handleChangePage} />
                </Box>
            </Box>
        </Box>

    )
}

export default ShopProducts