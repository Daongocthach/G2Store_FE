import SearchIcon from '@mui/icons-material/Search'
import { Paper, Autocomplete, Button, Box, InputBase, ListItem, Typography, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productApi from '../../../apis/productApi'

const products = [
    { name: 'Product 1', image: '/path/to/image1.jpg' },
    { name: 'Product 2', image: '/path/to/image2.jpg' },
    { name: 'Product 3', image: '/path/to/image3.jpg' }
]

function Search() {
    const navigate = useNavigate()
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'white')
    // const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const handleProductSelect = (event, value) => {
        if (value) {
            navigate(`/product-detail?${value.id}`)
        }
    }
    // const handleTextInputChange = (value) => {
    //     setOpen(true)
    //     if (value == '') {
    //         setProducts([])
    //     }
    //     setInput(value)
    // }
    // const handleSearch = () => {
    //     productApi.searchProductsByName(input)
    //         .then(response => {
    //             setProducts(response.data)
    //         })
    //         .catch(() => {
    //             setProducts([])
    //         })
    // }
    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', minWidth: 400, height: 40 }}>
                <Autocomplete
                    sx={{ flex: 1 }}
                    freeSolo
                    options={products}
                    getOptionLabel={(product) => (product && product.name) || ''}
                    renderInput={(params) => (
                        <TextField {...params} type='text' size='small' placeholder="Tìm kiếm trên G2Store" sx={{
                            flex: 1, height: 40, fontSize: 14,
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                '&:hover fieldset': { borderColor: 'transparent' }
                            }
                        }}
                             />
                    )}
                    renderOption={(props, product) => (
                        <ListItem {...props}>
                            <Typography>{product?.name}</Typography>
                        </ListItem>
                    )}
                />
                <Button type="button" sx={{ height: 40, bgcolor: '#EE7942', color: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                    <SearchIcon />
                </Button>
            </Paper>
        </Box>
    )
}

export default Search