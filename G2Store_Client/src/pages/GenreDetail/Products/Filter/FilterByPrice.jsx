import { PlayCircle } from '@mui/icons-material'
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material'
import { NumericFormat } from 'react-number-format'

const FilterByPrice = ({ isFilter, setIsFilter, startPrice, setStartPrice, endPrice, setEndPrice }) => {
    return (
        <Box >
            <Typography variant='subtitle1' fontWeight={'bold'}>Lọc theo giá</Typography>
            <FormGroup >
                <FormControlLabel control={<Checkbox defaultChecked size='small' />}
                    label={<span className="text-sm">Tất cả</span>} />
                <FormControlLabel control={<Checkbox size='small' />}
                    label={<span className="text-sm">Dưới 1 triệu</span>} />
                <FormControlLabel control={<Checkbox size='small' />}
                    label={<span className="text-sm">Từ 1 đến 2 triệu</span>} />
                <FormControlLabel control={<Checkbox size='small' />}
                    label={<span className="text-sm">Từ 2 đến 3 triệu</span>} />
                <FormControlLabel control={<Checkbox size='small' />}
                    label={<span className="text-sm">Trên 3 triệu</span>} />
            </FormGroup>
            <Box className='flex items-center gap-1 w-full '>
                <NumericFormat
                    thousandSeparator={true}
                    type='text'
                    placeholder='Giá thấp'
                    suffix=' đ'
                    onFocus={(e) => e.target.select()}
                    value={startPrice}
                    onValueChange={(values) => setStartPrice(values.value)}
                    className='border border-gray-300 rounded w-3/6 h-8 text-center'
                />
                ~
                <NumericFormat
                    thousandSeparator={true}
                    type='text'
                    placeholder='Giá cao'
                    suffix=' đ'
                    onFocus={(e) => e.target.select()}
                    value={endPrice}
                    onValueChange={(values) => setEndPrice(values.value)}
                    className='border border-gray-300 rounded w-3/6 h-8 text-center'
                />
            </Box>
            <Button startIcon={<PlayCircle />} onClick={() => setIsFilter(!isFilter)}
                fullWidth variant='contained' size='small' sx={{ mt: 1 }}>Tìm kiếm</Button>
        </Box>
    )
}

export default FilterByPrice