import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Tooltip, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import { AccountBalance } from '@mui/icons-material'
import { mockData } from '../../../../apis/mockdata'

function ViewBank({ shop }) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
      <Tooltip title="Xem thông tin chuyển khoản">
        <AccountBalance className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle fontSize={17} className=" text-gray-700">
          Thông tin chuyển khoản
        </DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia component="img" height="140" alt="bank card image"
                image={mockData.images.bankCard}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" className='text-gray-600'>
                  {shop?.bank_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shop?.bank_acc_holder_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shop?.bank_acc_series_num}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default ViewBank