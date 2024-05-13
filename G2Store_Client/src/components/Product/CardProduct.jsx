import { Button, Typography, Box, Rating, Tooltip, CardActions, CardMedia, CardContent, Card } from '@mui/material'
import { Help, Visibility, ShoppingCart } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import cartItemApi from '../../apis/cartItemApi'
import { formatCurrency } from '../../utils/price'
import { addToCart } from '../../redux/actions/cart'
import ShowAlert from '../ShowAlert/ShowAlert'
import reviewApi from '../../apis/reviewApi'

function CardProduct({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [reviews, setReviews] = useState([])
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
  useEffect(() => {
    reviewApi.getReviewByProductId(product?.product_id, 0, 8)
      .then((response) => {
        setReviews(response)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <Card sx={{ maxWidth: 300, cursor: 'pointer' }} >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
          onClick={() => { navigate('/product-detail', { state: product?.product_id }) }}
          sx={{ width: 280, aspectRatio: 1/1, objectFit: 'contain', borderRadius: 1, m: 0.5 }}
          image={product?.images[0]?.file_url || null}
          title={product?.name}
        />
      </Box>
      <CardContent sx={{ height: 145 }}>
        <Typography variant='subtitle1' color={'#444444'} fontWeight={'bold'}
          sx={{ textOverflow: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }}> {product?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
          {product?.special_price && <Typography variant='subtitle1' fontWeight={'bold'} sx={{ color: '#cb1c22' }} >{formatCurrency(product?.special_price)}</Typography>}
          <Typography variant={product?.special_price ? 'subtitle2' : 'subtitle1'} fontWeight={product?.special_price ? 500 : 600}
            sx={{ color: product?.special_price ? ' #444444' : '#cb1c22', textDecoration: product?.special_price ? 'line-through' : 'none' }}>
            {product?.special_price ? formatCurrency(product?.price) : formatCurrency(product?.price)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating size='small' value={reviews?.avg_rate || 0} precision={0.1} readOnly />
            <Typography variant='subtitle2' sx={{ textAlign: 'center' }} color={'#00B2EE'}>({reviews?.total_rate_count || 0})</Typography>
          </Box>
          <Typography variant='subtitle2' sx={{ textAlign: 'center' }} color={'#00B2EE'}> {product?.sold_quantity} Đã bán</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ textAlign: 'center' }} color={'#777777'}> {product?.shop?.province}</Typography>
          <Typography variant='body2' color={'#777777'}>Kho: {product?.stock_quantity}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tooltip title="Xem chi tiết"><Button size="small" sx={{ color: '#d32f2f', ':hover': { bgcolor: 'inherit' } }} onClick={() => { navigate('/product-detail', { state: product }) }}><Visibility /></Button></Tooltip>
        <Tooltip title="Thêm vào giỏ"><Box><Button disabled={product?.stock_quantity < 1} size="small" sx={{ color: '#333333', ':hover': { bgcolor: 'inherit' } }} onClick={handleClickAddToCart}><ShoppingCart /></Button></Box></Tooltip>
        <Tooltip title="Giúp đỡ"><Button size="small" sx={{ color: '#333333', ':hover': { bgcolor: 'inherit' } }}><Help /></Button></Tooltip>
      </CardActions>
      <ShowAlert setShowAlert={setShowAlert} showAlert={showAlert} content={'Thêm sản phẩm vào giỏ thành công'} />
      <ShowAlert setShowAlert={setShowAlertFail} showAlert={showAlertFail} content={'Thêm sản phẩm vào giỏ thất bại'} isFail={true} />
    </Card>
  )
}

export default CardProduct