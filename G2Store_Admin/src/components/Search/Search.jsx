import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, Stack, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'

function SearchProvider({ datas }) {
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    const [searchValue, setSearchValue] = useState('')
    const handleDatasSelect = (event, value) => {
        // if (value) {
        //   navigate(`/product-detail?${value.id}`)
        // }
    }
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={datas}
                getOptionLabel={(data) => (data && data.name) || ''}
                onChange={handleDatasSelect}
                renderOption={(props, data) => (
                    <ListItem {...props}>
                        <ListItemText primary={data.name} />
                    </ListItem>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="outlined-search"
                        label="Search..."
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
                        sx={{
                            minWidth: '120px',
                            maxWidth: '300px',
                            '& label': { color: colorChangeByTheme },
                            '& input': { color: colorChangeByTheme },
                            '& label.Mui-focused': { fontWeight: 'bold' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: colorChangeByTheme },
                                '&:hover fieldset': { borderColor: colorChangeByTheme },
                                '&.Mui-focused fieldset': { borderColor: colorChangeByTheme }
                            }
                        }} />)} />
        </Stack>
    )
}

export default SearchProvider