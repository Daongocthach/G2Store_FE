import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Account from './Account/Account'
import MenuNotifications from './MenuNotifications/MenuNotifications'

function AppBar() {
  const user = useSelector(state => state.auth)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Typography variant="h5" fontWeight={'bold'} className="hidden sm:flex text-white hover:text-orange-300">
        {user?.shop_name}
      </Typography>
      <Box className="flex flex-row items-center gap-5">
        <MenuNotifications />
        <Account user={user} />
      </Box>
    </Box>
  )
}

export default AppBar