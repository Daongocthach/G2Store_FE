import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material'
import Add from '@mui/icons-material/Add'
import categoryApi from '../../../../apis/categoryApi'
import { listCategories } from '../../../../redux/actions/categories'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function AddCategory({ parent_id, isParent }) {
    const dispatch = useDispatch()
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
        try {
            const response = await categoryApi.addCategory({ name, parent_id })
            if (response) {
                setShowAlert(true)
                categoryApi.getCategories()
                    .then((response) => {
                        dispatch(listCategories(response))
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        } catch (error) {
            console.log(error)
            setShowAlertFail(true)
        }
        setLoading(false)
        handleClose()
    }
    return (
        <Box >
            <Button className="action-buttons" sx={{
                color: '#666666', fontSize: '20px', visibility: isParent ? 'visible' : 'hidden',
                ':hover': { color: '#1E90FF' }, bgcolor: isParent ? '	#DDDDDD' : 'inherit'
            }}
                onClick={() => setOpen(true)}><Add /></Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ textAlign: 'center' }}>Thêm danh mục</DialogTitle>
                <DialogContent >
                    <TextField fullWidth size='small' sx={{ mt: 1 }} label="Tên danh mục" onChange={(e) => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 500, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickAdd} size='small' sx={{ fontWeight: 500, bgcolor: '#1E90FF', color: 'white' }} >Ok</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm danh mục thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm danh mục thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default AddCategory