import { Tooltip } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { useState } from 'react'
import cartItemV2Api from '../../../apis/cartItemApiV2'
import DialogTextOnly from '../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../components/ShowAlert/ShowAlert'

function DeleteItem({ shopItemId, cartItemId, reRender, setReRender, isDeleteAll }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        if (isDeleteAll) {
            cartItemV2Api.deleteAllCart()
                .then(() => {
                    triggerAlert('Xóa thành công!', false, false)
                    setReRender(!reRender)
                })
                .catch(err => { console.log(err) })
        }
        else if (cartItemId) {
            cartItemV2Api.deleteCartItems(cartItemId)
                .then(() => {
                    triggerAlert('Đã xóa cả sản phẩm khỏi giỏ!', false, false)
                    setReRender(!reRender)
                })
                .catch(err => {
                    console.log(err)
                    triggerAlert('Xóa sản phẩm khỏi giỏ thất bại!', true, false)

                })
        }
        else {
            cartItemV2Api.deleteShopItem(shopItemId)
                .then(() => {
                    triggerAlert('Đã xóa sản phẩm của shop khỏi giỏ', false, false)
                    setReRender(!reRender)
                })
                .catch(err => {
                    console.log(err)
                    triggerAlert('Xóa sản phẩm khỏi giỏ thất bại!', true, false)

                })
        }


        handleClose()
    }
    return (
        <div>
            {isDeleteAll ?
                <Tooltip title='Xóa tất cả khỏi giỏ'>
                    <DeleteForever className='text-gray-700 cursor-pointer' onClick={handleClickOpen} />
                </Tooltip>
                :
                <Tooltip title={shopItemId ? 'Xóa' : 'Xóa tất cả sản phẩm của shop'}>
                    <DeleteForever className='text-gray-600 cursor-pointer' onClick={handleClickOpen} />
                </Tooltip>
            }
            {isDeleteAll ?
                <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete}
                    title={'Xóa tất cả sản phẩm khỏi giỏ?'}
                    content={'Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng, bấm Chấp nhận để tiếp tục, Hủy để thoát'} />
                :
                <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickDelete}
                    title={shopItemId ? 'Xóa sản phẩm khỏi giỏ?' : 'Xóa tất cả sản phẩm của shop này?'}
                    content={'Bạn muốn xóa sản phẩm này khỏi giỏ hàng, bấm Chấp nhận để tiếp tục, Hủy để thoát'} />
            }
        </div>
    )
}

export default DeleteItem