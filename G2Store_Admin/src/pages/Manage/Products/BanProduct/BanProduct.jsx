import { useState } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, Box, Typography, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import productApi from '../../../../apis/productApi'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'
import DialogAction from '../../../../components/Dialog/DialogAction'

function BanProduct({ product, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState('')

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickBan = () => {
        setLoading(true)
        productApi.bannedProduct(product?.product_id, true, reason)
            .then(() => {
                triggerAlert('Khóa thành công!', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Khóa thất bại!', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <div>
            <Tooltip title='Khóa sản phẩm'><LockIcon sx={{ color: '#444444', cursor: 'pointer' }} onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ color: '#444444', textAlign: 'center' }}>Khóa sản phẩm</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <img src={product?.thumbnail} alt={product?.name} style={{ height: 50, width: 50, borderRadius: '10px' }} />
                        <Typography sx={{ color: '#444444' }} variant='subtitle2' >{product?.name}</Typography>
                    </Box>
                    <TextField fullWidth size='medium' sx={{ mt: 2 }} rows={4} multiline label="Nhập lý do khóa..."
                        onChange={(e) => setReason(e.target.value)} />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickBan} />
            </Dialog>
            {loading && <Loading />}
        </div>
    )
}
export default BanProduct