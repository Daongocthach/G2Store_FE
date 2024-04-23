import { Grid, Typography, Box, FormControl, Select, MenuItem, Pagination } from '@mui/material'
import { useState, useEffect } from 'react'
import productApi from '../../../apis/productApi'
import Product from '../../../components/Product/Product'

function Products() {
    const [totalPages, setTotalPages] = useState(1)
    const [products, setProducts] = useState()
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(8)
    const [select, setSelect] = useState(1)
    useEffect(() => {
        productApi.getProducts(page, size)
            .then((response) => {
                setProducts(response?.content)
                setTotalPages(response?.totalPages)
            })
            .catch((error) => console.log(error))
    }, [page, size])
    const handleChangePage = (event, value) => {
        setPage(value)
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'right', mt: 1, gap: 2 }}>
                <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
                <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                    <Select value={select} onChange={(e) => setSelect(e.target.value)} >
                        <MenuItem value={1}>Mới nhất</MenuItem>
                        <MenuItem value={2}>Giá thấp</MenuItem>
                        <MenuItem value={3}>Giá cao</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={1} maxWidth='lg' sx={{ alignItems: 'center', justifyContent: 'center' }} >
                    {Array.isArray(products) && products.map((product, index) => (
                        <Grid key={index} item xs={6} sm={6} md={4} lg={3} >
                            <Product product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPages} variant="outlined" color="primary" page={page} onChange={handleChangePage} />
            </Box>
        </Box>
    )
}

export default Products