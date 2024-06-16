import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import DialogAction from './DialogAction'

function DialogTextOnly({ open, setOpen, title, content, handleClick }) {
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClick} />
            </Dialog>
        </div>
    )
}
export default DialogTextOnly