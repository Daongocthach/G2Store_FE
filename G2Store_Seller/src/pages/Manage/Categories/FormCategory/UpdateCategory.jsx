import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Tooltip } from '@mui/material'
import { Create } from '@mui/icons-material'
import categoryApi from '../../../../apis/categoryApi'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'

function UpdateCategory({ category, reRender, setReRender }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
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
  const handleUpdate = async () => {
    setLoading(true)
    categoryApi.updateShopCategory(category?.shop_cate_id, name)
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
    <div>
      <Tooltip title='Sửa ngành hàng'><Create className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen} /></Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Cập nhật ngành hàng</DialogTitle>
        <DialogContent>
          <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} size='small' sx={{ ':hover': { bgcolor: 'inherit' } }} >Hủy</Button>
          <Button onClick={handleUpdate} size='small' sx={{ ':hover': { bgcolor: 'inherit' } }} >Cập nhật</Button>
        </DialogActions>
      </Dialog>
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập ngành hàng thành công!'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} isFail={true} content={'Cập ngành hàng thất bại!'} />
      {loading && <Loading />}
    </div>
  )
}
export default UpdateCategory