import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Account from './Account/Account'

function AppBar() {
  const user = useSelector(state => state.auth)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Typography variant="h5" fontWeight={'bold'} className="hidden sm:flex text-white hover:text-orange-300">
        {user?.shop_name}
      </Typography>
      <Account user={user}/>
    </Box>
  )
}

export default AppBar