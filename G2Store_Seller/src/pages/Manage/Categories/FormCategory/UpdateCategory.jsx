import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
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
      <Button className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Cập ngành hàng</DialogTitle>
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
      <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Cập ngành hàng thành công!'} />
      <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} isFail={true} content={'Cập ngành hàng thất bại!'} />
      {loading && <Loading />}
    </div>
  )
}
export default UpdateCategory