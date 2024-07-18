import { useState } from 'react'
import { TextField, Dialog, DialogContent, DialogTitle, Box, Tooltip } from '@mui/material'
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
    if (category?.category_id) {
      setLoading(true)
      const parentCategory = getParentCategory(category?.path)
      categoryApi.updateCategory(category?.category_id, parentCategory, name)
        .then(() => {
          triggerAlert('Cập nhật danh mục thành công!', false, false)
          setReRender(!reRender)
        })
        .catch((error) => {
          console.log(error)
          triggerAlert('Cập nhật danh mục thất bại!', true, false)
        })
        .finally(() => setLoading(false))
    }
    else {
      triggerAlert('Không tìm thấy danh mục!', true, false)
    }
    handleClose()
  }
  return (
    <Box>
      <Tooltip title='Sửa'><Create className="action-buttons" sx={{ color: '#666666', fontSize: '20px', visibility: 'hidden', ':hover': { color: '#1E90FF' } }} onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Cập nhật danh mục</DialogTitle>
        <DialogContent>
          <TextField fullWidth variant='filled' size='small' sx={{ mt: 1 }} label="Tên danh mục" value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogAction handleClick={handleUpdate} setOpen={setOpen} />
      </Dialog>
      {loading && <Loading />}
    </Box>
  )
}
export default UpdateCategory

function getParentCategory(path) {
  if (!path.includes('/')) {
    return null
  }
  const pathArray = path.split('/')
  const parentCategory = pathArray[pathArray.length - 2]
  return parentCategory
}