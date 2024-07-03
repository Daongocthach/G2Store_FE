import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Grid, Typography, IconButton, Box } from '@mui/material'
import { Inventory, EditLocationAlt, NavigateNext, AccountBox } from '@mui/icons-material'
import Profile from './Profile/Profile'
import Order from './Order/Order'
import EditAddress from './EditAddress/EditAddress'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

function Account() {
  const [select, setSelect] = useState(1)
  const location = useLocation()
  const tab = location.state
  useEffect(() => {
    if (tab)
      setSelect(tab)
  }, [tab])
  return (
    <Container >
      <Grid container mt={2} spacing={3} >
        {/* Phần lọc */}
        <Grid item xs={12} sm={12} md={3} lg={3} >
          <BreadCrumbs links={[{ name: 'Tài khoản', href: '' }]} />
          <Box className='flex flex-row justify-between items-center'>
            <IconButton className='flex flex-row gap-2' onClick={() => { setSelect(1) }} >
              <AccountBox className={`${select === 1 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ color: select == 1 ? '#0288d1' : '#4F4F4F' }}>Thông tin cá nhân</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 1 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box className='flex flex-row justify-between items-center'>
            <IconButton onClick={() => { setSelect(2) }} className='flex flex-row gap-2'>
              <Inventory className={`${select === 2 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ color: select == 2 ? '#0288d1' : '#4F4F4F' }}>Đơn hàng của tôi</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 2 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box className='flex flex-row justify-between items-center'>
            <IconButton className='flex flex-row gap-2' onClick={() => { setSelect(3) }}>
              <EditLocationAlt className={`${select === 3 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ color: select == 3 ? '#0288d1' : '#4F4F4F' }}>Sổ địa chỉ</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 3 ? '#0288d1' : '#666666' }} />
          </Box>
        </Grid>
        {/* Phần sản phẩm */}
        <Grid mt={1} item container xs={12} sm={12} md={9} lg={9} >
          <Grid item xs={12} sm={12} md={10} lg={10}>
            {select == 1 && <Profile />}
            {select == 2 && <Order />}
            {select == 3 && <EditAddress />}
          </Grid>
        </Grid>
      </Grid>
    </Container >
  )
}
export default Account
