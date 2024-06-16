import { useState } from 'react'
import { TextField, Dialog, DialogContent, DialogTitle, Tooltip } from '@mui/material'
import { Create } from '@mui/icons-material'
import categoryApi from '../../../../apis/categoryApi'
import Loading from '../../../../components/Loading/Loading'
import DialogAction from '../../../../components/Dialog/DialogAction'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function UpdateCategory({ category, reRender, setReRender }) {
  const triggerAlert = useAlert()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
  const [open, setOpen] = useState(false)
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
        triggerAlert('Cập nhật thành công!', false, false)
        setReRender(!reRender)
      })
      .catch((error) => {
        console.log(error)
        triggerAlert('Cập nhật thất bại!', true, false)
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
          <TextField variant='filled' fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogAction setOpen={setOpen} handleClick={handleUpdate} />
      </Dialog>
      {loading && <Loading />}
    </div>
  )
}
export default UpdateCategory