import { ArrowRight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const FilterByPrice = ({ isFilter, setIsFilter, startPrice, setStartPrice, endPrice, setEndPrice }) => {
    return (
        <Box mt={2}>
            <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'} >Lọc theo giá</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <input type='text' placeholder='Min' onFocus={(e) => e.target.select()}
                    value={startPrice} onChange={(e) => setStartPrice(parseInt(e.target.value))}
                    style={{ border: '1px solid', borderColor: '#CCCCCC', width: 60, borderRadius: 2, height: 30, textAlign: 'center' }} />
                -
                <input type='text' placeholder='Max' onFocus={(e) => e.target.select()}
                    value={endPrice} onChange={(e) => setEndPrice(parseInt(e.target.value))}
                    style={{ border: '1px solid', borderColor: '#CCCCCC', width: 60, borderRadius: 2, height: 30, textAlign: 'center' }} />
                <ArrowRight onClick={() => setIsFilter(!isFilter)} sx={{
                    bgcolor: 'orange', color: 'white', height: 30, width: 30, borderRadius: 1, cursor: 'pointer',
                    ':hover': { bgcolor: '#F4A460' }
                }} />
            </Box>
        </Box>
    )
}

export default FilterByPrice