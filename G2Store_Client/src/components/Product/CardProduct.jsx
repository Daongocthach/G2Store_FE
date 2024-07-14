import { Button, Typography, Box, Rating, Tooltip, CardActions, CardMedia, CardContent, Card } from '@mui/material'
import { Help, Visibility, ShoppingCart, Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cartItemV2Api from '../../apis/cartItemApiV2'
import { formatCurrency } from '../../utils/price'
import { addToCart } from '../../redux/actions/cart'
import reviewApi from '../../apis/reviewApi'
import { useAlert } from '../ShowAlert/ShowAlert'

function CardProduct({ product, isShort }) {
  const triggerAlert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [reviews, setReviews] = useState([])
  const handleClickAddToCart = () => {
    if (!user?.keep_login) {
      triggerAlert('Bạn cần đăng nhập để thực hiện chức năng này!', false, true)
    }
    else {
      cartItemV2Api.addToCart({ quantity: 1, product_id: product?.product_id })
        .then(() => {
          dispatch(addToCart(product?.product_id))
          triggerAlert('Thêm vào giỏ thành công!', false, false)
        })
        .catch((error) => {
          console.log(error)
          triggerAlert('Thêm vào giỏ thất bại!', true, false)
        })
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      reviewApi.getReviewByProductId(product?.product_id, 0, 8)
        .then((response) => {
          setReviews(response)
        })
        .catch((error) => console.log(error))
    }
    fetchData()
  }, [])
  return (
    <Card className='w-auto cursor-pointer' variant="outlined">
      <Box className='flex flex-row justify-center items-center relative'>
        <CardMedia
          onClick={() => { navigate('/product-detail', { state: product?.product_id }) }}
          className='w-72 aspect-square object-contain m-0.5'
          image={product?.thumbnail || (product?.images ? product?.images[0]?.file_url : null)}
          title={product?.name}
        />
        <Box className='flex flex-row items-center h-5 w-16 bg-red-500 absolute top-1 left-0'>
          <Check className='items-center text-white' sx={{ fontSize: 13 }} />
          <Typography className='items-center text-white' sx={{ fontSize: 10 }}>Yêu thích</Typography>
        </Box>
      </Box>
      <CardContent className='h-36' onClick={() => { navigate('/product-detail', { state: product?.product_id }) }}>
        <Typography variant='subtitle2' color={'#444444'} className='line-clamp-2'>{product?.name}</Typography>
        <Typography variant='subtitle2' fontWeight={'bold'} className='text-red-600'>
          {formatCurrency(product?.price)}
        </Typography>
        <Box className='flex flex-row  gap-1'>
          <Rating size='small' value={reviews?.avg_rate || 0} precision={0.1} readOnly />
          <Typography variant='caption' className='text-gray-500 text-center'>({reviews?.total_rate_count || 0})</Typography>
        </Box>
        <Box className='flex flex-row items-center justify-between flex-wrap' >
          <Typography variant='caption' className='text-gray-500 text-center'>{product?.sold_quantity || 0} đã bán</Typography>
          <Typography variant='caption' className='text-gray-500'>{product?.stock_quantity || 0} còn lại</Typography>
        </Box>
        <Typography variant='caption' className='text-gray-500'> {product?.shop?.province_name}</Typography>
      </CardContent>
      <CardActions className='flex flex-row items-center justify-between'>
        <Tooltip title="Xem chi tiết">
          <Button size="small" sx={{ color: '#d32f2f', ':hover': { bgcolor: 'inherit' } }}
            onClick={() => { navigate('/product-detail', { state: product }) }}>
            <Visibility sx={{ fontSize: 20 }} />
          </Button>
        </Tooltip>
        <Tooltip title="Thêm vào giỏ">
          <span>
            <Button disabled={product?.stock_quantity < 1} size="small" sx={{ color: '#333333', ':hover': { bgcolor: 'inherit' } }}
              onClick={handleClickAddToCart}>
              <ShoppingCart sx={{ fontSize: 22 }} />
            </Button>
          </span>
        </Tooltip>
        {!isShort && <Tooltip title="Giúp đỡ"><Button size="small" sx={{ color: '#333333', ':hover': { bgcolor: 'inherit' } }}>
          <Help sx={{ fontSize: 20 }} /></Button>
        </Tooltip>}
      </CardActions>
    </Card>
  )
}

export default CardProduct