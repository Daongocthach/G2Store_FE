import { useState } from 'react'
import { Container, Grid, Typography, Button, Box, Breadcrumbs, Link } from '@mui/material'
import { Inventory, EditLocationAlt, NavigateNext, AccountBox } from '@mui/icons-material'
import Profile from './Profile/Profile'
import Order from './Order/Order'
import EditAddress from './EditAddress/EditAddress'

function Account() {
  const [select, setSelect] = useState(0)

  return (
    <Container sx={{ mb: 2 }}>
      <Grid container mt={2} spacing={3} >
        {/* Phần lọc */}
        <Grid item xs={12} sm={12} md={3} lg={3} >
          <Breadcrumbs sx={{ mt: 2 }}>
            <Link underline="hover" color="inherit" href="/" variant='subtitle1'> Trang chủ</Link>
            <Link underline="hover" color="inherit" variant='subtitle1' >Tài khoản</Link>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<Inventory />} sx={useStyles.button} color={select == 0 ? 'info' : 'inherit'} onClick={() => { setSelect(0) }}>
              <Typography variant='subtitle1' sx={{ ...useStyles.title, color: select == 0 ? '#0288d1' : '#4F4F4F' }}>Đơn hàng của tôi</Typography>
            </Button>
            <NavigateNext sx={{ color: select == 0 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<AccountBox />} sx={useStyles.button} color={select == 1 ? 'info' : 'inherit'} onClick={() => { setSelect(1) }}>
              <Typography variant='subtitle1' sx={{ ...useStyles.title, color: select == 1 ? '#0288d1' : '#4F4F4F' }}>Thông tin cá nhân</Typography>
            </Button>
            <NavigateNext sx={{ color: select == 1 ? '#0288d1' : '#4F4F4F' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button startIcon={<EditLocationAlt />} sx={useStyles.button} color={select == 2 ? 'info' : 'inherit'} onClick={() => { setSelect(2) }}>
              <Typography variant='subtitle1' sx={{ ...useStyles.title, color: select == 2 ? '#0288d1' : '#4F4F4F' }}>Sổ địa chỉ</Typography>
            </Button>
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

const useStyles = {
  title: {
    fontWeight: 500, color: '#4F4F4F'
  },
  button: {
    ':hover': { bgcolor: 'inherit' }, fontWeight: 500
  }
}