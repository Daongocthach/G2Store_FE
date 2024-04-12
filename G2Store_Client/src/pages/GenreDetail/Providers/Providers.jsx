import { Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import providerApi from '../../../apis/providerApi'
import { mockData } from '../../../apis/mockdata'

function Providers() {
    const [providers, setProviders] = useState(mockData.providers)
    const [checked, setChecked] = useState([])
    const handleCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id)
            if (isChecked) {
                return checked.filter(item => item != id)
            }
            else {
                return [...prev, id]
            }
        })
    }
    useEffect(() => {
    }, [])
    return (
        <Box mt={2}>
            <Typography variant='subtitle1' fontWeight={'bold'} >Nhà cung cấp</Typography>
            <FormGroup>
                {providers.map((provider, index) => (<FormControlLabel key={index} control={
                    <Checkbox
                        checked={checked.includes(provider.id)}
                        onChange={() => handleCheck(provider.id)}
                    />
                } label={provider?.brand} />))}
            </FormGroup>
        </Box>
    )
}

export default Providers