import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productApi from '../../../apis/productApi'

function Search() {
    const navigate = useNavigate()
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const handleProductSelect = (event, value) => {
        if (value) {
            navigate(`/product-detail?${value.id}`)
        }
    }
    const handleTextInputChange = (value) => {
        setOpen(true)
        if (value == '') {
            setProducts([])
        }
        setInput(value)
    }
    const handleSearch = () => {
        productApi.searchProductsByName(input)
            .then(response => {
                setProducts(response.data)
            })
            .catch(() => {
                setProducts([])
            })
    }
    return (
        <Box sx={{ minWidth: { xs: '50vw', md: '50vw' }, flex: 1, display: 'flex', gap: 0.5 }}>
            <Autocomplete
                freeSolo
                open={open}
                onClose={() => setOpen(false)}
                id="free-solo-2-demo"
                options={products}
                getOptionLabel={(product) => (product && product.name) || ''}
                onChange={handleProductSelect}
                renderOption={(props, product) => (
                    <ListItem {...props}>
                        <ListItemAvatar>
                            <Avatar alt={product.name} src={product.image} />
                        </ListItemAvatar>
                        <ListItemText primary={product.name} />
                    </ListItem>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="outlined-search"
                        label="Tìm kiếm..."
                        type="text"
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => handleTextInputChange(e.target.value)}
                        sx={{
                            minWidth: { xs: '120px', md: '300px' },
                            '& label': { color: colorChangeByTheme },
                            '& input': { color: colorChangeByTheme },
                            '& label.Mui-focused': { fontWeight: 'bold' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: colorChangeByTheme },
                                '&:hover fieldset': { borderColor: colorChangeByTheme },
                                '&.Mui-focused fieldset': { borderColor: colorChangeByTheme }
                            }
                        }} />)} />
            <Button sx={{ bgcolor: 'orange', color: 'white' }} onClick={handleSearch}>Tìm</Button>
        </Box>
    )
}

export default Search