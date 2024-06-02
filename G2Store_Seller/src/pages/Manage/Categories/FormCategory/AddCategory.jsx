import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Tooltip } from '@mui/material'
import Add from '@mui/icons-material/Add'
import categoryApi from '../../../../apis/categoryApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function AddCategory({ parent_id, isParent, reRender, setReRender }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = async () => {
        setLoading(true)
        categoryApi.addShopCategory({ name, parent_id })
            .then(() => {
                setShowAlert(true)
                setReRender(!reRender)
            })
            .catch((error) => {
                console.log(error)
                setShowAlertFail(true)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box >
            <Tooltip title='Thêm ngành hàng'><Add className="action-buttons" sx={{
                fontSize: '20px', visibility: isParent ? 'visible' : 'hidden',
                ':hover': { color: '#1E90FF', bgcolor: 'inherit' }, color: isParent ? 'white' : 'inherit'
            }}
                onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ textAlign: 'center' }}>Thêm ngành hàng</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' sx={{ mt: 1 }} label="Tên ngành hàng" onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }}>Hủy</Button>
                    <Button onClick={handleClickAdd} size='small' sx={{ ':hover': { bgcolor: 'inherit' }, fontWeight: 'bold' }}>Thêm</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm ngành hàng thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm ngành hàng thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default AddCategory