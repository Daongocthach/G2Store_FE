import { useState } from 'react'
import { Typography, Dialog, DialogContent, DialogTitle, Box, Tooltip, DialogActions, Button } from '@mui/material'
import { Visibility, Delete } from '@mui/icons-material'
import Loading from '../../../../components/Loading/Loading'
import productApi from '../../../../apis/productApi'
import { formatCurrency } from '../../../../utils/price'
import EmptyData from '../../../../components/EmptyData/EmptyData'

function ViewShopCateProduct({ shop_cate_id }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setLoading(true)
        productApi.getShopCateProducts(shop_cate_id, 0, 9999)
            .then((response) => {
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
            <Tooltip title='Xem sản phẩm'><Visibility className="action-buttons" sx={{ visibility: 'hidden' }} color='info' onClick={() => handleOpen()} /></Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: '#444444' }}>Danh sách sản phẩm</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product, index) => (
                                <Box key={index} className='flex flex-row gap-1 items-center justify-between w-full' >
                                    <Box className='flex gap-1 items-center' >
                                        <img src={product?.images[0]?.file_url} alt={product?.name}
                                            className='w-20 h-20 cursor-pointer rounded-md' />
                                        <Box>
                                            <Typography variant='body1' color={'#444444'}>{product?.name}</Typography>
                                            <Typography variant='caption' fontWeight={'bold'} color={'#cd3333'}>
                                                {formatCurrency(product?.price)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Tooltip title='Xóa sản phẩm'>
                                        <Delete sx={{ ':hover': { bgcolor: 'inherit' }, color: '#444444', cursor: 'pointer' }} />
                                    </Tooltip>
                                </Box>
                            ))
                        ) : (
                            <EmptyData content={'Không tìm thấy sản phẩm nào!'} />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ ':hover': { bgcolor: 'inherit' }, color: '#444444' }}>Tắt</Button>
                </DialogActions>
            </Dialog>
            {loading && <Loading />}
        </Box>
    )
}
export default ViewShopCateProduct
