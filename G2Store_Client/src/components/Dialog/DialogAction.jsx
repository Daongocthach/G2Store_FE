import { Button, DialogActions } from '@mui/material'


function DialogAction({ setOpen, handleClick }) {
    const handleAccept = () => {
        handleClick()
        setOpen(false)
    }
    return (
        <DialogActions>
            <Button size='small' variant='text' color='inherit' onClick={() => setOpen(false)} sx={{ ':hover': { bgcolor: 'inherit' }, color:'#444444' }}> Hủy</Button>
            <Button size='small' variant='contained' onClick={handleAccept}>Chấp nhận</Button>
        </DialogActions>
    )
}

export default DialogAction