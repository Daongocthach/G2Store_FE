import { useState } from 'react'
import { Tooltip, Switch } from '@mui/material'
import sellerApi from '../../../../apis/sellerApi'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'

function UpdateSellerStatus({ seller, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickPause = () => {
        sellerApi.updateSellerStatus(seller?.seller_id, !seller?.is_enabled)
            .then(() => {
                triggerAlert('Cập nhật thành công!', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Cập nhật thất bại!', true, false)
            })
        handleClose()
    }
    return (
        <div>
            <Tooltip title={!seller?.is_enabled ? 'Kích hoạt' : 'Vô hiệu hóa'}>
                <span>
                    <Switch disabled={seller?.is_main_acc} checked={seller?.is_enabled} onClick={() => setOpen(true)} />
                </span>
            </Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickPause} title={'Cập nhật trạng thái'} content={'Bạn muốn cập nhật trạng trạng thái người bán này!'} />
        </div>
    )
}
export default UpdateSellerStatus