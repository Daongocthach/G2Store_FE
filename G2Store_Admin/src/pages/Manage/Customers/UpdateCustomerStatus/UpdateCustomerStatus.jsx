import { useState } from 'react'
import { Tooltip, Switch } from '@mui/material'
import DialogTextOnly from '../../../../components/Dialog/DialogTextOnly'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import customerApi from '../../../../apis/customerApi'

function UpdateCustomerStatus({ customer, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickPause = () => {
        customerApi.updateCustomerStatus(customer?.customer_id, !customer?.is_enabled)
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
            <Tooltip title={!customer?.is_enabled ? 'Kích hoạt' : 'Vô hiệu hóa'}>
                <Switch checked={customer?.is_enabled} onClick={() => setOpen(true)} />
            </Tooltip>
            <DialogTextOnly open={open} setOpen={setOpen} handleClick={handleClickPause} title={'Cập nhật trạng thái'} content={'Bạn muốn cập nhật trạng trạng thái người dùng này!'} />
        </div>
    )
}
export default UpdateCustomerStatus