import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import categoryApi from '../../../../apis/categoryApi'
import { listCategories } from '../../../../redux/actions/categories'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function UpdateCategory({ category }) {
  const dispatch = useDispatch()
  // const categories = useSelector(state => state.categories.categories)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
  // const [parent_id, setParent_Id] = useState()
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    setName(category?.name)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // const handleChange = (event) => {
  //   setParent_Id(event.target.value)
  // }
  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response = await categoryApi.updateCategory(category?.category_id, name)
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
    <div>
      <Button className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Cập nhật danh mục</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='subtitle2' minWidth={'70px'}>Tên: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 500, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
          <Button onClick={handleUpdate} size='small' sx={{ fontWeight: 500, bgcolor: '#1E90FF', color: 'white' }} >Cập nhật</Button>
        </DialogActions>
      </Dialog>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập nhật danh mục thành công!'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} isFail={true} content={'Cập nhật danh mục thất bại!'} />
      {loading && <Loading />}
    </div>
  )
}
export default UpdateCategory