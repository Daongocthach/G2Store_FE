import SearchIcon from '@mui/icons-material/Search'
import { Paper, Autocomplete, Button, Box, TextField, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTimeout, setSearchTimeout] = useState(null)

    const handleSearch = async () => {
        // setLoading(true)
        // productApi.searchProducts(name, 0, 100)
        //     .then(response => {
        //         setProducts(response?.content)
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //         setProducts([])
        //         setLoading(false)
        //     })
        navigate('/genre-detail', { state: { name: name } })
    }

const handleChange = (event) => {
    const newName = event.target.value
    setName(newName)
    // if (searchTimeout) {
    //     clearTimeout(searchTimeout)
    // }
    // setSearchTimeout(setTimeout(() => {
    //     handleSearch()
    // }, 500))
}

return (
    <Box sx={{ flex: 1, display: 'flex' }}>
        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', minWidth: 400, height: 40 }}>
            <TextField type='search' size='small' placeholder="Tìm kiếm trên G2Store" sx={{
                flex: 1, height: 40, fontSize: 14,
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'transparent' }
                }
            }} onChange={handleChange} onFocus={(e) => e.target.select()} />
            {/* <Autocomplete
                    sx={{ flex: 1 }}
                    freeSolo
                    options={products}
                    getOptionLabel={(product) => (product && product.name) || ''}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField {...params} type='text' size='small' placeholder="Tìm kiếm trên G2Store" sx={{
                            flex: 1, height: 40, fontSize: 14,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                '&:hover fieldset': { borderColor: 'transparent' }
                            }
                        }} onChange={handleChange} onFocus={(e) => e.target.select()} />
                    )}
                    renderOption={(props, product) => (
                        <ListItem sx={{ justifyContent: 'space-between' }} onClick={() => navigate('/product-detail', { state: product })}>
                            <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
                                <img src='' style={{ width: 40, height: 40 }} alt={product?.name} />
                                <Typography>{product?.name}</Typography>
                            </Box>
                            <Typography color={'#cb1c22'}>{formatCurrency(product?.price)}</Typography>
                        </ListItem>
                    )}
                /> */}
            <Button type="button" onClick={handleSearch} sx={{ height: 40, bgcolor: '#EE7942', color: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                <SearchIcon />
            </Button>
        </Paper>
        {loading && <CircularProgress />}
    </Box>
)
}

export default Search
