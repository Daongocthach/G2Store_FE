import { useState } from 'react'
import { Box, Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@mui/material'

function ShowDialogAccept({ buttonName, title, content, handle }) {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Button onClick={() => setOpen(true)} sx={{ fontWeight: 600, color: '#444444', ':hover': { bgcolor: 'inherit', color: '#1C86EE' }, gap: 1 }}>
        {buttonName}
      </Button>
      <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
        <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
          <Button onClick={handle} size='small' sx={{ fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Chấp nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>

  )
}

export default ShowDialogAccept