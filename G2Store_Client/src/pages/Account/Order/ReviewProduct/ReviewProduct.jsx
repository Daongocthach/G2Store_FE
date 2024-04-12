import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Rating } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import reviewApi from '../../../../apis/reviewApi'

function ReviewProduct({ product, customerId }) {
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        reviewApi.addReview(comment, rating, product?.id, customerId)
            .then(() => {
                alert('Add Success')
            })
            .catch(error => {
                console.log(error)
                alert('Add Fail')
            })
        handleClose()
    }
    return (
        <div>
            <Button sx={{ fontWeight: 'bold' }} startIcon={<AddCircle />} variant="outlined" onClick={handleClickOpen}>
                Đánh giá
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Review {product?.name}</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography minWidth={'100px'}>Comment: </Typography>
                            <TextField fullWidth size='small' label="Comment" onChange={(e) => setComment(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography minWidth={'100px'}>Rating: </Typography>
                            <Rating size='large' value={rating} onChange={(event, newValue) => { setRating(newValue) }} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ReviewProduct