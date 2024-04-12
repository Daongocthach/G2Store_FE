import { Box } from '@mui/material'
import Account from './Account/Account'

function AppBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, paddingX: 3, width: '100%' }}>
      <Account />
    </Box>
  )
}

export default AppBar