import { useState } from 'react'
import { Typography, Dialog, DialogContent, DialogTitle, Box, Checkbox, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import Attachment from '@mui/icons-material/Attachment'
import Loading from '../../../../components/Loading/Loading'
import productApi from '../../../../apis/productApi'
import { formatCurrency } from '../../../../utils/price'
import voucherApi from '../../../../apis/voucherApi'
import DialogAction from '../../../../components/Dialog/DialogAction'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import EmptyData from '../../../../components/EmptyData/EmptyData'

function AddVoucherToProducts({ voucher_id }) {
    const triggerAlert = useAlert()
    const shop_id = useSelector(state => state.auth.shop_id)
    const [checkedProducts, setCheckedProducts] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = async () => {
        setLoading(true)
        const product_ids = checkedProducts
        if (shop_id) {
            voucherApi.addVoucherToProducts(voucher_id, { product_ids })
                .then(() => {
                    triggerAlert('Thêm thành công!', false, false)
                })
                .catch((error) => {
                    console.log(error)
                    triggerAlert('Thêm thất bại!', true, false)
                })
                .finally(() => setLoading(false))
        }
        handleClose()
    }
    const handleChecked = (product_id) => {
        if (checkedProducts.includes(product_id)) {
            const list = checkedProducts.filter(id => id !== product_id)
            const allSelected = products.every(product => list.includes(product?.product_id))
            setCheckedAll(allSelected)
            setCheckedProducts(list)
        } else {
            const list = [...checkedProducts, product_id]
            const allSelected = products.every(product => list.includes(product?.product_id))
            setCheckedAll(allSelected)
            setCheckedProducts(list)
        }
    }
    const handleChangeAll = () => {
        if (checkedAll) {
            setCheckedProducts([])
        } else {
            setCheckedProducts(products.map(product => product.product_id))
        }
        setCheckedAll(!checkedAll)
    }
    const handleClickOpen = async () => {
        setOpen(true)
        setLoading(true)
        productApi.getShopProducts(0, 100)
            .then((response) => {
                setProducts(response?.content)
                setCheckedProducts([])
                setCheckedAll(false)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <Box>
            <Tooltip title='Áp dụng cho các sản phẩm'><Attachment sx={{ bgcolor: 'inherit', color: '#444444', cursor: 'pointer' }} onClick={handleClickOpen} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Danh sách sản phẩm</DialogTitle>
                <DialogContent>
                    {Array.isArray(products) && products.length > 0 &&
                        <Box className='flex flex-col items-start gap-1'>
                            <Box className='flex flex-row items-center justify-between gap-1 w-full'>
                                <Box className='flex flex-row items-center'>
                                    <Checkbox checked={checkedAll} onChange={handleChangeAll} />
                                    <Typography variant='subtitle1' color={'#666666'}>Chọn tất cả</Typography>
                                </Box>
                            </Box>
                            {products.map((product, index) => (
                                <Box key={index} className='flex flex-row items-center justify-between gap-1 w-full'>
                                    <Box className='flex flex-row items-center gap-1' >
                                        <Checkbox checked={checkedProducts.includes(product?.product_id)} onChange={() => handleChecked(product?.product_id)} />
                                        <img src={product?.images[0]?.file_url} alt={product?.name} className='w-16 h-16 cursor-pointer rounded-md' />
                                        <Box>
                                            <Typography variant='body2' className='text-gray-600' >{product?.name}</Typography>
                                            <Typography variant='body2' fontWeight={'bold'} className='text-red-600'>{formatCurrency(product?.price)}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>}
                    {Array.isArray(products) && products.length < 1 && <EmptyData content={'Không tìm thấy sản phẩm nào!'} />}
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default AddVoucherToProducts
