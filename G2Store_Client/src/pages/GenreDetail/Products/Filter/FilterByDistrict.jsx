import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from '@mui/material'
function FilterByDistrict() {
    return (
        <FormControl sx={{ mt: 2 }}>
            <FormLabel >
            <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'} >Địa điểm</Typography>
            </FormLabel>
            <RadioGroup >
                <FormControlLabel value="female" control={<Radio />} label="Hồ Chí Minh" />
                <FormControlLabel value="male" control={<Radio />} label="Hà Nội" />
                <FormControlLabel value="other" control={<Radio />} label="Vũng Tàu" />
            </RadioGroup>
        </FormControl>
    )
}

export default FilterByDistrict