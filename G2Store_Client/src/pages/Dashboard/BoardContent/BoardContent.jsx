import { Box } from '@mui/material'
import ListRow from './ListRow/ListRow'

function BoardContent() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E6E6FA'),
      pb: 2
    }}>
      <ListRow />
    </Box>
  )
}

export default BoardContent
