import { Radio, RadioGroup, FormControlLabel, FormControl, Typography, Button, Popover, Box } from '@mui/material'
import ghnApi from '../../../../apis/ghnApi'
import { useEffect, useState } from 'react'
function FilterByDistrict({ setDistrictId }) {
    const [provinces, setProvinces] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)

    const handleSelect = (provinceId) => {
        setDistrictId(provinceId)
        handleClose()
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    useEffect(() => {
        if (Array.isArray(provinces) && provinces.length < 1) {
            ghnApi.getProvices()
                .then(response => {
                    setProvinces(response.data.data)
                })
                .catch(err => { console.log(err) })
        }
    }, [])
    return (
        <FormControl fullWidth >
            <Typography variant='subtitle1' fontWeight={'bold'} >Địa điểm</Typography>
            <RadioGroup className='h-72 overflow-scroll flex flex-col gap-1'>
                <Box className='flex flex-col p-2'>
                    {Array.isArray(provinces) && provinces.map((province, index) => (
                        <FormControlLabel className='w-full' key={index} value={province?.ProvinceID} control={<Radio size='small' />}
                            label={<span className="text-sm">{province?.ProvinceName}</span>}
                            onClick={() => handleSelect(province?.ProvinceID)} />
                    ))}
                </Box>
            </RadioGroup>
            {/* <Button aria-describedby={id} variant="contained" size='small' onClick={handleClick}>Xem thêm </Button>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
                <Box className='flex flex-col p-2'>
                    {Array.isArray(provinces) && provinces.map((province, index) => (
                        <FormControlLabel key={index} value={province?.ProvinceID} control={<Radio size='small' />}
                            label={<span className="text-sm">{province?.ProvinceName}</span>}
                            onClick={() => handleSelect(province?.ProvinceID)} />
                    ))}
                </Box>
            </Popover> */}
        </FormControl>
    )
}

export default FilterByDistrict