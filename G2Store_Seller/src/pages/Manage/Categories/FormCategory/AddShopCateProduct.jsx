import { useState, useEffect } from 'react'
import { Typography, Dialog, DialogContent, DialogTitle, Box, Checkbox, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import Add from '@mui/icons-material/Add'
import Loading from '../../../../components/Loading/Loading'
import productApi from '../../../../apis/productApi'
import { formatCurrency } from '../../../../utils/price'
import emptyImage from '../../../../assets/img/empty-order.png'
import { useAlert } from '../../../../components/ShowAlert/ShowAlert'
import DialogAction from '../../../../components/Dialog/DialogAction'

function AddShopCateProduct({ shop_cate_id }) {
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
        const ids = checkedProducts
        if (shop_id) {
            productApi.addProductShopCategory(shop_cate_id, { ids })
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            productApi.getShopProducts(shop_id, 0, 16, '')
                .then((response) => {
                    setProducts(response?.content)
                    setCheckedProducts([])
                    setCheckedAll(false)
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false))
        }
        fetchData()
    }, [shop_id])

    return (
        <Box>
            <Tooltip title='Thêm sản phẩm'><Add className="action-buttons" sx={{ visibility: 'hidden' }} color='info' onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Danh sách sản phẩm</DialogTitle>
                <DialogContent>
                    {Array.isArray(products) && products.length > 0 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={checkedAll} onChange={handleChangeAll} />
                                <Typography variant='subtitle1' color={'#666666'}>Chọn tất cả</Typography>
                            </Box>
                        </Box>
                        {products.map((product, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Checkbox checked={checkedProducts.includes(product?.product_id)} onChange={() => handleChecked(product?.product_id)} />
                                    <img src={product?.images[0]?.file_url} alt={product?.name} style={{ width: '70px', height: '70px', cursor: 'pointer', borderRadius: 3 }} />
                                    <Box>
                                        <Typography variant='body1' color={'#444444'}>{product?.name}</Typography>
                                        <Typography variant='caption' fontWeight={'bold'} color={'#cd3333'}>{formatCurrency(product?.price)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>}
                    {Array.isArray(products) && products.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
                        <img src={emptyImage} />
                        <Typography variant='h6' >Không có sản phẩm nào chưa có danh mục!</Typography>
                    </Box>}
                </DialogContent>
                <DialogAction setOpen={setOpen} handleClick={handleClickAdd} />
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default AddShopCateProduct
