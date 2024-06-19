import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Grid, Typography, IconButton, Box } from '@mui/material'
import { Inventory, EditLocationAlt, NavigateNext, AccountBox } from '@mui/icons-material'
import Profile from './Profile/Profile'
import Order from './Order/Order'
import EditAddress from './EditAddress/EditAddress'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'


function Account() {
  const [select, setSelect] = useState(0)
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
            <IconButton onClick={() => { setSelect(0) }} className='flex flex-row gap-2'>
              <Inventory className={`${select === 0 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ fontWeight: 'bold', color: select == 0 ? '#0288d1' : '#4F4F4F' }}>Đơn hàng của tôi</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 0 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box className='flex flex-row justify-between items-center'>
            <IconButton className='flex flex-row gap-2' onClick={() => { setSelect(1) }} >
              <AccountBox className={`${select === 1 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ fontWeight: 'bold', color: select == 1 ? '#0288d1' : '#4F4F4F' }}>Thông tin cá nhân</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 1 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box className='flex flex-row justify-between items-center'>
            <IconButton className='flex flex-row gap-2' onClick={() => { setSelect(2) }}>
              <EditLocationAlt className={`${select === 2 ? 'text-sky-600' : 'text-gray-600'}`} />
              <Typography sx={{ fontWeight: 600, color: select == 2 ? '#0288d1' : '#4F4F4F' }}>Sổ địa chỉ</Typography>
            </IconButton>
            <NavigateNext sx={{ color: select == 2 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
        </Grid>
        {/* Phần sản phẩm */}
        <Grid mt={1} item container xs={12} sm={12} md={9} lg={9} >
          <Grid item xs={12} sm={12} md={10} lg={10}>
            {select == 0 && <Order />}
            {select == 1 && <Profile />}
            {select == 2 && <EditAddress />}
          </Grid>
        </Grid>
      </Grid>
    </Container >
  )
}
export default Account
