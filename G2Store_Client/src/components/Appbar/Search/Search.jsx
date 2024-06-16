import SearchIcon from '@mui/icons-material/Search'
import { Paper, Autocomplete, Button, Box, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const handleSearch = async () => {
        navigate('/genre-detail', { state: { name: name } })
    }
    const handleChange = (event) => {
        const newName = event.target.value
        setName(newName)
    }
    return (
        <Box sx={{ flex: 1, display: 'flex' }}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', minWidth: 400, height: 40 }}>
                <Autocomplete
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: '100%' }}
                    clearIcon={false}
                    popupIcon={false}
                    renderInput={(params) => <TextField {...params} variant='outlined' type='search' size='small' placeholder="Tìm kiếm trên G2Store" sx={{
                        flex: 1, fontSize: 14,
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'transparent' }
                        }
                    }} onChange={handleChange} onFocus={(e) => e.target.select()} />}
                />
                <Button type="button" onClick={handleSearch} sx={{ height: 40, bgcolor: '#EE7942', color: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                    <SearchIcon />
                </Button>
            </Paper>
        </Box>
    )
}

export default Search
const top100Films = [
    { title: 'Bánh', year: 1994 },
    { title: 'Điện thoại', year: 1972 },
    { title: 'Pepsi', year: 1974 }
]