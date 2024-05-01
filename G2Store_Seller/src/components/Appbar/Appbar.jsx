import { Box } from '@mui/material'
import Account from './Account/Account'

function AppBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
      <Account />
    </Box>
  )
}

export default AppBar