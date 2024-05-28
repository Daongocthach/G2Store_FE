import { useState, useEffect } from 'react'
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Box, Checkbox, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import Add from '@mui/icons-material/Add'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'
import productApi from '../../../../apis/productApi'
import { formatCurrency } from '../../../../../../G2Store_Client/src/utils/price'

function AddShopCateProduct({ shop_cate_id }) {
    const shop_id = useSelector(state => state.auth.shop_id)
    const [checkedProducts, setCheckedProducts] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickAdd = async () => {
        setLoading(true)
        const ids = checkedProducts
        if (shop_id) {
            productApi.addProductShopCategory(shop_cate_id, { ids })
                .then(() => {
                    setShowAlert(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowAlertFail(true)
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
            productApi.getShopProducts(shop_id, 0, 16)
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
            <Tooltip title='Thêm sản phẩm'><Add className="action-buttons" sx={{ visibility: 'hidden', ':hover': { color: 'green' } }} color='success' onClick={() => setOpen(true)} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Danh sách sản phẩm</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={checkedAll} onChange={handleChangeAll} />
                                <Typography variant='subtitle1' color={'#666666'}>Chọn tất cả</Typography>
                            </Box>
                        </Box>
                        {Array.isArray(products) && products.map((product, index) => (
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
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ ':hover': { bgcolor: 'inherit' } }} onClick={() => { setOpen(false) }} size='small'>Hủy</Button>
                    <Button sx={{ ':hover': { bgcolor: 'inherit' } }} onClick={handleClickAdd} size='small' >Thêm</Button>
                </DialogActions>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm ngành hàng thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm ngành hàng thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default AddShopCateProduct
