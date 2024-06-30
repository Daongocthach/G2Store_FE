import { Button, DialogActions } from '@mui/material'


function DialogAction({ setOpen, handleClick }) {
    return (
        <DialogActions>
            <Button size='small' variant='text' color='inherit' onClick={() => setOpen(false)} sx={{ ':hover': { bgcolor: 'inherit' }, color:'#444444' }}> Hủy</Button>
            <Button size='small' variant='contained' onClick={handleClick}>Chấp nhận</Button>
        </DialogActions>
    )
}

export default DialogAction