import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

const data = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'Schindler List', year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }]
function Search() {
    // const datas = useSelector(state => state.orders.orders)
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    // const handleDatasSelect = (event, value) => {
    //     if (value !== null) {
    //         orderApi.getOrderById(value.id)
    //             .then(response => {
    //                 setOrders([response.data])
    //             })
    //             .catch(err => { console.log(err) })
    //     }
    //     else { setOrders(sortByMaxId(datas)) }

    // }
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                options={data}
                getOptionLabel={(data) => (data.title)}
                // onChange={handleDatasSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
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
                        }} 
                        />)} />
        </Stack>
    )
}

export default Search