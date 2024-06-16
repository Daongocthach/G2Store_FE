import { useState } from 'react'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import addressApi from '../../../../apis/addressApi'
import Loading from '../../../../components/Loading/Loading'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'

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
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete} title={'Xóa địa chỉ'} content={'Bạn muốn xóa địa chỉ này? Không thể hoàn tác!'} />
            {loading && <Loading />}
        </div>
    )
}
export default DeleteAddress