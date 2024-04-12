import { Grid, Typography, Box, FormControl, Select, MenuItem, Menu, Slider, TextField, Button, Pagination } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import productApi from '../../../apis/productApi'
import { formatCurrency } from '../../../utils/price'
import Product from '../../Dashboard/BoardContent/ListRow/Row/ListProduct/Product/Product'

function Products() {
    const subCategoryId = useSelector(state => state.subCategory.id)
    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [select, setSelect] = useState(1)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [page, setPage] = useState(1)
    const handleChange = (event, value) => {
        productApi.getAllEnabledProducts(value-1, 8)
        .then(response => {
            setProducts(response.data.content)
            setTotalPage(response.data.totalPages)
        })
        .catch(error => {
            console.error(error)
        })
        setPage(value)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleSlider = (e, newValue) => {

    }
    const handleFileterByPrice = () => {

    }
    const handleCancelFilter = () => {

    }
    const handleSelect = (event) => {
    }
    useEffect(() => {
        if (subCategoryId == 0) {
            productApi.getAllEnabledProducts()
                .then(response => {
                    setProducts(response.data.content)
                    setTotalPage(response.data.totalPages)
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            productApi.getProductsBySubCategoryId(subCategoryId)
                .then(response => {
                    setProducts(response.data)
                    //   setProductsByPrice(response.data)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [])
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'right', mt: 1, gap: 2 }}>
                <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
                <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                    <Select value={select} onChange={handleSelect} >
                        <MenuItem value={1}>Mới nhất</MenuItem>
                        <MenuItem value={2}>Giá thấp</MenuItem>
                        <MenuItem value={3}>Giá cao</MenuItem>
                    </Select>
                </FormControl>
                {/* <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem >
                        <Box sx={{ width: 500, height: 120, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextField value={formatCurrency(minPrice)} InputProps={{ readOnly: true }} />
                                ---
                                <TextField value={formatCurrency(maxPrice)} InputProps={{ readOnly: true }} />
                            </Box>
                            <Slider step={1000} value={value} onChange={handleSlider} min={1000} max={1000000} />
                            <Button sx={{ bgcolor: '#1874CD', color: 'white', ':hover': { bgcolor: '#1874CD' } }} fullWidth
                                onClick={handleFileterByPrice}>
                                Xem kết quả
                            </Button>
                        </Box>
                    </MenuItem>
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant='body1' fontWeight={'bold'} minWidth={'70px'}>Chọn giá</Typography>
                    <TextField onClick={handleClick} sx={{ minWidth: '250px' }} size='small' value={'Từ ' + formatCurrency(minPrice) + ' - ' + formatCurrency(maxPrice)} />
                </Box>
                <Button sx={{ bgcolor: '#1C86EE', color: 'white' }} onClick={handleCancelFilter}><PlayArrowIcon/></Button> */}
            </Box>
            <Grid container spacing={1} maxWidth='lg' >
                { Array.isArray(products) && products.map((product) => (
                    <Grid key={product.id} item xs={6} sm={6} md={4} lg={3} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPage} variant="outlined" color="primary" page={page} onChange={handleChange} />
            </Box>
        </Box>
    )
}

export default Products