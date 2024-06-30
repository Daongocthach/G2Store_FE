import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import orderApi from '../../../../apis/orderApi'
import Loading from '../../../../components/Loading/Loading'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

function GoodsReceived({ orderId, reRender, setReRender }) {
    const triggerAlert = useAlert()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickGoodsReceived = async () => {
        setLoading(true)
        orderApi.goodsReceived(orderId)
            .then(() => {
                triggerAlert('Xác nhận nhận hàng thành công', false, false)
                setReRender(!reRender)
            })
            .catch(error => {
                console.log(error)
                triggerAlert('Xác nhận nhận hàng thất bại!', true, false)
            })
            .finally(() => setLoading(false))
        handleClose()
    }
    return (
        <Box>
            <Button variant="contained" color='success' size='small' sx={{ borderRadius: 2 }} onClick={handleClickOpen}>
                Đã nhận hàng
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle className='text-gray-800'>
                    Bạn sẽ không được hoàn tiền!
                </DialogTitle>
                <DialogContent>
                    <Box className='flex flex-row items-center gap-2 flex-wrap'>
                        <ErrorOutline className='text-gray-600' sx={{ fontSize: 20 }} />
                        <Typography fontSize={13} className='text-gray-700'>Lưu ý</Typography>
                    </Box>
                    <ul style={{ listStyleType: 'circle' }} className='font-normal text-sm ml-4 text-gray-600'>
                        <li>Bạn xác nhận đã nhận hàng? Không thể hoàn tác!</li>
                        <li >Sản phẩm này không được hoàn tiền sau khi nhận hàng.</li>
                        <li >Vui lòng kiểm tra kỹ trước khi nhận hàng. Không áp dụng hoàn tiền sau khi giao dịch hoàn tất.</li>
                    </ul>
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickGoodsReceived} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default GoodsReceived