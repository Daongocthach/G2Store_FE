import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Box, Tooltip } from '@mui/material'
import { Image } from '@mui/icons-material'

function ViewReviewImages({ images }) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
      <Tooltip title="Xem ảnh đánh giá">
        <Image className="bg-inherit text-gray-700 cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent >
          {Array.isArray(images) && images.map((file, index) => (
            <Box key={index} className='rounded-xl relative bg-black mt-1'>
              {file?.file_type.startsWith('video/') ?
                <video controls style={{ height: '100%', width: '100%', borderRadius: '10px' }}>
                  <source src={file?.file_url} type="video/mp4" />
                </video>
                : <img src={file?.file_url} style={{ height: '100%', width: '100%', opacity: 0.5, borderRadius: '10px' }} />
              }
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default ViewReviewImages