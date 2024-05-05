import { Button, Typography, Box, Rating, Tooltip, CardActions, CardMedia, CardContent, Card } from '@mui/material'
import { Help, Visibility, ShoppingCart } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import cartItemApi from '../../apis/cartItemApi'
import { formatCurrency } from '../../utils/price'
import { addToCart } from '../../redux/actions/cart'
import ShowAlert from '../ShowAlert/ShowAlert'

function CardProduct({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [showAlertFail, setShowAlertFail] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleClickAddToCart = () => {
    if (!user?.keep_login) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!', { autoClose: 2000 })
      navigate('/login')
    }
    else {
      cartItemApi.addToCart({ quantity: 1, product_id: product?.product_id })
        .then((response) => {
          if (response?.quantity == 1) {
            dispatch(addToCart(response))
          }
          setShowAlert(true)
        })
        .catch((error) => {
          console.log(error)
          setShowAlertFail(true)
        })
    }
  }
  return (
    <Card sx={{ maxWidth: 300, cursor: 'pointer' }} >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
          onClick={() => { navigate('/product-detail', { state: product }) }}
          sx={{ height: 250, width: 250, objectFit: 'contain', borderRadius: 1, m: 0.5 }}
          image={product?.images[0]?.file_url || null}
          title={product?.name}
        />
      </Box>
      <CardContent>
        <Typography variant='subtitle1' color={'#444444'} gutterBottom fontWeight={'bold'} sx={{ height: '50px' }} overflow={'hidden'}>
          {product?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
          {product?.special_price && <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
          <Typography variant={product?.special_price ? 'subtitle2' : 'subtitle1'} fontWeight={product?.special_price ? 500 : 600}
            sx={{ color: product?.special_price ? ' #444444' : '#cb1c22', textDecoration: product?.special_price ? 'line-through' : 'none' }}>
            {product?.special_price ? formatCurrency(product?.price) : formatCurrency(product?.price)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Rating size='small' value={5} precision={0.1} readOnly />
          <Typography variant='subtitle2' fontSize={'13px'} sx={{ textAlign: 'center' }} color={'#00B2EE'}>{5 + ' Đánh giá'}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tooltip title="Xem chi tiết"><Button size="small" sx={{ color: '#d32f2f', ':hover': { bgcolor: 'inherit' } }} onClick={() => {navigate('/product-detail', { state: product })}}><Visibility /></Button></Tooltip>
        <Tooltip title="Thêm vào giỏ"><Button size="small" sx={{ color: 'black', ':hover': { bgcolor: 'inherit' } }} onClick={handleClickAddToCart}><ShoppingCart /></Button></Tooltip>
        <Tooltip title="Giúp đỡ"><Button size="small" sx={{ color: 'black', ':hover': { bgcolor: 'inherit' } }}><Help /></Button></Tooltip>
      </CardActions>
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Thêm sản phẩm vào giỏ thành công'} />
      <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Thêm sản phẩm vào giỏ thất bại'} isFail={true} />
    </Card>
  )
}

export default CardProduct