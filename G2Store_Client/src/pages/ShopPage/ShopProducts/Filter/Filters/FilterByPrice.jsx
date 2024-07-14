import { Box, Typography, FormGroup, FormControlLabel, Radio } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { useState } from 'react'

const FilterByPrice = ({ startPrice, setStartPrice, endPrice, setEndPrice }) => {
    const [checkPrice, setCheckPrice] = useState('all')
    const handlePriceChange = (min, max, check) => {
        setStartPrice(min)
        setEndPrice(max)
        setCheckPrice(check)
    }
    return (
        <Box >
            <Typography variant='subtitle1' fontWeight={'bold'}>Lọc theo giá</Typography>
            <FormGroup >
                <FormControlLabel control={<Radio size='small' checked={checkPrice == 'all'}
                    onChange={() => handlePriceChange(Infinity, Infinity, 'all')} />} label={<span className="text-sm">Tất cả</span>} />
                <FormControlLabel control={<Radio size='small' checked={checkPrice == 'lessOne'}
                    onChange={() => handlePriceChange(0, 1000000, 'lessOne')} />} label={<span className="text-sm">Dưới 1 triệu</span>} />
                <FormControlLabel control={<Radio size='small' checked={checkPrice == 'oneToThree'}
                    onChange={() => handlePriceChange(1000000, 3000000, 'oneToThree')} />} label={<span className="text-sm">Từ 1 đến 3 triệu</span>} />
                <FormControlLabel control={<Radio size='small' checked={checkPrice == 'threeToFive'}
                    onChange={() => handlePriceChange(3000000, 5000000, 'threeToFive')} />} label={<span className="text-sm">Từ 3 đến 5 triệu</span>} />
                <FormControlLabel control={<Radio size='small' checked={checkPrice == 'fiveToTen'}
                    onChange={() => handlePriceChange(5000000, 10000000, 'fiveToTen')} />} label={<span className="text-sm">Từ 5 đến 10 triệu</span>} />
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
        </Box>
    )
}

export default FilterByPrice