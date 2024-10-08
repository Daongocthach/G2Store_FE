import { useState } from 'react'
import { TextField, Dialog, DialogContent, DialogTitle, Box, Button, Tooltip } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import categoryApi from '../../../../apis/categoryApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

function AddCategory({ parent_id, isParent, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = async () => {
        setLoading(true)
        categoryApi.addShopCategory({ name, parent_id })
            .then(() => {
                triggerAlert('Thêm thành công!', false, false)
                setReRender(!reRender)
            })
            .catch((error) => {
                console.log(error)
                triggerAlert('Thêm thất bại!', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box >
            {/* <Button sx={{ color: 'white', fontWeight: 'bold', ':hover': { bgcolor: 'inherit', borderWidth: 2 } }} size='medium'
                startIcon={<AddCircle className='text-white' />} variant="outlined" onClick={() => setOpen(true)}>
                Thêm ngành hàng
            </Button> */}
            <Tooltip title='Thêm ngành hàng'>
                <AddCircle className="action-buttons" sx={{
                    fontSize: '20px', visibility: isParent ? 'visible' : 'hidden',
                    ':hover': { color: '#1E90FF', bgcolor: 'inherit' }, color: isParent ? 'white' : 'inherit'
                }}
                    onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ textAlign: 'center' }}>Thêm ngành hàng</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' sx={{ mt: 1 }} label="Tên ngành hàng" onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default AddCategory