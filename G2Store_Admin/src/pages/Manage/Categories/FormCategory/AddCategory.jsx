import { useState } from 'react'
import { TextField, Dialog, DialogContent, DialogTitle, Box, Tooltip } from '@mui/material'
import Add from '@mui/icons-material/Add'
import categoryApi from '../../../../apis/categoryApi'
import Loading from '../../../../components/Loading/Loading'
import DialogAction from '../../../../components/Dialog/DialogAction'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

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
        categoryApi.addCategory({ name, parent_id })
            .then(() => {
                triggerAlert('Thêm danh mục thành công!', false, false)
                setReRender(!reRender)
            })
            .catch((error) => {
                console.log(error)
                triggerAlert('Thêm danh mục thất bại', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box >
            <Tooltip title='Thêm'><Add className="action-buttons" sx={{
                fontSize: '20px', visibility: isParent ? 'visible' : 'hidden',
                ':hover': { color: '#1E90FF' }, bgcolor: 'inherit', color: isParent ? 'white' : '#333333'
            }} onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Thêm danh mục</DialogTitle>
                <DialogContent >
                    <TextField fullWidth variant='filled' size='small' sx={{ mt: 1 }} label="Tên danh mục" onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default AddCategory