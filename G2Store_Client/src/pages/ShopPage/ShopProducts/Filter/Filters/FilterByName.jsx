import SearchIcon from '@mui/icons-material/Search'
import { Paper, Autocomplete, Button, Box, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockData } from '../../../../../apis/mockdata'

function FilterByName() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const handleSearch = async () => {
        navigate('/genre-detail', { state: { name: name } })
    }
    const handleChange = (event, value) => {
        setName(value)
    }
    return (
        <Box className='flex-row md:w-auto w-full'>
            <Paper component="form" className='flex flex-row items-center md:w-96 sm:w-full h-10'>
                <Autocomplete
                    fullWidth
                    freeSolo
                    onChange={(e, value) => handleChange(e, value)}
                    options={!name ? [] : mockData.listProductKeyWords}
                    clearIcon={false}
                    popupIcon={false}
                    renderInput={(params) =>
                        <TextField {...params}
                            type='search' variant='outlined' size='small' placeholder="Tìm kiếm trên G2Store"
                            sx={{
                                fontSize: 14, width: '110%',
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'transparent' }
                                }
                            }} onChange={(e) => handleChange(e, e?.target?.value)} onFocus={(e) => e.target.select()} />}
                />
                <Button variant='contained' color='warning' onClick={handleSearch} sx={{ borderRadius: 0 }} className='h-full'>
                    <SearchIcon />
                </Button>
            </Paper>
        </Box>
    )
}

export default FilterByName

