import { Button, Typography, Box, Rating, Tooltip, CardActions, CardMedia, CardContent, Card as MuiCard } from '@mui/material'
import { Help, Visibility, ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { formatCurrency } from '../../../../../../../utils/price'
import cartItemApi from '../../../../../../../apis/cartItemApi'
import { addToCart, updateQuantity } from '../../../../../../../redux/actions/cart'
import { useEffect, useState } from 'react'
import reviewApi from '../../../../../../../apis/reviewApi'

const color = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')

function Product({ product }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const cartItems = useSelector(state => state.cart.cartItems)
  const [reviews, setReviews] = useState([])
  var avarageReviews = 0
  reviews.map((review) => { avarageReviews += review?.rating })
  avarageReviews = avarageReviews / reviews.length
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  // function handleClickAddToCart() {
  //   if (user && product && cartItems) {
  //     var update = false
  //     var quantity = 1
  //     cartItems.forEach(cartItem => {
  //       if (cartItem.product.id == product.id) {
  //         update = true
  //         quantity = cartItem.quantity + 1
  //       }
  //     })
  //     const cartItem = {
  //       'id': {
  //         'customerId': user.id,
  //         'productId': product.id
  //       },
  //       'customer': {
  //         'id': user.id
  //       },
  //       'product': {
  //         'id': product.id
  //       },
  //       'quantity': quantity
  //     }
  //     if (update) {
  //       cartItemApi.updateCartItem(cartItem)
  //         .then(response => {
  //           alert('Cập nhật số lượng sản phẩm')
  //           dispatch(updateQuantity(response.data))
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     }
  //     else {
  //       cartItemApi.addCartItem(cartItem)
  //         .then(response => {
  //           alert('Thêm vào giỏ hàng thành công')
  //           dispatch(addToCart(response.data))
  //         })
  //         .catch(error => {
  //           console.error('Lỗi khi thêm vào giỏ hàng:', error)
  //         })
  //     }
  //   } else {
  //     console.error('User hoặc Product không tồn tại.')
  //   }
  // }
  useEffect(() => {
    reviewApi.getReviewByProduct(product?.id)
      .then((response) => {
        setReviews(response.data)
      })
  }, [])
  return (
    <MuiCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        cursor: 'pointer',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : 'white'),
        height: { xs: '220px', sm: '320px' },
        width: { xs: '170px', sm: '220px' },
        // transition: 'transform 1s',
        // transform: isHovered ? 'scale(1.5)' : 'scale(1)',
        // borderRadius: '10px',
        // zIndex: isHovered ? 999 : 0,
      }}>
      {product?.image &&
        <Link to={`/product-detail?${product?.id}`}>
          <CardMedia sx={{ height: { xs: '120px', sm: '220px' }, width: { xs: '120px', sm: '220px' }, objectFit: 'fill' }}
            image={product?.image} />
        </Link>
      }
      <CardContent sx={{ p: 1 }}>
        <Typography variant='body1' sx={{ fontWeight: 'bold', height: '40px', fontSize: '14px' }}>
          {product?.name}
        </Typography>
        <Typography variant='body1' fontWeight={'bold'} color={'red'}>
          {formatCurrency(product?.price)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Rating size='small' value={avarageReviews} precision={0.1} readOnly />
          <Typography variant='body1' fontSize={'13px'} sx={{ textAlign: 'center' }} color={'#00B2EE'}>{reviews?.length + ' Đánh giá'}</Typography>
        </Box>
      </CardContent>

      {/* <CardActions>
        <Tooltip title="View"><Button size="small" startIcon={<Visibility />} sx={{ color: 'red' }} onClick={() => { navigate(`/product-detail?${product?.id}`) }}></Button></Tooltip>
        <Tooltip title="Add To Cart"><Button size="small" startIcon={<ShoppingCart />} sx={{ color: color }} onClick={handleClickAddToCart}></Button></Tooltip>
        <Tooltip title="Help"><Button size="small" startIcon={<Help />} sx={{ color: color }}></Button></Tooltip>
      </CardActions> */}

    </MuiCard>
  )
}

export default Product