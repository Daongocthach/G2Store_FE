import { Box, Menu, Chip } from '@mui/material'
import { useState } from 'react'
import Address from '../../../components/Address/Address'

function ChangeAddress({ addresses, setAddress }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleChangeAddress = (address) => {
        setAddress(address)
        handleClose()
    }
    return (
        <Box>
            <Chip color='error' variant="filled" label={'Đổi địa chỉ'} onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
                {Array.isArray(addresses) && addresses.map((address, index) =>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', gap: 2, p: 1 }} key={index}>
                        <Address address={address} />
                        <Chip color='warning' variant="filled" label={'Chọn'} onClick={() => handleChangeAddress(address)}/>
                    </Box>
                )}
            </Menu>
        </Box>
    )
}

export default ChangeAddress