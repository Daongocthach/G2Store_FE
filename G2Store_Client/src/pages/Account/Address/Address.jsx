import { Typography, Box } from '@mui/material'
import { Home } from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateAddress from './FormAddress/UpdateAddress'

function Address() {
  const user = useSelector(state => state.auth)
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' fontWeight={'bold'}>Địa chỉ nhận hàng</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Home />
          <Box borderRight={'1px solid #BEBEBE'} p={1}>
            <Typography variant='h6'>{user?.fullName}</Typography>
            <Typography variant='body1'>{user?.address + ', ' + user?.ward + ', ' + user?.district + ', Tỉnh ' + user?.province}</Typography>
          </Box>
          <Typography variant='h6'>{user?.phoneNo}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <UpdateAddress user={user}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Address