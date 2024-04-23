import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import addressApi from '../../../../apis/addressApi'
import Loading from '../../../../components/Loading/Loading'

function DeleteAddress({ addressId, rerender, setRerender }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = async () => {
        setLoading(true)
        addressApi.deleteAddress(addressId)
            .then(() => {
                toast.success('Xóa địa chỉ thành công', { position: 'top-center', autoClose: 2000 })
                setLoading(false)
                setRerender(!rerender)
            })
            .catch((error) => {
                toast.error('Xóa địa chỉ thất bại', { position: 'top-center', autoClose: 2000 })
                console.log(error)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <div>
            <Button color='inherit' sx={{ fontWeight: 'bold', ':hover': { bgcolor: 'inherit' } }}
                 onClick={() => setOpen(true)}>Xóa</Button>
            <Dialog open={open} keepMounted onClose={() => { setOpen(false) }} >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 550 }}>Xóa địa chỉ</DialogTitle>
                <DialogContent>
                    Bạn muốn xóa địa chỉ này!
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} size='small' sx={{ fontWeight: 600, bgcolor: '#696969', color: 'white' }}>Hủy</Button>
                    <Button onClick={handleClickDelete} size='small' sx={{ fontWeight: 600, bgcolor: '#1E90FF', color: 'white' }} >Xóa</Button>
                </DialogActions>
            </Dialog>
            {loading && <Loading />}
        </div>
    )
}
export default DeleteAddress