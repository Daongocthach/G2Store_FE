import { useState, useEffect } from 'react'
import { Button, Typography, Dialog, DialogContent, DialogTitle, Box } from '@mui/material'
import { Visibility, Delete } from '@mui/icons-material'
import ShowAlert from '../../../../components/ShowAlert/ShowAlert'
import Loading from '../../../../components/Loading/Loading'
import productApi from '../../../../apis/productApi'
import { formatCurrency } from '../../../../utils/price'
import emptyImage from '../../../../assets/img/empty-order.png'

function ViewShopCateProduct({ shop_cate_id }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertFail, setShowAlertFail] = useState(false)


    const handleClose = () => {
        setOpen(false)
    }
    const fetchData = async () => {

    }
    if (shop_cate_id)
        fetchData()
    const handleOpen = () => {
        setLoading(true)
        productApi.getShopCateProducts(shop_cate_id, 0, 16)
            .then((response) => {
                console.log(response?.content)
                setProducts(response?.content)
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false)
                setOpen(true)
            })

    }

    return (
        <Box>
            <Button className="action-buttons" sx={{ visibility: 'hidden', ':hover': { color: 'orange' } }} color='warning' onClick={() => handleOpen()}><Visibility /></Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Danh sách sản phẩm</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        {Array.isArray(products) && products.map((product, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <img src={product?.images[0]?.file_url} alt={product?.name} style={{ width: '70px', height: '70px', cursor: 'pointer', borderRadius: 3 }} />
                                    <Box>
                                        <Typography variant='subtitle1' fontWeight={'bold'} color={'#444444'} sx={{}}>{product?.name}</Typography>
                                        <Typography variant='subtitle2' color={'#444444'}>Còn lại: {shop_cate_id}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='subtitle2' color={'#cd3333'}>{formatCurrency(product?.price)}</Typography>
                                    <Button size='small' variant='text' sx={{ ':hover': { bgcolor: 'inherit' } }} color='error'><Delete /></Button>
                                </Box>
                            </Box>
                        ))}
                        {Array.isArray(products) && products.length < 1 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
                            <img src={emptyImage} />
                            <Typography variant='h6' >Bạn chưa có danh mục nào</Typography>
                        </Box>}
                    </Box>
                </DialogContent>
            </Dialog>
            <ShowAlert showAlert={showAlert} setShowAlert={setShowAlert} content={'Thêm ngành hàng thành công'} />
            <ShowAlert showAlert={showAlertFail} setShowAlert={setShowAlertFail} content={'Thêm ngành hàng thất bại'} isFail={true} />
            {loading && <Loading />}
        </Box>
    )
}
export default ViewShopCateProduct